import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Collapse,
  Flex,
  IconButton,
  Image,
  Link,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { userLabel } from '@data/localization/landingPage/navbar'
import useLang from '@hooks/useLang'
import LanguageToggle from '@ui/common/molecules/LanguageToggle'
import { AiOutlineUserSwitch } from 'react-icons/ai'
import { Link as ReactLink } from 'react-router-dom'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import logo from "../../../../favicon.svg"

const NavBar = () => {
  const { isOpen, onToggle } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box>
      <Box
        position="relative"
        bgImage="url('https://wallpapers.com/images/hd/beautiful-mountain-pictures-wfvd4x42htesrnyp.jpg')"
        bgSize="cover"
        bgPosition="center"
      >
        <Box
          position="absolute"
          top={0}
          right={0}
          bottom={0}
          left={0}
          backgroundColor="rgba(275, 355, 255, 0.7)"
        />
        <Flex
          minH={'140px'}
          borderBottom={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.900')}
          align={'center'}
        >
          <Flex gap='4' alignItems={'center'}>
            <Flex
              flex={{ base: 1, md: 'auto' }}
              ml={{ base: -2 }}
              display={{ base: 'flex', lg: 'none' }}
            >
              <IconButton
                icon={colorMode === 'light' ? <HamburgerIcon w={5} h={5} /> : <CloseIcon w={3} h={3} />}
                onClick={toggleColorMode}
                variant={'ghost'}
                aria-label={'Toggle Navigation'}
              />
            </Flex>

            <Box
              zIndex={1}
              textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
              fontFamily={'heading'}
              paddingX="10px"
              color={"blue"}
              display="flex"
              alignItems="center"
              flexWrap="wrap"
            >
              <Image
                src={logo}
                alt="Logo"
                maxW={{ base: '80%', md: 'auto' }}
                maxH={{ base: 'auto', md: '100px' }}
              />
              <Box color="red" marginLeft={{ base: 0, md: '20px' }}>
                <Text fontSize={14}>Government of Nepal</Text>
                <Text fontSize={24}>Ministry of Home Affairs</Text>
                <Text fontSize={28}>Department of Immigration</Text>
              </Box>
            </Box>

          </Flex>
          <Flex
            flex={{ base: 1 }}
            alignItems={{
              base: 'center',
              md: 'center',
            }}
            justify={{ base: 'center', lg: 'start' }}
          >
            <Flex display={{ base: 'none', lg: 'flex' }} ml={10}>
              <DesktopNav />
            </Flex>
          </Flex>

          <Stack
            flex={{ base: 1, lg: 0 }}
            justify={'flex-end'}
            direction={'row'}
            spacing={6}
            alignItems={'center'}
          >
            <Button onClick={toggleColorMode}>
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>
            <LanguageToggle />

            <Box
              display={{
                md: 'flex',
                base: 'none',
              }}
            >
              <LoginSignUp />
            </Box>
          </Stack>
        </Flex>
      </Box>


      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  )
}

export default NavBar

const LoginSignUp = () => {
  const { lang } = useLang()

  return (
    <Flex gap='4'>
      <Button
        size='md'
        fontSize={'sm'}
        fontWeight={500}
        as={ReactLink}
        colorScheme='telegram'
        variant={'outline'}
        to='auth/user'
      >
        {userLabel?.login?.[lang]}&nbsp;&nbsp;
        <AiOutlineUserSwitch size={'14px'} />
      </Button>
      <Button
        size='md'
        fontSize={'sm'}
        fontWeight={500}
        as={ReactLink}
        colorScheme='facebook'
        variant={'solid'}
        to='auth/user/sign-up'
      >
        {userLabel?.signUp?.[lang]}&nbsp;&nbsp;
        <AiOutlineUserSwitch size={'14px'} />
      </Button>
    </Flex>
  )
}

const DesktopNav = () => {
  const { lang } = useLang()
  const linkColor = useColorModeValue('gray.600', 'gray.200')
  const linkHoverColor = useColorModeValue('gray.800', 'white')
  const popoverContentBgColor = useColorModeValue('gray.50', 'gray.800')

  return (
    <Stack direction={'row'} spacing={4}>
      {/* {navItems.map((navItem, index) => (
        <Box key={index}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Link
                as={ReactLink}
                p={2}
                to={navItem.href ?? '#'}
                fontSize={'15px'}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}
              >
                {navItem.label?.[lang]}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent border={0} boxShadow={'sm'} bg={popoverContentBgColor} p={4} rounded={'sm'} minW={'sm'}>
                <Stack>
                  {navItem.children.map((child, index) => (
                    <DesktopSubNav key={index} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))} */}
    </Stack>
  )
}

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  const { lang } = useLang()
  return (
    <Link
      href={href}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}
    >
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text transition={'all .3s ease'} _groupHover={{ color: 'pink.400' }} fontSize='14px' fontWeight={400}>
            {label?.[lang]}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}
        >
          <FiChevronUp color={'pink.400'} heigh='6' width='6' />
        </Flex>
      </Stack>
    </Link>
  )
}

const MobileNav = () => {
  return (
    <Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={{ lg: 'none' }}>
      {navItems.map((navItem, index) => (
        <MobileNavItem key={index} {...navItem} />
      ))}
      <Box
        display={{
          md: 'flex',
        }}
      >
        <LoginSignUp />
      </Box>
    </Stack>
  )
}

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure()
  const { lang } = useLang()
  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? '#'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Text fontWeight={500} fontSize='14px' color={useColorModeValue('gray.600', 'gray.200')}>
          {label?.[lang]}
        </Text>
        {children && <FiChevronDown color={'pink.400'} heigh='6' width='6' />}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}
        >
          {children?.map((child, index) => (
            <Link key={index} py={2} href={child.href}>
              {child.label?.[lang]}
            </Link>
          ))}
        </Stack>
      </Collapse>
    </Stack>
  )
}

interface NavItem {
  label: Record<string, string>
  subLabel?: string
  children?: NavItem[]
  href?: string
}

const navItems: NavItem[] = [
  {
    label: userLabel?.home,
    href: '/',
  },
  {
    label: userLabel?.aboutUs,
    href: '/about-us',
  },
  {
    label: userLabel?.contactUs,
    href: '/contact-us',
  },
  {
    label: userLabel?.faq,
    href: '/faq',
  },
  {
    label: userLabel?.download,
    href: '/download',
  },
  {
    label: userLabel?.help,
    href: '/help',
  },
]
