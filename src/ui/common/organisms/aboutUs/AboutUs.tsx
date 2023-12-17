import { Box, Heading, Image } from '@chakra-ui/react'
import useLang from '@hooks/useLang'

const AboutUs = ({ data }: { data: any }) => {
  const { lang } = useLang()

  return (
    <Box>
      <Heading as={'h3'}>{lang == 'en' ? data?.title : data?.nepaliTitle}</Heading>
      <Box dangerouslySetInnerHTML={{ __html: data?.description }} />
      {data?.file && <Image src={data?.path} pt={8} />}
    </Box>
  )
}

export default AboutUs
