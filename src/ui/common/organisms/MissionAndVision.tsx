import apiInstance from '@api/api'
import { Box, Heading, Spinner } from '@chakra-ui/react'
import useLang from '@hooks/useLang'
import { useEffect, useState } from 'react'

const MissionAndVision = () => {
  const [data, setData] = useState<any>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { lang } = useLang()

  useEffect(() => {
    setIsLoading(true)
    apiInstance
      .get('/aboutus/4')
      .then((res) => setData(res?.data))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <Box>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Heading as={'h3'}>{lang == 'en' ? data?.title : data?.nepaliTitle}</Heading>
          <Box dangerouslySetInnerHTML={{ __html: data?.description }} />
        </>
      )}
    </Box>
  )
}

export default MissionAndVision
