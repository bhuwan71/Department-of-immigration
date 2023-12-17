import { useMutation } from '@apollo/client'
import { Box, Flex, IconButton, useToast } from '@chakra-ui/react'
import { notificationLabels, generateMessage } from '@data/localization/common/notification'
import { manageAdminLabel } from '@data/localization/admin/setting/manageAdmin'
import { tableLabel } from '@data/localization/common/table'
import { AdminRole } from '@data/localization/common/utils'
import { convertToDevanagari, digitConverter } from '@functions/digitConverter'
import { getMessage } from '@functions/generateMessage'
import tableSnGenerate from '@functions/tableSnGenerate'
import { DELETE_ADMIN } from '@graphql/admin/mutation/manageAdmin.mutation'
import { type AdminSchema } from '@graphql/schema/graphql'
import useLang from '@hooks/useLang'
import { createColumnHelper } from '@tanstack/react-table'
import { type IPagination } from '@type/pagination.types'
import ModalBox from '@ui/common/molecules/Modal'
import Table from '@ui/common/organisms/Table'
import { useEffect, useState } from 'react'
import { BiEdit } from 'react-icons/bi'
import { BsTrash } from 'react-icons/bs'
import { GET_ADMINS } from '@graphql/admin/query/manageAdmin.query'

interface IProps {
  loading: boolean
  values: AdminSchema[] | null
  pagination: IPagination
  setPagination: (data: IPagination) => void
  selectedValue: AdminSchema | null
  setSelectedValue: (data: AdminSchema) => void
}

const BuldingCategory = (props: IProps) => {
  const { loading, values, pagination, setPagination, setSelectedValue } = props
  const [open, setOpen] = useState<boolean>(false)
  const [confirm, setConfirm] = useState<boolean>(false)
  const [removeAdminFn, { loading: deleteLoading }] = useMutation(DELETE_ADMIN, {
    refetchQueries: [GET_ADMINS],
  })
  const [id, setId] = useState<string | null>(null)
  const toast = useToast()
  const { lang } = useLang()
  const columnHelper = createColumnHelper<any>()

  const handleDelete = async () => {
    try {
      await removeAdminFn({
        variables: {
          args: {
            id,
          },
        },
      })
      toast.closeAll()
      toast({
        title: notificationLabels?.success[lang],
        description: generateMessage(manageAdminLabel?.admin[lang], notificationLabels?.delete[lang], lang),
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
    } catch (err) {
      let message
      if (err instanceof Error) {
        message = err?.message
      }
      toast.closeAll()
      toast({
        title: notificationLabels?.error[lang],
        description: message ?? notificationLabels?.somethingWrongHappen[lang],
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    } finally {
      setId(null)
      setConfirm(false)
      setOpen(false)
    }
  }

  useEffect(() => {
    if (confirm && id) {
      void handleDelete()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirm])

  const columns = [
    columnHelper.accessor('SN', {
      header: () => <span>{tableLabel?.sn[lang]}</span>,
      size: 50,
      cell: (info: any) => {
        return (
          <span>
            {digitConverter(tableSnGenerate(+info.row.index, pagination?.currentPage, +pagination?.perPage))?.[lang]}.
          </span>
        )
      },
    }),
    columnHelper.accessor('fullName', {
      id: 'name',
      header: () => <span>{manageAdminLabel?.fullName[lang]}</span>,
      size: 200,
      cell: (info: any) => {
        return (
          <span>
            {info?.row?.original?.details?.firstName ?? '-'}
            {info?.row?.original?.details?.middleName ? ` ${info?.row?.original?.details?.middleName} ` : ''}
            &nbsp; {info?.row?.original?.details?.lastName ?? '-'}
          </span>
        )
      },
    }),
    columnHelper.accessor('email', {
      id: 'email',
      header: () => <span>{manageAdminLabel?.email[lang]}</span>,
      size: 200,
      cell: (info: any) => {
        return <span>{info?.row?.original?.email}</span>
      },
    }),
    columnHelper.accessor('phone', {
      id: 'phone',
      header: () => <span>{manageAdminLabel?.phoneNumber[lang]}</span>,
      size: 200,
      cell: (info: any) => {
        return (
          <span>
            {info?.row?.original?.details?.phoneNumber
              ? convertToDevanagari(info?.row?.original?.details?.phoneNumber as string, lang)
              : 'N/A'}
          </span>
        )
      },
    }),
    columnHelper.accessor('role', {
      id: 'role',
      header: () => <span>{manageAdminLabel?.role[lang]}</span>,
      size: 100,
      cell: (info: any) => {
        return (
          <span
            style={{
              textTransform: 'capitalize',
            }}
          >
            {AdminRole?.[info?.row?.original?.role]?.[lang]}
          </span>
        )
      },
    }),
    columnHelper.accessor('ward', {
      id: 'ward',
      header: () => <span>{manageAdminLabel?.wardNumber[lang]}</span>,
      size: 100,
      cell: (info: any) => {
        return (
          <span
            style={{
              textTransform: 'capitalize',
            }}
          >
            {info?.row?.original?.ward?.wardNumber
              ? convertToDevanagari(info?.row?.original?.ward?.wardNumber as string, lang)
              : manageAdminLabel?.municipalityEmployee[lang]}
          </span>
        )
      },
    }),
    columnHelper.accessor('action', {
      id: 'action',
      header: () => (
        <span
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {tableLabel?.action[lang]}
        </span>
      ),
      size: 100,
      cell: (info: any) => {
        return (
          <Flex gap='3' justifyContent='center'>
            <IconButton
              isDisabled={info?.row?.original?.role === 'SUDO_ADMIN' || info?.row?.original?.role === 'SUPER_ADMIN'}
              colorScheme='telegram'
              variant='outline'
              aria-label='edit'
              icon={<BiEdit />}
              onClick={() => {
                setSelectedValue(info?.row?.original as AdminSchema)
              }}
            />
            <IconButton
              isDisabled={info?.row?.original?.role === 'SUDO_ADMIN' || info?.row?.original?.role === 'SUPER_ADMIN'}
              colorScheme='red'
              variant='outline'
              aria-label='delete'
              icon={<BsTrash />}
              onClick={() => {
                setId(info?.row?.original?.id as string)
                setOpen(true)
              }}
            />
          </Flex>
        )
      },
    }),
  ]

  return (
    <Box>
      <Table
        title={getMessage(manageAdminLabel?.admin[lang], 'list', lang)}
        columns={columns}
        rowData={values ?? []}
        pagination={pagination}
        setPagination={setPagination}
        loading={loading}
      />
      <ModalBox
        isOpen={open}
        setOpen={setOpen}
        title={getMessage(manageAdminLabel?.admin[lang], 'delete', lang)}
        type='delete'
        confirm={confirm}
        setConfirm={setConfirm}
        isLoading={deleteLoading}
        size='sm'
      />
    </Box>
  )
}

export default BuldingCategory
