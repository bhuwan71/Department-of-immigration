import { Box, Flex } from '@chakra-ui/react'
import Notice from '../../organisms/Notice'
import MissionAndVision from '../../organisms/aboutUs/AboutUs'
import PageHeader from '../../molecules/PageHeader'
import apiInstance from '@api/api'
import { useEffect, useState } from 'react'
import Loader from '../../atoms/Spinner'
import useLang from '@hooks/useLang'
import { useParams } from 'react-router-dom'

const AboutUsPage = () => {
  const [data, setData] = useState<any>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { lang } = useLang()
  const { id } = useParams()

  useEffect(() => {
    setIsLoading(true)
    apiInstance
      .get(`/aboutus/${id}`)
      .then((res) => setData(res?.data))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false))
  }, [id])
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Box maxWidth={'1920px'} px={4} my={8}>
          <PageHeader title={lang == 'en' ? data?.title : data?.nepaliTitle} />
          <Flex gap={8} justifyContent={'space-between'}>
            <MissionAndVision data={data} />
            <Notice />
          </Flex>
        </Box>
      )}
    </>
  )
}

export default AboutUsPage
