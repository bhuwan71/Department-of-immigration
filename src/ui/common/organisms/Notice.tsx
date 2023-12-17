import { Box, Button, Flex, Heading } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import NoticeCard from '../molecules/NoticeCard'
import apiInstance from '@api/api'
import Loader from '../atoms/Spinner'

// const data = [
//   {
//     title: 'विभिन्न प्रयोजनमा ईजरायल प्रस्थान गर्ने योजनामा रहनुभएका नेपाली नागरिकहरुको लागि अत्यन्त जरुरी सूचना',
//     date: '2020/3/4',
//     duration: '2 months ago',
//   },
//   {
//     title: 'विभिन्न प्रयोजनमा ईजरायल प्रस्थान गर्ने योजनामा रहनुभएका नेपाली नागरिकहरुको लागि अत्यन्त जरुरी सूचना',
//     date: '2020/3/4',
//     duration: '2 months ago',
//   },
//   {
//     title: 'विभिन्न प्रयोजनमा ईजरायल प्रस्थान गर्ने योजनामा रहनुभएका नेपाली नागरिकहरुको लागि अत्यन्त जरुरी सूचना',
//     date: '2020/3/4',
//     duration: '2 months ago',
//   },
//   {
//     title: 'विभिन्न प्रयोजनमा ईजरायल प्रस्थान गर्ने योजनामा रहनुभएका नेपाली नागरिकहरुको लागि अत्यन्त जरुरी सूचना',
//     date: '2020/3/4',
//     duration: '2 months ago',
//   },
// ]

const Notice = () => {
  const [data, setData] = useState<any>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  //  const { lang } = useLang()

  useEffect(() => {
    setIsLoading(true)
    apiInstance
      .get('/notices')
      .then((res) => setData(res?.data?.data))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false))
  }, [])

  console.log(data, 'data')

  return (
    <Box maxWidth={'275px'}>
      {isLoading ? (
        <Loader />
      ) : (
        <Flex flexDir={'column'} gap={'32px'}>
          <Heading as='h2' pb={'20px'} borderBottom={'1px'}>
            Notice
          </Heading>
          <Flex flexDir={'column'} gap={'32px'}>
            {data &&
              data.map((item: Record<string, string>, i: number) => (
                <React.Fragment key={i}>
                  <NoticeCard title={item.title} date={item.date} duration={item.duration} />
                </React.Fragment>
              ))}
            <Button colorScheme='blue'>View all Notices</Button>
          </Flex>
        </Flex>
      )}
    </Box>
  )
}

export default Notice
