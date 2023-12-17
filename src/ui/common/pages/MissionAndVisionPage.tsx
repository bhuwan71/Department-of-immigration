import { Box, Flex } from '@chakra-ui/react'
import Notice from '../organisms/Notice'
import MissionAndVision from '../organisms/MissionAndVision'
import PageHeader from '../molecules/PageHeader'

const MissionAndVisionPage = () => {
  return (
    <Box maxWidth={'1920px'} px={4} my={8}>
      <PageHeader title='Mission And Vision' />
      <Flex gap={8} justifyContent={'space-between'}>
        <MissionAndVision />
        <Notice />
      </Flex>
    </Box>
  )
}

export default MissionAndVisionPage
