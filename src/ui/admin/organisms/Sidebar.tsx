import { Box, Input, InputGroup, InputRightElement, Spacer, Text } from '@chakra-ui/react'
import { sidebarLabel } from '@data/localization/admin/sidebar'
import useLang from '@hooks/useLang'
import useWindowDimensions from '@hooks/useWindowDimension'
import SidebarItem from '@ui/common/molecules/SidebarItem'
import { Colors } from '@utils/Colors'
import { useEffect, useMemo, useState } from 'react'
import { AiOutlineSetting, AiOutlineUnlock } from 'react-icons/ai'
import { BiCategoryAlt, BiImage, BiNews, BiSearchAlt } from 'react-icons/bi'
import { MdOutlineDashboardCustomize, MdOutlinePhotoAlbum, MdOutlineSource } from 'react-icons/md'
import { TfiMenu } from 'react-icons/tfi'
import { useLocation } from 'react-router-dom'
import { officeInfo } from '@config/constant/office'
import { ISidebar } from '@interface/global.interface'
import { FiUsers } from 'react-icons/fi'
import { TbArmchair2, TbCarouselHorizontal } from 'react-icons/tb'
import { BsBuildings, BsCalendar2Date, BsChatSquareText } from 'react-icons/bs'
import { HiOutlineOfficeBuilding } from 'react-icons/hi'
import { VscFeedback } from 'react-icons/vsc'
import { Role } from '@graphql/schema/graphql'

/**
 * AdminSidebar component for navigation and user interface controls.
 */
const AdminSidebar = () => {
  const { lang } = useLang()
  const location = useLocation().pathname

  const MENU_ITEMS: ISidebar[] = [
    {
      title: sidebarLabel?.dashboard,
      link: '/admin-dashboard',
      icon: <MdOutlineDashboardCustomize />,
    },
    {
      title: sidebarLabel?.fiscalYear,
      link: '/admin-dashboard/fiscal-year',
      icon: <MdOutlineDashboardCustomize />,
    },
    {
      title: sidebarLabel?.wardSetup,
      link: '/admin-dashboard/ward-setup',
      icon: <MdOutlineDashboardCustomize />,
    },
    {
      title: sidebarLabel?.userList,
      link: '/admin-dashboard/user-list',
      icon: <MdOutlineDashboardCustomize />,
    },

    {
      title: sidebarLabel?.setup,
      link: '#',
      icon: <AiOutlineSetting />,
      openSubMenu: true,
      subMenu: [
        {
          title: sidebarLabel?.officeSetup,
          link: '/admin-dashboard/setup/office-setup',
          icon: <BsBuildings />,
        },
        {
          title: sidebarLabel?.buildingCategory,
          link: '/admin-dashboard/setup/building-category',
          icon: <BsBuildings />,
        },
        {
          title: sidebarLabel?.buildingType,
          link: '/admin-dashboard/setup/building-type',
          icon: <BsBuildings />,
        },
        {
          title: sidebarLabel?.buildingPurpose,
          link: '/admin-dashboard/setup/building-purpose',
          icon: <BsBuildings />,
        },
        {
          title: sidebarLabel?.buildingTaxCategory,
          link: '/admin-dashboard/setup/building-tax-category',
          icon: <BsBuildings />,
        },
        {
          title: sidebarLabel?.buildingTaxRate,
          link: '/admin-dashboard/setup/building-tax-rate',
          icon: <BsBuildings />,
        },
        {
          title: sidebarLabel?.floorType,
          link: '/admin-dashboard/setup/floor-type',
          icon: <BsBuildings />,
        },
        {
          title: sidebarLabel?.mudType,
          link: '/admin-dashboard/setup/mud-type',
          icon: <BsBuildings />,
        },
        {
          title: sidebarLabel?.landScapeCategory,
          link: '/admin-dashboard/setup/building-categoy',
          icon: <BsBuildings />,
        },
        {
          title: sidebarLabel?.landScapeType,
          link: '/admin-dashboard/setup/buildng-category',
          icon: <BsBuildings />,
        },
        {
          title: sidebarLabel?.landScapeName,
          link: '/admin-dashboard/setup/building-cagory',
          icon: <BsBuildings />,
        },
        {
          title: sidebarLabel?.landUseType,
          link: '/admin-dashboard/setup/building-category',
          icon: <BsBuildings />,
        },
        {
          title: sidebarLabel?.landOwnerType,
          link: '/admin-dashboard/setup/building-caty',
          icon: <BsBuildings />,
        },
        {
          title: sidebarLabel?.consultingForm,
          link: '/admin-dashboard/setup/building-cagory',
          icon: <BsBuildings />,
        },
        {
          title: sidebarLabel?.houseOwnerType,
          link: '/admin-dashboard/setup/house-owner-type',
          icon: <BsBuildings />,
        },

        // {
        //   title: sidebarLabel?.fiscalYear,
        //   link: '/admin-dashboard/setup/fiscal-year',
        //   icon: <BsCalendar2Date />,
        // },
        // {
        //   title: sidebarLabel?.department,
        //   link: '/admin-dashboard/setup/department',
        //   icon: <HiOutlineOfficeBuilding />,
        // },
        // {
        //   title: sidebarLabel?.designation,
        //   link: '/admin-dashboard/setup/designation',
        //   icon: <TbArmchair2 />,
        // },
        // {
        //   title: sidebarLabel?.official,
        //   link: '/admin-dashboard/setup/official',
        //   icon: <FiUsers />,
        // },
        // {
        //   title: sidebarLabel?.employee,
        //   link: '/admin-dashboard/setup/employee',
        //   icon: <FiUsers />,
        // },
        // {
        //   title: sidebarLabel?.admin,
        //   link: '/admin-dashboard/setup/admin',
        //   icon: <FiUsers />,
        // },
        // {
        //   title: sidebarLabel?.carousel,
        //   link: '/admin-dashboard/setup/carousel',
        //   icon: <TbCarouselHorizontal />,
        // },
        // {
        //   title: sidebarLabel?.faq,
        //   link: '/admin-dashboard/setup/faq',
        //   icon: <BsChatSquareText />,
        // },
        // {
        //   title: sidebarLabel?.resources,
        //   link: '/admin-dashboard/setup/resources',
        //   icon: <MdOutlineSource />,
        // },
      ],
    },
    {
      title: sidebarLabel?.designDataSetup,
      link: '#',
      icon: <BiNews />,
      openSubMenu: true,
      subMenu: [
        {
          title: sidebarLabel?.buildingByLaw,
          link: '/admin-dashboard/building-by-law',
          icon: <BiCategoryAlt />,
        },
        {
          title: sidebarLabel?.architecturalDesign,
          link: '/admin-dashboard/news-events-category',
          icon: <BiCategoryAlt />,
        },
        {
          title: sidebarLabel?.structuralDesign,
          link: '/admin-dashboard/news-events-category',
          icon: <BiCategoryAlt />,
        },
        {
          title: sidebarLabel?.technicalReportData,
          link: '/admin-dashboard/news-events-category',
          icon: <BiCategoryAlt />,
        },
        {
          title: sidebarLabel?.technicalLevel1ReportData,
          link: '/admin-dashboard/news-events-category',
          icon: <BiCategoryAlt />,
        },
        {
          title: sidebarLabel?.electricalDesign,
          link: '/admin-dashboard/news-events-category',
          icon: <BiCategoryAlt />,
        },
        {
          title: sidebarLabel?.sanitaryDesign,
          link: '/admin-dashboard/news-events-category',
          icon: <BiCategoryAlt />,
        },
      ],
    },
    {
      title: sidebarLabel?.applicationList,
      link: '/admin-dashboard/application-list',
      icon: <BiImage />,
    },
    {
      title: sidebarLabel?.report,
      link: '/admin-dashboard/report',
      icon: <VscFeedback />,
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
            <Text fontSize='2xl' color={'white'} pt='1'>
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
          {/* <Text as='small' color={'white'} mb='2'>
            {sidebarLabel?.search[lang]}
          </Text> */}
          <InputGroup size='sm'>
            <Input
              variant='filled'
              placeholder={sidebarLabel?.searchPlaceholder[lang]}
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
          {/* {!minimize && (
            <Text ps='4' as='small' color={'white'}>
              {sidebarLabel?.menuItems[lang]}
            </Text>
          )} */}
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

export default AdminSidebar
