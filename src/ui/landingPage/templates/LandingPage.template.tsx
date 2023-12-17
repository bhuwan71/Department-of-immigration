import { Box, Flex } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import Navbar from '@ui/landingPage/organisms/Navbar'
import Footer from '@ui/landingPage/organisms/Footer'

const LandingPageTemplate = () => {
  return (
    <Flex minH={'100vh'} direction={'column'} justifyContent={'space-between'}>
      <Box>
        <Box position={'sticky'} top='0' zIndex={2222}>
          <Navbar />
        </Box>
        <Box>
          <Outlet />
        </Box>
      </Box>
      <Footer />
    </Flex>
  )
}

export default LandingPageTemplate
