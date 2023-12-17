import Header from '@ui/common/molecules/Header'
import { GET_OFFICE_SETUP } from '@graphql/admin/query/officeSetup.query'
import useLang from '@hooks/useLang'
import { officeSetupLabel } from '@data/localization/admin/setup/officeSetup'
import ShowOfficeSetup from '@ui/admin/organisms/setup/officeSetup/ShowOfficeSetup'
import AddOfficeSetup from '@ui/admin/organisms/setup/officeSetup/AddOfficeSetup'
import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { OfficeSetupSchema } from '@graphql/schema/graphql'
import { Box } from '@chakra-ui/react'

const OfficeSetup = () => {
  const [open, setOpen] = useState(false)
  const { data, loading, refetch } = useQuery<{ getOfficeSetup: OfficeSetupSchema }>(GET_OFFICE_SETUP, {
    fetchPolicy: 'network-only',
  })
  const { lang } = useLang()

  return (
    <Box>
      <Header header={officeSetupLabel?.officeSetup?.[lang]} />
      <ShowOfficeSetup officeSetup={data?.getOfficeSetup} setOpen={setOpen} loading={loading} />
      <AddOfficeSetup officeSetup={data} open={open} setOpen={setOpen} refetch={refetch} />
    </Box>
  )
}

export default OfficeSetup
