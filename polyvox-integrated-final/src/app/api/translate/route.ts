import { createClient } from '@/lib/supabase-server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { documentId } = await request.json()
    
    if (!documentId) {
      return NextResponse.json(
        { error: 'Document ID is required' },
        { status: 400 }
      )
    }
    
    // Get the document from Supabase
    const supabase = await createClient()
    
    const { data: translation, error: translationError } = await supabase
      .from('translations')

      .select('*')
      .eq('id', documentId)
      .single()
    
    if (translationError || !translation) {
      return NextResponse.json(
        { error: `Error fetching translation: ${translationError?.message || 'Translation not found'}` },
        { status: 500 }
      )
    }
    
    // Get the file content
    const { data: fileData, error: fileError } = await supabase
      .storage
      .from('documents')
      .download(translation.source_file_id)
    
    if (fileError || !fileData) {
      return NextResponse.json(
        { error: `Error downloading file: ${fileError?.message || 'File data not found'}` },
        { status: 500 }
      )
    }
    
    // Convert file to text
    const sourceText = await fileData.text()
    
    // Call the Supabase Edge Function
    const { data, error } = await supabase.functions.invoke('translate', {
      body: {
        documentId,
        sourceText,
        sourceLanguage: translation.source_language,
        targetLanguage: translation.target_language
      }
    })
    
    if (error || !data) {
      return NextResponse.json(
        { error: `Error calling translation function: ${error?.message || 'No data returned from translation function'}` },
        { status: 500 }
      )
    }
    
    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    return NextResponse.json(
      { error: `Unexpected error: ${error.message}` },
      { status: 500 }
    )
  }
}

