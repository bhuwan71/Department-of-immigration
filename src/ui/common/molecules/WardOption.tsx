import { type DocumentNode, gql, useLazyQuery, useQuery } from '@apollo/client'
import { Select } from '@chakra-ui/react'
import { utilLabel } from '@data/localization/common/utils'
import { generatePlaceholder } from '@functions/generateMessage'
import { GET_OFFICE_MUNICIPALITY_ID } from '@graphql/admin/query/officeSetup.query'
import { OfficeSetupSchema, WardSchema } from '@graphql/schema/graphql'
import useLang from '@hooks/useLang'
import { useEffect, useState } from 'react'

interface IProps {
  value: string
  error?: boolean
  handleChange: (data: string) => void
  type?: 'WARD_NO' | 'WARD_ID'
  disabled: boolean
}

interface IWards {
  id: string
  wardNumber: number
  wardNumberNepali: string
}

const GET_WARDS: DocumentNode = gql`
  query Wards($data: ArgsInput!) {
    wards(data: $data) {
      id
      wardNumber
      wardNumberNepali
    }
  }
`

const WardOption = (props: IProps) => {
  const [value, setValue] = useState<string>('')
  console.log(value)
  const [wards, setWards] = useState<IWards[] | null>(null)
  const { lang } = useLang()

  useEffect(() => {
    props.handleChange(value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  useEffect(() => {
    if (props.value) setValue(props.value)
  }, [props.value])

  const { data: municipalityId } = useQuery<{ getOfficeSetup: OfficeSetupSchema }>(GET_OFFICE_MUNICIPALITY_ID, {
    fetchPolicy: 'network-only',
  })

  const [getWardFn, { data }] = useLazyQuery<{ wards: WardSchema[] }>(GET_WARDS, {
    variables: {
      data: {
        id: municipalityId?.getOfficeSetup?.address?.municipality?.id,
      },
    },
    fetchPolicy: 'cache-and-network',
  })

  useEffect(() => {
    if (municipalityId?.getOfficeSetup?.address?.municipality?.id) void getWardFn()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [municipalityId?.getOfficeSetup?.address?.municipality?.id])

  useEffect(() => {
    if (data?.wards) setWards(data?.wards)
  }, [data])

  return (
    <Select
      size='sm'
      placeholder={generatePlaceholder(utilLabel?.wardNumber[lang], lang, 'dropDown')}
      onChange={(e) => {
        setValue(e.target.value)
      }}
      value={value}
      disabled={props.disabled}
    >
      {wards &&
        wards?.length > 0 &&
        wards?.map((ward: IWards, index: number) => {
          return (
            <option value={props?.type !== 'WARD_NO' ? ward.id : ward.wardNumber} key={index}>
              {lang === 'en' ? ward.wardNumber : ward.wardNumberNepali}
            </option>
          )
        })}
    </Select>
  )
}
WardOption.defaultProps = {
  disabled: false,
}
export default WardOption
