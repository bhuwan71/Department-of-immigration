import { useQuery } from '@apollo/client'
import { Box } from '@chakra-ui/react'
import { manageAdminLabel } from '@data/localization/admin/setting/manageAdmin'
import { utilLabel } from '@data/localization/common/utils'
import { GET_ADMINS } from '@graphql/admin/query/manageAdmin.query'
import { type PaginatedAdminSchema, type AdminSchema } from '@graphql/schema/graphql'
import useLang from '@hooks/useLang'
import usePagination from '@hooks/usePagination'
import Add from '@ui/admin/organisms/setting/manageAdmin/AddAdmin'
import Show from '@ui/admin/organisms/setting/manageAdmin/ShowAdmin'

import Header from '@ui/common/molecules/Header'
import { useEffect, useState } from 'react'
import { MdOutlineBookmarkAdd } from 'react-icons/md'

const ManageAdmin = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [pagination, setPagination] = usePagination()
  const [values, setValues] = useState<AdminSchema[] | null>(null)
  const [selectedValue, setSelectedValue] = useState<AdminSchema | null>(null)
  const { lang } = useLang()

  const { data, loading } = useQuery<{ admins: PaginatedAdminSchema }>(GET_ADMINS, {
    variables: {
      data: {
        page: pagination.currentPage,
        perPage: pagination.perPage,
        search: pagination?.searchTerm ?? '',
      },
    },
    fetchPolicy: 'network-only',
  })

  useEffect(() => {
    if (data?.admins?.data) {
      setValues(data?.admins?.data)
      setPagination({
        ...pagination,
        total: data?.admins?.total ?? 1,
        totalPages: data?.admins?.totalPages ?? 1,
        currentPage: data?.admins?.page ?? 1,
        perPage: data?.admins?.perPage ?? 20,
        refreshTable: false,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.admins])

  useEffect(() => {
    if (selectedValue) {
      setOpen(true)
    }
  }, [selectedValue])

  useEffect(() => {
    if (!open) {
      setSelectedValue(null)
    }
  }, [open])

  return (
    <Box>
      <Header
        buttonText={utilLabel?.add[lang]}
        buttonIcon={<MdOutlineBookmarkAdd />}
        header={manageAdminLabel?.manageAdmin[lang]}
        setOpen={setOpen}
      />
      <Add open={open} setOpen={setOpen} selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
      <Show
        loading={loading}
        values={values}
        pagination={pagination}
        setPagination={setPagination}
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
      />
    </Box>
  )
}

export default ManageAdmin
