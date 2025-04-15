'use client'

import { ReactNode, useEffect, useState } from 'react'
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  useDisclosure,
  Stack,
  Text,
  Avatar,
} from '@chakra-ui/react'
import { FiMenu, FiX, FiSettings, FiLogOut } from 'react-icons/fi'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'

interface Props {
  children: ReactNode
}

export default function DashboardLayout({ children }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  
  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const navBgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    router.push('/auth/login')
  }

  if (!mounted) {
    return null
  }

  return (
    <Box minH="100vh" bg={bgColor}>
      <Box
        bg={navBgColor}
        px={4}
        borderBottom="1px"
        borderColor={borderColor}
      >
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <IconButton
            size="md"
            icon={isOpen ? <FiX /> : <FiMenu />}
            aria-label="Open Menu"
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems="center">
            <Box>
              <Text fontWeight="bold" fontSize="xl">
                PolyVoxAI
              </Text>
            </Box>
            <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
              <Link href="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Link href="/dashboard/translate">
                <Button variant="ghost">Translate</Button>
              </Link>
              <Link href="/dashboard/downloads">
                <Button variant="ghost">Downloads</Button>
              </Link>
            </HStack>
          </HStack>
          <Flex alignItems="center">
            <Menu>
              <MenuButton
                as={Button}
                rounded="full"
                variant="link"
                cursor="pointer"
                minW={0}
              >
                <Avatar
                  size="sm"
                  name="User"
                  src=""
                />
              </MenuButton>
              <MenuList>
                <MenuItem icon={<FiSettings />}>Settings</MenuItem>
                <MenuItem icon={<FiLogOut />} onClick={handleSignOut}>
                  Sign Out
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as="nav" spacing={4}>
              <Link href="/dashboard">
                <Button variant="ghost" w="full">Dashboard</Button>
              </Link>
              <Link href="/dashboard/translate">
                <Button variant="ghost" w="full">Translate</Button>
              </Link>
              <Link href="/dashboard/downloads">
                <Button variant="ghost" w="full">Downloads</Button>
              </Link>
            </Stack>
          </Box>
        ) : null}
      </Box>

      <Box p={4}>
                {children}
      </Box>
    </Box>
  )
}
