'use client'

import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  useColorModeValue,
  VStack,
  HStack,
  Link,
  useToast,
} from '@chakra-ui/react'
import { FiMail, FiLock, FiGithub, FiTwitter } from 'react-icons/fi'
import { FcGoogle } from 'react-icons/fc'
import NextLink from 'next/link'
import { signIn } from 'next-auth/react'
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()
  const router = useRouter()

  const bgColor = useColorModeValue('white', 'gray.800')
  const textColor = useColorModeValue('gray.600', 'gray.400')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      })

      if (result?.error) {
        toast({
          title: 'Error',
          description: result.error,
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      } else if (result?.ok) {
        toast({
          title: 'Success',
          description: 'Successfully signed in',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        router.push('/dashboard')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred during sign in',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialSignIn = async (provider: string) => {
    try {
      await signIn(provider, { callbackUrl: '/dashboard' })
    } catch (error) {
      toast({
        title: 'Error',
        description: `Failed to sign in with ${provider}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  return (
    <Container maxW="md" py={20}>
      <VStack spacing={8}>
        <VStack spacing={2} textAlign="center">
          <Heading size="xl">Welcome Back</Heading>
          <Text color={textColor}>
            Sign in to your PolyVoxAI account
          </Text>
        </VStack>

        <Box
          w="100%"
          bg={bgColor}
          p={8}
          borderRadius="lg"
          boxShadow="md"
        >
          <form onSubmit={handleSubmit}>
            <Stack spacing={6}>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <FiMail color="gray.300" />
                  </InputLeftElement>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    pl={10}
                  />
                </InputGroup>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <FiLock color="gray.300" />
                  </InputLeftElement>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    pl={10}
                  />
                </InputGroup>
              </FormControl>

              <Button
                type="submit"
                colorScheme="blue"
                size="lg"
                isLoading={isLoading}
                width="full"
              >
                Sign In
              </Button>

              <HStack justify="space-between">
                <Link as={NextLink} href="/auth/forgot-password" color="blue.500">
                  Forgot password?
                </Link>
                <Link as={NextLink} href="/auth/register" color="blue.500">
                  Create account
                </Link>
              </HStack>

              <Divider />

              <VStack spacing={4}>
                <Button
                  w="100%"
                  variant="outline"
                  leftIcon={<FcGoogle />}
                  onClick={() => handleSocialSignIn('google')}
                >
                  Continue with Google
                </Button>
                <Button
                  w="100%"
                  variant="outline"
                  leftIcon={<FiGithub />}
                  onClick={() => handleSocialSignIn('github')}
                >
                  Continue with GitHub
                </Button>
                <Button
                  w="100%"
                  variant="outline"
                  leftIcon={<FiTwitter />}
                  onClick={() => handleSocialSignIn('twitter')}
                >
                  Continue with Twitter
                </Button>
              </VStack>
            </Stack>
          </form>
        </Box>
      </VStack>
    </Container>
  )
}
