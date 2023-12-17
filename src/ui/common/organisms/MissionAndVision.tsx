import { Box, Heading, Spinner } from '@chakra-ui/react'
import useLang from '@hooks/useLang'

const MissionAndVision = ({ data }: { data: any }) => {
  const { lang } = useLang()

  return (
    <Box>
      <Heading as={'h3'}>{lang == 'en' ? data?.title : data?.nepaliTitle}</Heading>
      <Box dangerouslySetInnerHTML={{ __html: data?.description }} />
    </Box>
  )
}

export default MissionAndVision
