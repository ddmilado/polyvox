import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

export async function runTranslation(args) {
  const { documentId, sourceText, sourceLanguage, targetLanguage } = args;
  
  try {
    console.log(`Starting translation for document ID: ${documentId}`);
    console.log(`Translating from ${sourceLanguage} to ${targetLanguage}`);
    
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Call external Python service that uses CrewAI
    const crewAIServiceUrl = Deno.env.get('CREWAI_SERVICE_URL');
    
    if (!crewAIServiceUrl) {
      throw new Error('CREWAI_SERVICE_URL environment variable is not set');
    }
    
    // Make request to CrewAI service
    const response = await fetch(`${crewAIServiceUrl}/translate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sourceText,
        sourceLanguage,
        targetLanguage,
        openaiApiKey: Deno.env.get('OPENAI_API_KEY')
      })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`CrewAI service error: ${response.status} ${errorText}`);
    }
    
    const translationResult = await response.json();
    
    if (!translationResult.success) {
      throw new Error(translationResult.error || 'Unknown error from translation service');
    }
    
    const finalTranslation = translationResult.translation;
    
    // Upload the translated text to Supabase storage
    const translatedFileName = `translated_${documentId}.txt`;
    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from('translations')
      .upload(translatedFileName, new Blob([finalTranslation]));
    
    if (uploadError) {
      throw new Error(`Error uploading translated file: ${uploadError.message}`);
    }
    
    // Update the translation record
    const { error: updateError } = await supabase
      .from('translations')
      .update({
        status: 'completed',
        translated_file_path: translatedFileName
      })
      .eq('id', documentId);
    
    if (updateError) {
      throw new Error(`Error updating translation record: ${updateError.message}`);
    }
    
    return {
      success: true,
      document_id: documentId,
      translated_file_path: translatedFileName
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