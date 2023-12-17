import { Box, Input, InputGroup, InputRightElement, Spacer, Text } from '@chakra-ui/react'
import { userSidebarLabel } from '@data/localization/user/sidebar'
import useWindowDimensions from '@hooks/useWindowDimension'
import SidebarItem from '@ui/common/molecules/SidebarItem'
import { Colors } from '@utils/Colors'
import { useEffect, useMemo, useState } from 'react'
import { AiOutlineSetting, AiOutlineUnlock } from 'react-icons/ai'
import { BiSearchAlt } from 'react-icons/bi'
import { MdOutlineDashboardCustomize } from 'react-icons/md'
import { TfiMenu } from 'react-icons/tfi'
import { useLocation } from 'react-router-dom'
import { officeInfo } from '@config/constant/office'
import { ISidebar } from '@interface/global.interface'
import useLang from '@hooks/useLang'
import { FiUser } from 'react-icons/fi'

/**
 * UserDashboardSidebar component for navigation and user interface controls.
 */
const UserDashboardSidebar = () => {
  const { lang } = useLang()
  const location = useLocation().pathname

  const MENU_ITEMS: ISidebar[] = [
    {
      title: userSidebarLabel?.dashboard,
      link: '/admin-dashboard',
      icon: <MdOutlineDashboardCustomize />,
    },
    {
      title: userSidebarLabel?.settings,
      link: '#',
      icon: <AiOutlineSetting />,
      openSubMenu: true,
      subMenu: [
        {
          title: userSidebarLabel?.updateProfile,
          link: '/admin-dashboard/setting/update-profile',
          icon: <FiUser />,
        },
        {
          title: userSidebarLabel?.updatePassword,
          link: '/admin-dashboard/setting/update-password',
          icon: <AiOutlineUnlock />,
        },
      ],
    },
  ]
  const { width } = useWindowDimensions()
  const [minimize, setMinimize] = useState(sessionStorage.getItem('sidebar') === 'true')
  const [sidebarWidth, setSidebarWidth] = useState<number>(350)
  const [show, setShow] = useState(true)
  let [sidebarItems] = useState(MENU_ITEMS)
  const [searchText, setSearchText] = useState<string>()

  // handle to show
  const handleToggle = () => {
    if (width >= 767) {
      setSidebarWidth(minimize ? 350 : 50)
      setMinimize(!minimize)
      sessionStorage.setItem('sidebar', 'true')
    } else {
      setShow(!show)
    }
  }

  useEffect(() => {
    sessionStorage.setItem('sidebar', minimize?.toString())
  }, [minimize])

  useEffect(() => {
    if (width <= 767) {
      setShow(false)
      setMinimize(false)
    } else {
      if (minimize) setSidebarWidth(50)
      else setMinimize(false)
      setShow(true)
      setSidebarWidth(!minimize ? 350 : 50)
    }
  }, [minimize, width])

  // Filter sidebar items based on search text
  sidebarItems = useMemo(() => {
    if (searchText != null) {
      const regex = new RegExp(searchText.trim(), 'ig')
      const filteredItems = sidebarItems.filter((el: ISidebar) => {
        if (el?.subMenu && el?.subMenu?.length > 0) {
          const filteredSubMenu = el.subMenu.filter((subItem) => regex.test(subItem.title?.en))
          return filteredSubMenu.length > 0
        }
        return regex.test(el.title?.em)
      })
      return filteredItems
    }
    return sidebarItems
  }, [searchText, sidebarItems])

  useEffect(() => {
    if (width <= 767) {
      setShow(false)
    }
  }, [location, width])

  return (
    <Box
      height={{
        base: 'auto',
        md: '100vh',
      }}
      bg={Colors?.dashboardColor}
      width={{
        base: '100%',
        md: `${sidebarWidth}px`,
      }}
      overflowX='hidden'
      zIndex={1}
    >
      <Box display='flex' alignItems='center' gap='2' p='2'>
        {!minimize && (
          <>
            {/* <Image width={{ base: '55px' }} objectFit='cover' src={image?.ebpsLogo} alt='logo' /> */}
            <Text fontSize='md' color={'white'} pt='1'>
              {officeInfo?.companyName?.[lang]}
            </Text>
            <Spacer />
          </>
        )}
        <Box
          sx={{
            svg: {
              fontSize: '14px',
            },
          }}
          ms={minimize ? '.5rem' : '0'}
          pt={minimize ? '.75rem' : '0'}
        >
          <TfiMenu
            cursor='pointer'
            color={'white'}
            onClick={() => {
              handleToggle()
            }}
          />
        </Box>
      </Box>

      {minimize && (
        <Box px='4' pt='5'>
          <BiSearchAlt cursor='pointer' color={'white'} onClick={handleToggle} />
        </Box>
      )}
      {!minimize && show && (
        <Box px='4' mt='5'>
          <Text as='small' color={'white'} mb='2'>
            {userSidebarLabel?.search[lang]}
          </Text>
          <InputGroup size='sm'>
            <Input
              variant='filled'
              placeholder={userSidebarLabel?.searchPlaceholder[lang]}
              border={'none'}
              size='sm'
              onChange={(e) => {
                setSearchText(e.target.value)
              }}
              _placeholder={{ color: 'gray.350' }}
              _focus={{ color: 'black', bg: 'white' }}
              _active={{ color: 'black', bg: 'white' }}
            />
            <InputRightElement>
              <BiSearchAlt cursor='pointer' color={Colors.primaryColor} />
            </InputRightElement>
          </InputGroup>
        </Box>
      )}
      {show && (
        <Box pt='5'>
          {!minimize && (
            <Text ps='4' as='small' color={'white'}>
              {userSidebarLabel?.menuItems[lang]}
            </Text>
          )}
          <Box
            style={{
              overflowY: 'auto',
              height: 'calc(100vh - 180px)',
            }}
          >
            {sidebarItems.map((item, index: number) => {
              return (
                <SidebarItem
                  key={index}
                  minimize={minimize}
                  title={item.title}
                  link={item.link}
                  icon={item.icon}
                  subMenu={item?.subMenu}
                  roleLevel={item?.roleLevel}
                  openSubMenu={item?.openSubMenu}
                />
              )
            })}
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default UserDashboardSidebar
