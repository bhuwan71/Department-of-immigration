import { Box, Button, Flex, Heading } from '@chakra-ui/react'
import React from 'react'
import NoticeCard from '../molecules/NoticeCard'

const data = [
  {
    title: 'विभिन्न प्रयोजनमा ईजरायल प्रस्थान गर्ने योजनामा रहनुभएका नेपाली नागरिकहरुको लागि अत्यन्त जरुरी सूचना',
    date: '2020/3/4',
    duration: '2 months ago',
  },
  {
    title: 'विभिन्न प्रयोजनमा ईजरायल प्रस्थान गर्ने योजनामा रहनुभएका नेपाली नागरिकहरुको लागि अत्यन्त जरुरी सूचना',
    date: '2020/3/4',
    duration: '2 months ago',
  },
  {
    title: 'विभिन्न प्रयोजनमा ईजरायल प्रस्थान गर्ने योजनामा रहनुभएका नेपाली नागरिकहरुको लागि अत्यन्त जरुरी सूचना',
    date: '2020/3/4',
    duration: '2 months ago',
  },
  {
    title: 'विभिन्न प्रयोजनमा ईजरायल प्रस्थान गर्ने योजनामा रहनुभएका नेपाली नागरिकहरुको लागि अत्यन्त जरुरी सूचना',
    date: '2020/3/4',
    duration: '2 months ago',
  },
]

const Notice = () => {
  return (
    <Box maxWidth={'275px'}>
      <Flex flexDir={'column'} gap={'32px'}>
        <Heading as='h2' py={'20px'} borderBottom={'1px'}>
          Notice
        </Heading>
        <Flex flexDir={'column'} gap={'32px'}>
          {data &&
            data.map((item, i) => (
              <React.Fragment key={i}>
                <NoticeCard title={item.title} date={item.date} duration={item.duration} />
              </React.Fragment>
            ))}
          <Button colorScheme='blue'>View all Notices</Button>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Notice
