import { Flex, Link, Text } from '@chakra-ui/react'
import { FaHome } from 'react-icons/fa'
import { FaArrowRight } from 'react-icons/fa'

const PageHeader = ({ title }: { title: string }) => {
  return (
    <Flex gap={1} pb={12}>
      <Link href='/'>
        <FaHome style={{ color: '#665f5f' }} />
      </Link>{' '}
      <FaArrowRight style={{ color: '#665f5f' }} />
      <Text style={{ color: '#665f5f' }}>{title}</Text>
    </Flex>
  )
}

export default PageHeader
