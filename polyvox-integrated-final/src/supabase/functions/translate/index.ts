// Follow redirects and set CORS headers
import { serve } from "https://deno.land/std@0.208.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";
import { runTranslation } from "./translator.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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
