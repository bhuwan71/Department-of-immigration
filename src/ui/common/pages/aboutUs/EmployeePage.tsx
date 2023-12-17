import { Box } from '@chakra-ui/react'
import PageHeader from '../../molecules/PageHeader'
import apiInstance from '@api/api'
import { useEffect, useState } from 'react'
import Loader from '../../atoms/Spinner'
import useLang from '@hooks/useLang'
import AboutUs from '../../organisms/aboutUs/AboutUs'

const EmployeePage = () => {
  const [data, setData] = useState<any>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { lang } = useLang()

  useEffect(() => {
    setIsLoading(true)
    apiInstance
      .get(`employee`)
      .then((res) => setData(res?.data))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false))
  }, [])
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Box maxWidth={'1920px'} px={4} my={8}>
          <PageHeader title={lang == 'en' ? 'Employee Detail' : 'कर्मचारी विवरण'} />
        </Box>
      )}
    </>
  )
}

export default EmployeePage
