import { useLazyQuery, useQuery } from '@apollo/client'
import {
  GET_ALL_PROVINCE,
  GET_DISTRICT_PROVINCE_ID,
  GET_MUNICIPALITIES_BY_DISTRICT_ID,
  GET_WARDS_BY_MUNICIPALITY_ID,
} from '@graphql/admin/query/address.query'
import { FormControl, FormErrorMessage, Grid, Select } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import useLang from '@hooks/useLang'
import { utilLabel } from '@data/localization/common/utils'
import { DistrictSchema, MunicipalitySchema, ProvinceSchema, WardSchema } from '@graphql/schema/graphql'
import { generatePlaceholder } from '@functions/generateMessage'
import { FieldErrors } from 'react-hook-form'

export interface ISelectedAddress {
  province: string
  district: string
  municipality: string
  ward?: string
}

export interface IDisable {
  province: boolean
  district: boolean
  municipality: boolean
  ward: boolean
}

interface IPropsType {
  selectedAddress: ISelectedAddress
  disable?: IDisable
  errors?: FieldErrors<{
    province: string
    district: string
    municipality: string
    ward?: string
  }>
  // setValue: (
  //   name: keyof {
  //     province: string
  //     district: string
  //     municipality: string
  //     // ward: string
  //   },
  //   value: string
  // ) => void
  setValue: (name: string, value: string) => void
  trigger: () => Promise<boolean> // Use a more specific type
  hideWard: boolean
}

const Address = (props: IPropsType) => {
  const { data } = useQuery<{ provinces: ProvinceSchema[] }>(GET_ALL_PROVINCE)
  const { lang } = useLang()
  const [getDistrictFn] = useLazyQuery<{ districtsByProvince: DistrictSchema[] }>(GET_DISTRICT_PROVINCE_ID)
  const [getMunicipalitiesFn] = useLazyQuery<{ municipalities: MunicipalitySchema[] }>(
    GET_MUNICIPALITIES_BY_DISTRICT_ID
  )
  const [getWardFn] = useLazyQuery<{ wards: WardSchema[] }>(GET_WARDS_BY_MUNICIPALITY_ID)

  const { selectedAddress, disable, errors, trigger, setValue, hideWard } = props

  // All Provinces and Districts and municipalities and Wards
  const [provinces, setProvinces] = useState<ProvinceSchema[] | null>(null)
  const [districts, setDistricts] = useState<DistrictSchema[] | null>(null)
  const [municipalities, setMunicipalities] = useState<MunicipalitySchema[] | null>(null)
  const [wards, setWards] = useState<WardSchema[] | null>(null)

  // For selected Province and District and municipality and Ward
  const [selectedProvince, setSelectedProvince] = useState<number | null>(null)
  const [selectedDistrict, setSelectedDistrict] = useState<number | null>(null)
  const [selectedMunicipality, setSelectedMunicipality] = useState<number | null>(null)
  const [selectedWard, setSelectedWard] = useState<number | null>(null)

  // if selected address is provide
  useEffect(() => {
    if (selectedAddress?.province) {
      const selectedProvince = provinces?.filter((province) => province.id === selectedAddress?.province)?.[0]
      setSelectedProvince(selectedProvince?.id ? +selectedProvince?.id : null)
    }
  }, [provinces, selectedAddress])

  useEffect(() => {
    if (selectedAddress?.district) {
      const selectedDistrictData = districts?.filter((district) => district.id === selectedAddress?.district)?.[0]
      setSelectedDistrict(selectedDistrictData?.id ? +selectedDistrictData?.id : null)
    }
  }, [districts, selectedAddress])

  useEffect(() => {
    if (selectedAddress?.municipality) {
      const selectedMunicipalityData = municipalities?.filter(
        (municipality) => municipality.id === selectedAddress?.municipality
      )?.[0]
      setSelectedMunicipality(selectedMunicipalityData?.id ? +selectedMunicipalityData?.id : null)
    }
  }, [municipalities, selectedAddress])

  useEffect(() => {
    if (selectedAddress?.ward) {
      const selectedWardData = wards?.filter((ward) => ward.id === selectedAddress?.ward)?.[0]
      setSelectedWard(selectedWardData?.id ? +selectedWardData : null)
    }
  }, [wards, selectedAddress])

  // Provinces
  useEffect(() => {
    if (data) {
      setProvinces(data?.provinces)
    }
  }, [data])

  useEffect(() => {
    if (selectedProvince) {
      void handleSelectProvince()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProvince])

  const handleSelectProvince = async () => {
    setDistricts(null)
    setMunicipalities(null)
    setWards(null)
    try {
      const { data } = await getDistrictFn({
        variables: {
          data: {
            id: selectedProvince?.toString(),
          },
        },
      })
      if (data?.districtsByProvince) {
        setDistricts(data?.districtsByProvince)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Districts
  useEffect(() => {
    if (selectedDistrict) {
      void handleSelectDistrict()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDistrict])

  const handleSelectDistrict = async () => {
    setMunicipalities(null)
    setWards(null)
    try {
      const { data } = await getMunicipalitiesFn({
        variables: {
          data: {
            id: selectedDistrict?.toString(),
          },
        },
      })
      if (data?.municipalities) {
        setMunicipalities(data?.municipalities)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // municipalities
  useEffect(() => {
    if (selectedMunicipality) {
      void handleSelectMunicipality()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMunicipality])

  const handleSelectMunicipality = async () => {
    try {
      const { data } = await getWardFn({
        variables: {
          data: {
            id: selectedMunicipality?.toString(),
          },
        },
      })

      if (data?.wards) {
        setWards(data?.wards)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Grid
      templateColumns={{
        lg: `repeat(${hideWard ? 3 : 4}, 1fr)`,
        md: 'repeat(4, 1fr)',
        base: 'repeat(1, 1fr)',
      }}
      gap='5'
    >
      <FormControl isInvalid={errors?.province?.message != null}>
        <Select
          variant={errors?.province?.message != null ? 'error' : ''}
          size='sm'
          onChange={(e) => {
            setSelectedProvince(+e?.target?.value)
            setValue('province', e?.target?.value)
            void trigger()
          }}
          value={selectedProvince?.toString()}
          placeholder={generatePlaceholder(utilLabel?.province?.[lang], lang, 'dropDown')}
          disabled={disable?.province ?? false}
        >
          {provinces?.map((province, index: number) => (
            <option key={index} value={province.id?.toString()}>
              {lang === 'en' ? province?.provinceTitle : province?.provinceTitleNepali}
            </option>
          ))}
        </Select>
        <FormErrorMessage>{errors?.province?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors?.district?.message != null}>
        <Select
          variant={errors?.district?.message != null ? 'error' : ''}
          size='sm'
          onChange={(e) => {
            setSelectedDistrict(+e?.target?.value)
            setValue('district', e?.target?.value)
            void trigger()
          }}
          value={selectedDistrict?.toString()}
          placeholder={generatePlaceholder(utilLabel?.district?.[lang], lang, 'dropDown')}
          disabled={disable?.district ?? false}
        >
          {districts?.map((district, index: number) => {
            return (
              <option key={index} value={district.id}>
                {lang === 'en' ? district?.districtTitle : district?.districtTitleNepali}
              </option>
            )
          })}
        </Select>
        <FormErrorMessage>{errors?.district?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors?.municipality?.message != null}>
        <Select
          variant={errors?.municipality?.message != null ? 'error' : ''}
          size='sm'
          onChange={(e) => {
            setSelectedMunicipality(+e?.target?.value)
            setValue('municipality', e?.target?.value)
            void trigger()
          }}
          value={selectedMunicipality?.toString()}
          placeholder={generatePlaceholder(utilLabel?.municipality?.[lang], lang, 'dropDown')}
          disabled={disable?.municipality ?? false}
        >
          {municipalities?.map((municipality, index: number) => {
            return (
              <option key={index} value={municipality.id}>
                {lang === 'en' ? municipality?.municipalityTitle : municipality?.municipalityTitleNepali}
              </option>
            )
          })}
        </Select>
        <FormErrorMessage>{errors?.municipality?.message}</FormErrorMessage>
      </FormControl>

      {!hideWard && (
        <FormControl isInvalid={errors?.ward?.message != null}>
          <Select
            variant={errors?.ward?.message != null ? 'error' : ''}
            size='sm'
            onChange={(e) => {
              setSelectedWard(+e?.target?.value)
              setValue('ward', e?.target?.value)
              void trigger()
            }}
            value={selectedWard?.toString()}
            placeholder={generatePlaceholder(utilLabel?.wardNumber?.[lang], lang, 'dropDown')}
            disabled={disable?.ward ?? false}
          >
            {wards?.map((ward, index: number) => {
              return (
                <option key={index} value={ward.id}>
                  {lang === 'en' ? ward?.wardNumber : ward?.wardNumberNepali}
                </option>
              )
            })}
          </Select>
          <FormErrorMessage>{errors?.ward?.message}</FormErrorMessage>
        </FormControl>
      )}
    </Grid>
  )
}
Address.defaultProps = {
  hideWard: false,
}

export default Address
