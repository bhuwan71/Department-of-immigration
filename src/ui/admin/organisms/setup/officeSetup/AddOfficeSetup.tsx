import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  useToast,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { OFFICE_CREATE, OFFICE_UPDATE } from '@graphql/admin/mutation/officeSetup.mutation'
import { useForm } from 'react-hook-form'
import { utilLabel } from '@data/localization/common/utils'
import useLang from '@hooks/useLang'
import { notificationLabels, generateMessage } from '@data/localization/common/notification'
import RequireSign from '@ui/common/atoms/RequireSign'
import NepaliInput from '@ui/common/molecules/NepaliInput'
import { officeSetupLabel } from '@data/localization/admin/setup/officeSetup'
import { useMutation } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'
import { officeSetupSchema } from '@config/schema/admin/officeSetup.schema'
import ModalBox from '@ui/common/molecules/Modal'
import { IoMailUnreadOutline } from 'react-icons/io5'
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2'
import { AiOutlineNumber, AiOutlinePhone } from 'react-icons/ai'
import { MdOutlineFax } from 'react-icons/md'
import { generatePlaceholder } from '@functions/generateMessage'
import { OfficeSetupInput, OfficeSetupSchema } from '@graphql/schema/graphql'
import Address from '@ui/common/molecules/Address'
import envConfig from '@config/env.config'
import { officeProfileFakeData } from '@data/fakeFiller/fakeData'

interface IProps {
  officeSetup: { getOfficeSetup: OfficeSetupSchema } | undefined
  open: boolean
  setOpen: (open: boolean) => void
  refetch: () => void
}

const AddOfficeSetup = ({ officeSetup, open, setOpen, refetch }: IProps) => {
  const [createOfficeFn] = useMutation(OFFICE_CREATE)
  const [updateOfficeFn] = useMutation(OFFICE_UPDATE)
  const [address, setAddress] = useState<{
    province: string
    district: string
    municipality: string
  }>({
    province: '',
    district: '',
    municipality: '',
  })

  useEffect(() => {
    if (officeSetup?.getOfficeSetup?.address)
      setAddress({
        province: officeSetup?.getOfficeSetup?.address?.province?.id ?? '',
        district: officeSetup?.getOfficeSetup?.address?.district?.id ?? '',
        municipality: officeSetup?.getOfficeSetup?.address?.municipality?.id ?? '',
      })
  }, [officeSetup])

  const toast = useToast()

  const defaultValues = {
    officeName: '',
    address: {
      province: null,
      district: null,
      municipality: null,
    },
    email: '',
    phoneNumber: '',
    officeCode: '',
    fax: '',
  }
  const { lang } = useLang()

  useEffect(() => {
    if (officeSetup?.getOfficeSetup) {
      handleReset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [officeSetup])

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<OfficeSetupInput>({
    // @ts-expect-error
    resolver: yupResolver(officeSetupSchema(lang)),
    defaultValues,
  })

  const handleReset = () => {
    reset({
      officeName: officeSetup?.getOfficeSetup?.officeName ?? '',
      address: {
        province: officeSetup?.getOfficeSetup?.address?.province?.id
          ? +officeSetup?.getOfficeSetup?.address?.province?.id
          : null,
        district: officeSetup?.getOfficeSetup?.address?.district?.id
          ? +officeSetup?.getOfficeSetup?.address?.district?.id
          : null,
        municipality: officeSetup?.getOfficeSetup?.address?.municipality?.id
          ? +officeSetup?.getOfficeSetup?.address?.municipality?.id
          : null,
      },
      phoneNumber: officeSetup?.getOfficeSetup?.phoneNumber ?? '',
      email: officeSetup?.getOfficeSetup?.email ?? '',
      officeCode: officeSetup?.getOfficeSetup?.officeCode ?? '',
      fax: officeSetup?.getOfficeSetup?.fax ?? '',
    })
  }

  const onsubmit = async (data: OfficeSetupInput) => {
    try {
      if (officeSetup?.getOfficeSetup) {
        await updateOfficeFn({
          variables: {
            data: {
              email: data?.email,
              fax: data?.fax,
              officeCode: data?.officeCode,
              officeName: data?.officeName,
              phoneNumber: data?.phoneNumber,
              address: {
                province: data?.address?.province ? +data?.address?.province : null,
                district: data?.address?.district ? +data?.address?.district : null,
                municipality: data?.address?.municipality ? +data?.address?.municipality : null,
              },
              id: officeSetup?.getOfficeSetup?.id,
            },
          },
        })
      } else {
        await createOfficeFn({
          variables: {
            data: {
              email: data?.email,
              fax: data?.fax,
              officeCode: data?.officeCode,
              officeName: data?.officeName,
              phoneNumber: data?.phoneNumber,
              address: {
                province: data?.address?.province ? +data?.address?.province : null,
                district: data?.address?.district ? +data?.address?.district : null,
                municipality: data?.address?.municipality ? +data?.address?.municipality : null,
              },
            },
          },
        })
      }
      refetch()
      toast.closeAll()
      toast({
        title: notificationLabels?.success[lang],
        description: generateMessage(
          officeSetupLabel?.officeSetup[lang],
          officeSetup ? notificationLabels?.updated[lang] : notificationLabels?.added[lang],
          lang
        ),
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
    } catch (err) {
      let message
      if (err instanceof Error) {
        message = err?.message
      }
      console.log('error', message)
      toast.closeAll()
      toast({
        title: notificationLabels?.error[lang],
        description: message ?? notificationLabels?.somethingWrongHappen[lang],
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    } finally {
      setOpen(false)
    }
  }

  useEffect(() => {
    watch()
  }, [watch])

  const handleFakeFiller = () => {
    reset(officeProfileFakeData)
    setAddress({
      province: '4',
      district: '40',
      municipality: '422',
    })
  }

  return (
    <div>
      <ModalBox
        onCloseComplete={() => {
          if (officeSetup?.getOfficeSetup) {
            handleReset()
          }
        }}
        isOpen={open}
        setOpen={setOpen}
        title={officeSetupLabel?.officeSetup?.[lang]}
        data={
          <Box
            sx={{
              svg: {
                color: 'gray.700',
              },
            }}
          >
            {envConfig?.environment === 'DEVELOPMENT' && (
              <Flex display='flex' alignItems='center' justifyContent='flex-end'>
                <Button onClick={handleFakeFiller} size='sm' mx={2} colorScheme={'teal'} variant={'outline'}>
                  {utilLabel?.fakeFiller?.[lang]}
                </Button>
              </Flex>
            )}
            <form onSubmit={handleSubmit(onsubmit)}>
              <Heading lineHeight={1.1} fontSize={'16px'} pb='4'>
                {officeSetupLabel?.officeDetails[lang]}
              </Heading>
              <Flex
                direction={{
                  md: 'row',
                  base: 'column',
                }}
                justifyContent='space-between'
                gap='5'
              >
                <FormControl isInvalid={errors?.officeName != null}>
                  <FormLabel>
                    {officeSetupLabel?.officeName?.[lang]} <RequireSign />
                  </FormLabel>

                  <NepaliInput
                    error={errors?.officeName != null}
                    placeholder={generatePlaceholder(officeSetupLabel?.officeName[lang], lang)}
                    handleChange={async (e: string) => {
                      setValue(`officeName`, e)
                      await trigger(`officeName`)
                    }}
                    value={watch(`officeName`)}
                    icon={<HiOutlineBuildingOffice2 />}
                  />
                  <FormErrorMessage>{errors?.officeName?.message}</FormErrorMessage>
                </FormControl>
              </Flex>

              <Heading pt='4' lineHeight={1.1} fontSize={'16px'} pb='4' mt={4}>
                {officeSetupLabel?.officeAddress[lang]}
              </Heading>
              <Address
                selectedAddress={address}
                trigger={trigger}
                setValue={(name, value) => {
                  // @ts-expect-error
                  setValue(`address.${name}`, value)
                }}
                errors={errors?.address}
                hideWard={true}
              />

              <Heading pt='4' lineHeight={1.1} fontSize={'16px'} pb='4' mt={4}>
                {officeSetupLabel?.officeContact[lang]}
              </Heading>
              <Flex
                direction={{
                  md: 'row',
                  base: 'column',
                }}
                justifyContent='space-between'
                gap='5'
              >
                <FormControl isInvalid={errors?.email != null}>
                  <FormLabel>
                    {officeSetupLabel?.officeEmail?.[lang]} <RequireSign />
                  </FormLabel>
                  <InputGroup size={'sm'}>
                    <InputLeftElement pointerEvents='none'>
                      <IoMailUnreadOutline />
                    </InputLeftElement>
                    <Input
                      type='text'
                      placeholder={generatePlaceholder(officeSetupLabel?.officeEmail[lang], lang)}
                      size={'sm'}
                      variant={errors?.email != null ? 'error' : ''}
                      {...register('email')}
                    />
                  </InputGroup>
                  <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors?.phoneNumber != null}>
                  <FormLabel>
                    {officeSetupLabel?.officePhone?.[lang]} <RequireSign />
                  </FormLabel>
                  <InputGroup size={'sm'}>
                    <InputLeftElement pointerEvents='none'>
                      <AiOutlinePhone />
                    </InputLeftElement>
                    <Input
                      type='text'
                      placeholder={generatePlaceholder(officeSetupLabel?.officePhone[lang], lang)}
                      size={'sm'}
                      variant={errors?.phoneNumber != null ? 'error' : ''}
                      {...register('phoneNumber')}
                    />
                  </InputGroup>
                  <FormErrorMessage>{errors?.phoneNumber?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors?.officeCode != null}>
                  <FormLabel>
                    {officeSetupLabel?.officeCode?.[lang]} <RequireSign />
                  </FormLabel>
                  <InputGroup size={'sm'}>
                    <InputLeftElement pointerEvents='none'>
                      <AiOutlineNumber />
                    </InputLeftElement>
                    <Input
                      type='text'
                      placeholder={generatePlaceholder(officeSetupLabel?.officeCode?.[lang], lang)}
                      size={'sm'}
                      variant={errors?.officeCode != null ? 'error' : ''}
                      {...register('officeCode')}
                    />
                  </InputGroup>
                  <FormErrorMessage>{errors?.officeCode?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors?.fax != null}>
                  <FormLabel>
                    {officeSetupLabel?.fax?.[lang]} <RequireSign />
                  </FormLabel>
                  <InputGroup size={'sm'}>
                    <InputLeftElement pointerEvents='none'>
                      <MdOutlineFax />
                    </InputLeftElement>
                    <Input
                      type='text'
                      placeholder={generatePlaceholder(officeSetupLabel?.fax[lang], lang)}
                      size={'sm'}
                      variant={errors?.fax != null ? 'error' : ''}
                      {...register('fax')}
                    />
                  </InputGroup>
                  <FormErrorMessage>{errors?.fax?.message}</FormErrorMessage>
                </FormControl>
              </Flex>

              <Flex my='5' gap='5' justifyContent={'flex-end'}>
                <Button
                  size='sm'
                  variant={'outline'}
                  colorScheme='red'
                  onClick={() => {
                    setOpen(false)
                  }}
                >
                  {utilLabel?.cancel[lang]}
                </Button>

                <Button
                  type='submit'
                  isLoading={isSubmitting}
                  loadingText={utilLabel?.submitting[lang]}
                  size='sm'
                  variant={'primary'}
                >
                  {officeSetup?.getOfficeSetup?.id ? utilLabel?.update[lang] : utilLabel?.submit[lang]}
                </Button>
              </Flex>
            </form>
          </Box>
        }
      />
    </div>
  )
}

export default AddOfficeSetup
