'use client'

import { createClient } from '@/lib/supabase'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function DownloadsPage() {
  const [translations, setTranslations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        const supabase = createClient()
        
        const { data, error } = await supabase
          .from('translations')
          .select('*')
          .order('created_at', { ascending: false })
        
        if (error) {
          throw error
        }
        
        setTranslations(data || [])
      } catch (error: any) {
        setError(error.message || 'Failed to fetch translations')
      } finally {
        setLoading(false)
      }
    }

    fetchTranslations()
  }, [])

  const handleDownload = async (translationId: string, filePath: string) => {
    try {
      const supabase = createClient()
      
      if (!filePath) {
        throw new Error('No file path available for download')
      }

      // The filePath should already be correct
      const path = filePath
      
      console.log('Attempting to download file from path:', path)
      
      // First, check if the file exists in the database
      const { data: translation, error: dbError } = await supabase
        .from('translations')
        .select('translated_file_path, status, error, user_id')
        .eq('id', translationId)
        .single()
      
      if (dbError) {
        console.error('Database error:', dbError)
        throw new Error(`Failed to fetch translation details: ${dbError.message}`)
      }
      
      if (!translation) {
        throw new Error('Translation not found in database')
      }
      
      if (translation.status !== 'completed') {
        throw new Error(`Translation is not yet completed. Status: ${translation.status}`)
      }
      
      if (translation.error) {
        throw new Error(`Translation failed: ${translation.error}`)
      }
      
      console.log('Translation details:', translation)
      
      // Try to get a signed URL for the file using the service role key
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          path,
          translationId
        })
      })
      
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to generate download link')
      }
      
      const { signedUrl } = await response.json()
      
      if (!signedUrl) {
        throw new Error('No signed URL generated')
      }
      
      console.log('Generated signed URL:', signedUrl)
      
      // Create a download link
      const a = document.createElement('a')
      a.href = signedUrl
      a.download = path.split('/').pop() || `translated-${translationId}.txt`
      document.body.appendChild(a)
      a.click()
      
      // Cleanup
      setTimeout(() => {
        document.body.removeChild(a)
      }, 100)
    } catch (error: any) {
      console.error('Download error:', error)
      setError(error.message || 'Failed to download file')
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>
      case 'processing':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">Processing</span>
      case 'completed':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Completed</span>
      case 'error':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Error</span>
      default:
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">{status}</span>
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Your Translations</h1>
      
      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-md">
        {loading ? (
          <div className="p-6 text-center">
            <p>Loading translations...</p>
          </div>
        ) : translations.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-gray-500">You don't have any translations yet.</p>
            <Link href="/dashboard/translate" className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Create your first translation
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {translations.map((translation) => (
              <li key={translation.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <p className="text-sm font-medium text-indigo-600 truncate">
                        {translation.source_file_id.split('/').pop()}
                      </p>
                      <p className="mt-1 flex items-center text-sm text-gray-500">
                        {translation.source_language} → {translation.target_language}
                      </p>
                    </div>
                    <div className="ml-2 flex-shrink-0 flex">
                      {getStatusBadge(translation.status)}
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        Created: {formatDate(translation.created_at)}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      {translation.status === 'completed' && translation.translated_file_path && (
                        <button
                          onClick={() => handleDownload(translation.id, translation.translated_file_path)}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Download
                        </button>
                      )}
                      {translation.status === 'error' && (
                        <p className="text-red-500">{translation.error}</p>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
