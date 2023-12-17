import { useEffect } from 'react'
import { Box, useColorMode } from '@chakra-ui/react'
import Sidebar from '@ui/user/organisms/Sidebar'
import Navbar from '@ui/user/organisms/Navbar'
import BreadcrumbMenu from '@ui/common/molecules/Breadcrumb'
import { Outlet } from 'react-router-dom'

/**
 * UserDashboardTemplate component serves as the layout template for the admin panel.
 * It includes a sidebar, navbar, breadcrumb navigation, and content area.
 */
const UserDashboardTemplate = () => {
  // Hooks and state management
  const { setColorMode } = useColorMode()

  useEffect(() => {
    // Set the color mode to 'light' for the admin panel
    setColorMode('light')
  }, [setColorMode])

  return (
    <Box
      display={{
        md: 'flex',
        base: 'block',
      }}
    >
      {/* Sidebar */}
      <Sidebar />

      <Box width={'100%'} height={{ base: '100%', md: '100vh' }} overflowY='auto'>
        <Box p='2'>
          {/* Navbar */}
          <Navbar />

          {/* Breadcrumb navigation */}
          <BreadcrumbMenu baseUrl='/admin-dashboard' />

          <Box
            style={{
              overflowY: 'auto',
              height: 'calc(100vh - 105px)',
            }}
            pt='2'
          >
            {/* Render nested routes */}
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default UserDashboardTemplate
