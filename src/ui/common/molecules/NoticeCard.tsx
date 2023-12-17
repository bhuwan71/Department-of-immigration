import { Flex, Text } from '@chakra-ui/react'
import { GoClock } from 'react-icons/go'
import { FaRegCalendarAlt } from 'react-icons/fa'

interface IProp {
  title: string
  date: string
  duration: string
}

const NoticeCard = ({ title, date, duration }: IProp) => {
  return (
    <Flex gap={'16px'} flexDirection={'column'}>
      <Text>{title}</Text>
      <Flex justifyContent={'space-between'}>
        <Flex alignItems={'center'} gap={1}>
          <FaRegCalendarAlt style={{ height: '12px', width: '12px' }} />

          <Text fontSize={'xs'}>{date}</Text>
        </Flex>

        <Flex alignItems={'center'} gap={1}>
          <GoClock style={{ height: '12px', width: '12px' }} />
          <Text fontSize={'xs'}>{duration}</Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default NoticeCard
