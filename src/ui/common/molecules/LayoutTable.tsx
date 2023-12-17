import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Box } from '@chakra-ui/react'

const LayoutTable = () => {
  return (
    <Box maxWidth={1020}>
      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>Act Detail</Th>
              <Th>Files</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>inches</Td>
              <Td>millimetres (mm)</Td>
              <Td isNumeric>25.4</Td>
            </Tr>
            <Tr>
              <Td>feet</Td>
              <Td>centimetres (cm)</Td>
              <Td isNumeric>30.48</Td>
            </Tr>
            <Tr>
              <Td>yards</Td>
              <Td>metres (m)</Td>
              <Td isNumeric>0.91444</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default LayoutTable
