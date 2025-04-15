'use client'

import React from 'react'
import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  SimpleGrid,
  Icon,
  VStack,
  HStack,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Button,
  useColorModeValue,
} from '@chakra-ui/react'
import {
  FiFileText,
  FiClock,
  FiCheckCircle,
  FiUpload,
  FiGlobe,
  FiDownload,
} from 'react-icons/fi'

export default function DashboardPage() {
  const cardBg = useColorModeValue('white', 'gray.700')
  const cardBorder = useColorModeValue('gray.200', 'gray.600')
  const mutedText = useColorModeValue('gray.500', 'gray.400')
  
  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading size="lg">Dashboard</Heading>
          <Text color={mutedText}>Welcome to your translation dashboard</Text>
        </Box>
        
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {/* Total Translations Card */}
          <Card bg={cardBg} borderWidth="1px" borderColor={cardBorder}>
            <CardHeader>
              <HStack spacing={3}>
                <Box
                  bg="blue.500"
                  color="white"
                  p={2}
                  borderRadius="md"
                >
                  <Icon as={FiFileText} boxSize={5} />
                </Box>
                <Stat>
                  <StatLabel>Total Translations</StatLabel>
                  <StatNumber>0</StatNumber>
                </Stat>
              </HStack>
            </CardHeader>
            <CardFooter>
              <Button
                leftIcon={<FiUpload />}
                colorScheme="blue"
                variant="ghost"
                as="a"
                href="/dashboard/translate"
              >
                Start a new translation
              </Button>
            </CardFooter>
          </Card>

        {/* Pending Translations Card */}
          <Card bg={cardBg} borderWidth="1px" borderColor={cardBorder}>
            <CardHeader>
              <HStack spacing={3}>
                <Box
                  bg="yellow.500"
                  color="white"
                  p={2}
                  borderRadius="md"
                >
                  <Icon as={FiClock} boxSize={5} />
                </Box>
                <Stat>
                  <StatLabel>Pending Translations</StatLabel>
                  <StatNumber>0</StatNumber>
                </Stat>
              </HStack>
            </CardHeader>
            <CardFooter>
              <Button
                leftIcon={<FiGlobe />}
                colorScheme="blue"
                variant="ghost"
                as="a"
                href="/dashboard/downloads"
              >
                View all translations
              </Button>
            </CardFooter>
          </Card>

        {/* Completed Translations Card */}
          <Card bg={cardBg} borderWidth="1px" borderColor={cardBorder}>
            <CardHeader>
              <HStack spacing={3}>
                <Box
                  bg="green.500"
                  color="white"
                  p={2}
                  borderRadius="md"
                >
                  <Icon as={FiCheckCircle} boxSize={5} />
                </Box>
                <Stat>
                  <StatLabel>Completed Translations</StatLabel>
                  <StatNumber>0</StatNumber>
                </Stat>
              </HStack>
            </CardHeader>
            <CardFooter>
              <Button
                leftIcon={<FiDownload />}
                colorScheme="blue"
                variant="ghost"
                as="a"
                href="/dashboard/downloads"
              >
                Download completed translations
              </Button>
            </CardFooter>
          </Card>
        </SimpleGrid>

      {/* Quick Start Guide */}
        <Card bg={cardBg} borderWidth="1px" borderColor={cardBorder}>
          <CardHeader>
            <Heading size="md">Quick Start Guide</Heading>
            <Text color={mutedText}>
            Get started with PolyVoxAI translation in 3 simple steps.
            </Text>
          </CardHeader>
          <CardBody>
            <Stack spacing={6}>
              <HStack spacing={4}>
                <Box
                  bg="blue.50"
                  color="blue.500"
                  p={3}
                  borderRadius="full"
                  fontWeight="bold"
                >
                  1
                </Box>
                <Box>
                  <Text fontWeight="medium">Upload your document</Text>
                  <Text color={mutedText}>
                    Go to the Translation page and upload your document for translation.
                  </Text>
                </Box>
              </HStack>

              <HStack spacing={4}>
                <Box
                  bg="blue.50"
                  color="blue.500"
                  p={3}
                  borderRadius="full"
                  fontWeight="bold"
                >
                  2
                </Box>
                <Box>
                  <Text fontWeight="medium">Select languages</Text>
                  <Text color={mutedText}>
                    Choose the source and target languages for your translation.
                  </Text>
                </Box>
              </HStack>

              <HStack spacing={4}>
                <Box
                  bg="blue.50"
                  color="blue.500"
                  p={3}
                  borderRadius="full"
                  fontWeight="bold"
                >
                  3
                </Box>
                <Box>
                  <Text fontWeight="medium">Download your translation</Text>
                  <Text color={mutedText}>
                    Once complete, download your translated document from the Downloads page.
                  </Text>
                </Box>
              </HStack>
            </Stack>
          </CardBody>
        </Card>
      </VStack>
    </Container>
  )
}
