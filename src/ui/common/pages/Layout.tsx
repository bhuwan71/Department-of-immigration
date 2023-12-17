import { Flex } from '@chakra-ui/react'
import LayoutTable from '../molecules/LayoutTable'
import Notice from '../organisms/Notice'

const Layout = () => {
  return (
    <Flex maxWidth={'1920px'} gap={40}>
      <LayoutTable />
      <Notice />
    </Flex>
  )
}

export default Layout
