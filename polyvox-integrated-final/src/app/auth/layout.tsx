import { type ReactNode } from 'react'
import { Inter } from 'next/font/google'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'PolyVoxAI - Authentication',
  description: 'Sign in to your PolyVoxAI account',
}

export default function AuthLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className={inter.className}>
      <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          {children}
        </div>
      </div>
    </div>
  )
}
