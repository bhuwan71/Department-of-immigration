import React from 'react'
import { Spinner, Box } from '@chakra-ui/react'

const Loader: React.FC = () => {
  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      minHeight='100vh' // Set the minimum height of the box to 100% of the viewport height
    >
      <Spinner size='lg' />
    </Box>
  )
}

export default Loader
