// Follow redirects and set CORS headers
import { serve } from "https://deno.land/std@0.208.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";
import { OpenAI } from "https://esm.sh/openai@4.24.1";
import { Crew, Agent, Task } from "https://esm.sh/crewai@0.1.20";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Translation function using CrewAI
export async function runTranslation(args) {
  const { documentId, sourceText, sourceLanguage, targetLanguage } = args;
  
  try {
    console.log(`Starting translation for document ID: ${documentId}`);
    console.log(`Translating from ${sourceLanguage} to ${targetLanguage}`);
    
    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: Deno.env.get('OPENAI_API_KEY'),
      baseURL: 'https://api.openai.com/v1'
    });
    
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Define translation agents
    const translator = new Agent({
      name: 'Translator',
      goal: 'Translate documents with perfect accuracy while maintaining context and meaning',
      backstory: 'You are an expert translator with deep knowledge of multiple languages and cultural nuances.',
      verbose: true,
      allowDelegation: false,
      tools: [],
      llm: {
        provider: 'openai',
        config: {
          apiKey: Deno.env.get('OPENAI_API_KEY'),
          model: 'gpt-4-turbo-preview'
        }
      }
    });
    
    const editor = new Agent({
      name: 'Editor',
      goal: 'Review and refine translations to ensure they are natural and idiomatic',
      backstory: 'You are a professional editor with years of experience in refining translations.',
      verbose: true,
      allowDelegation: false,
      tools: [],
      llm: {
        provider: 'openai',
        config: {
          apiKey: Deno.env.get('OPENAI_API_KEY'),
          model: 'gpt-4-turbo-preview'
        }
      }
    });
    
    // Define translation task
    const translateTask = new Task({
      description: `Translate the following text from ${sourceLanguage} to ${targetLanguage}. 
      Maintain the original formatting, tone, and meaning. 
      The text to translate is: ${sourceText}`,
      agent: translator,
      expectedOutput: 'The translated text with original formatting preserved'
    });
    
    const editTask = new Task({
      description: `Review and refine the translation to ensure it sounds natural in ${targetLanguage}.
      Fix any awkward phrasing, grammatical errors, or literal translations that don't capture the intended meaning.`,
      agent: editor,
      expectedOutput: 'The refined translation that reads naturally in the target language'
    });
    
    // Create crew
    const translationCrew = new Crew({
      agents: [translator, editor],
      tasks: [translateTask, editTask],
      verbose: true
    });
    
    // Execute the translation crew
    const result = await translationCrew.run();
    
    // Upload the translated text to Supabase storage
    const translatedFileName = `translated_${documentId}.txt`;
    const storagePath = translatedFileName;
    
    console.log('Uploading translated file to path:', storagePath);
    console.log('Translation result:', result);
    
    // Create a proper Blob with the correct content type
    const blob = new Blob([result], { type: 'text/plain;charset=utf-8' });
    
    // First, try to delete the file if it exists
    try {
      await supabase
        .storage
        .from('translations')
        .remove([storagePath]);
    } catch (deleteError) {
      console.log('No existing file to delete or delete failed:', deleteError);
    }
    
    // Then upload the new file
    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from('translations')
      .upload(storagePath, blob, {
        contentType: 'text/plain;charset=utf-8',
        upsert: true,
        cacheControl: '3600'
      });
    
    if (uploadError) {
      console.error('Upload error:', uploadError);
      throw new Error(`Error uploading translated file: ${uploadError.message}`);
    }
    
    console.log('File uploaded successfully:', uploadData);
    
    // Verify the file exists and is accessible
    const { data: verifyData, error: verifyError } = await supabase
      .storage
      .from('translations')
      .list();
    
    if (verifyError) {
      console.error('Verification error:', verifyError);
      throw new Error(`Failed to verify file upload: ${verifyError.message}`);
    }
    
    const fileExists = verifyData?.some(file => file.name === storagePath);
    if (!fileExists) {
      throw new Error('File upload verification failed: File not found in storage');
    }
    
    console.log('Files in storage:', verifyData);
    
    // Update the translation record with the exact file path
    const { error: updateError } = await supabase
      .from('translations')
      .update({
        status: 'completed',
        translated_file_path: storagePath
      })
      .eq('id', documentId);
    
    if (updateError) {
      throw new Error(`Error updating translation record: ${updateError.message}`);
    }
    
    // Verify the update
    const { data: verifyUpdate, error: verifyUpdateError } = await supabase
      .from('translations')
      .select('translated_file_path')
      .eq('id', documentId)
      .single();
    
    if (verifyUpdateError) {
      console.error('Verify update error:', verifyUpdateError);
    } else {
      console.log('Updated file path in database:', verifyUpdate?.translated_file_path);
    }
    
    return {
      success: true,
      document_id: documentId,
      translated_file_path: storagePath
    };
  } catch (error) {
    console.error(`Translation error: ${error.message}`);
    
    // Initialize Supabase client for error handling
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Update the translation record with error
    await supabase
      .from('translations')
      .update({
        status: 'error',
        error: error.message
      })
      .eq('id', documentId);
    
    return {
      success: false,
      error: error.message
    };
  }
}

// Main edge function handler
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }
  
  try {
    // Get request data
    const { documentId } = await req.json();
    
    if (!documentId) {
      return new Response(
        JSON.stringify({ error: 'Document ID is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }
    
    // Create Supabase client with service role key (from environment variables)
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );
    
    // Get translation job details
    const { data: translation, error: translationError } = await supabaseAdmin
      .from('translations')
      .select('*')
      .eq('id', documentId)
      .single();
      
    if (translationError) {
      return new Response(
        JSON.stringify({ error: 'Failed to fetch translation job' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }
    
    // Update status to processing
    await supabaseAdmin
      .from('translations')
      .update({ status: 'processing' })
      .eq('id', documentId);
      
    // Download source file from storage
    const { data: fileData, error: fileError } = await supabaseAdmin
      .storage
      .from('documents')
      .download(translation.source_file_id);
      
    if (fileError) {
      await updateTranslationStatus(supabaseAdmin, documentId, 'error', 'Failed to download source file');
      return new Response(
        JSON.stringify({ error: 'Failed to download source file' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }
    
    // Convert file data to text
    const sourceText = await fileData.text();
    
    // Process the translation using the Crew AI translator module
    try {
      // Prepare arguments for the translator
      const args = {
        documentId: documentId,
        sourceText: sourceText,
        sourceLanguage: translation.source_language,
        targetLanguage: translation.target_language
      };
      
      // Run the translation
      const result = await runTranslation(args);
      
      if (!result || !result.success) {
        throw new Error(result?.error || 'Unknown translation error');
      }
      
      // Return success response
      return new Response(
        JSON.stringify({ 
          success: true, 
          translationId: documentId, 
          translatedFilePath: result.translated_file_path 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      );
    } catch (translationError) {
      console.error('Translation error:', translationError.message);
      await updateTranslationStatus(supabaseAdmin, documentId, 'error', translationError.message);
      return new Response(
        JSON.stringify({ error: 'Failed to process translation: ' + translationError.message }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }
  } catch (error) {
    console.error('Error:', error.message);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});

// Helper function to update translation status
async function updateTranslationStatus(supabase, documentId, status, errorMessage = null) {
  const updateData = { status };
  if (errorMessage) {
    updateData.error = errorMessage;
  }
  await supabase
    .from('translations')
    .update(updateData)
    .eq('id', documentId);
}