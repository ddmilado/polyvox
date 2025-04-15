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
  Stack,
  Text,
  useColorModeValue,
  VStack,
  HStack,
  Link,
  useToast,
} from '@chakra-ui/react'
import { FiMail, FiLock, FiUser, FiGithub, FiTwitter } from 'react-icons/fi'
import { FcGoogle } from 'react-icons/fc'
import NextLink from 'next/link'
import { signIn } from 'next-auth/react'
import { useState } from 'react'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  const bgColor = useColorModeValue('white', 'gray.800')
  const textColor = useColorModeValue('gray.600', 'gray.400')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong')
      }

      toast({
        title: 'Success',
        description: 'Account created successfully! Please sign in.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })

      // Redirect to login page
      window.location.href = '/auth/login'
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message || 'An error occurred during registration',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container maxW="md" py={20}>
      <VStack spacing={8}>
        <VStack spacing={2} textAlign="center">
          <Heading size="xl">Create Account</Heading>
          <Text color={textColor}>
            Join PolyVoxAI and start translating today
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
                <FormLabel>Full Name</FormLabel>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  leftIcon={<FiUser />}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  leftIcon={<FiMail />}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  leftIcon={<FiLock />}
                />
              </FormControl>

              <Button
                type="submit"
                colorScheme="blue"
                size="lg"
                isLoading={isLoading}
              >
                Create Account
              </Button>

              <HStack justify="center">
                <Text>Already have an account?</Text>
                <Link as={NextLink} href="/auth/login" color="blue.500">
                  Sign in
                </Link>
              </HStack>

              <Divider />

              <VStack spacing={4}>
                <Button
                  w="100%"
                  variant="outline"
                  leftIcon={<FcGoogle />}
                  onClick={() => signIn('google')}
                >
                  Continue with Google
                </Button>
                <Button
                  w="100%"
                  variant="outline"
                  leftIcon={<FiGithub />}
                  onClick={() => signIn('github')}
                >
                  Continue with GitHub
                </Button>
                <Button
                  w="100%"
                  variant="outline"
                  leftIcon={<FiTwitter />}
                  onClick={() => signIn('twitter')}
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
