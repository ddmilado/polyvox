'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { SaasProvider } from '@saas-ui/react'
import { useState, useEffect } from 'react'

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
})

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <CacheProvider>
      <ChakraProvider theme={theme} resetCSS>
        <SaasProvider>
          {children}
        </SaasProvider>
      </ChakraProvider>
    </CacheProvider>
  )
} 