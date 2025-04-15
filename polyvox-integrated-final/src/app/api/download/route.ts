import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { path, translationId } = await request.json()
    
    if (!path || !translationId) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      )
    }
    
    // Create a client with service role key
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
    
    // Get a signed URL for the file
    const { data: signedUrlData, error: signedUrlError } = await supabase
      .storage
      .from('translations')
      .createSignedUrl(path, 60) // URL expires in 60 seconds
    
    if (signedUrlError) {
      console.error('Signed URL error:', signedUrlError)
      return NextResponse.json(
        { error: `Failed to generate download link: ${signedUrlError.message}` },
        { status: 500 }
      )
    }
    
    if (!signedUrlData?.signedUrl) {
      return NextResponse.json(
        { error: 'No signed URL generated' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({ signedUrl: signedUrlData.signedUrl })
  } catch (error: any) {
    console.error('Download API error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate download link' },
      { status: 500 }
    )
  }
} 