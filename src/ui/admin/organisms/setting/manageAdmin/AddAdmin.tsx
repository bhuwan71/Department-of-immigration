import {
  Box,
  Button,
  Card,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  useToast,
} from '@chakra-ui/react'
import { addAdminSchema, updateAdminSchema } from '@config/schema/admin/manageAdmin.schema'
import { notificationLabels, generateMessage } from '@data/localization/common/notification'
import { manageAdminLabel } from '@data/localization/admin/setting/manageAdmin'
import { utilLabel, AdminRole } from '@data/localization/common/utils'
import { getMessage } from '@functions/generateMessage'
import { yupResolver } from '@hookform/resolvers/yup'
import useLang from '@hooks/useLang'
import NepaliInput from '@ui/common/molecules/NepaliInput'
import RequireSign from '@ui/common/atoms/RequireSign'
import Modal from '@ui/common/molecules/Modal'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { BiHide, BiShow } from 'react-icons/bi'
import EncryptDecrypt from '@functions/EncryptDecrypt'
import useAuth from '@hooks/useAuth'
import { type AdminLoginSchema, type AdminInput, type AdminSchema, Role } from '@graphql/schema/graphql'
import { CREATE_ADMIN, UPDATE_ADMIN } from '@graphql/admin/mutation/manageAdmin.mutation'
import { useMutation } from '@apollo/client'
import { AiOutlineLock, AiOutlinePhone, AiOutlineUser } from 'react-icons/ai'
import { IoMailUnreadOutline } from 'react-icons/io5'
import envConfig from '@config/env.config'
import { adminFakeData } from '@data/fakeFiller/fakeData'
import WardOption from '@ui/common/molecules/WardOption'
import { GET_ADMINS } from '@graphql/admin/query/manageAdmin.query'

interface IProps {
  open: boolean
  setOpen: (data: boolean) => void
  selectedValue: AdminSchema | null
  setSelectedValue: (data: AdminSchema | null) => void
}

const Add = (props: IProps) => {
  const { open, setOpen, selectedValue, setSelectedValue } = props
  const { lang } = useLang()
  const { user } = useAuth()
  const { decrypt } = EncryptDecrypt
  const decryptAdminDetails = decrypt(user) as string

  const adminDetails = JSON.parse(decryptAdminDetails || '{}') as AdminLoginSchema

  const toast = useToast()
  const [show, setShow] = useState<boolean>(false)
  const [createAdminFn] = useMutation(CREATE_ADMIN, {
    refetchQueries: [GET_ADMINS],
  })
  const [updateAdminFn] = useMutation(UPDATE_ADMIN, {
    refetchQueries: [GET_ADMINS],
  })

  const handleClick = () => {
    setShow(!show)
  }

  const defaultValues = {
    email: '',
    password: '',
    role: undefined,
    ward: undefined,
    details: {
      firstName: '',
      middleName: '',
      lastName: '',
      phoneNumber: '',
    },
  }

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<AdminInput>({
    // @ts-expect-error
    resolver: yupResolver(selectedValue ? updateAdminSchema(lang) : addAdminSchema(lang)),
    defaultValues,
  })

  console.log('selectedValue', selectedValue)

  const hideWard = watch('role') === Role.SuperAdmin

  useEffect(() => {
    if (selectedValue) {
      reset({
        role: selectedValue?.role ?? undefined,
        ward: selectedValue?.ward?.id ? +selectedValue?.ward?.id : undefined,
        details: {
          firstName: selectedValue?.details?.firstName ?? '',
          middleName: selectedValue?.details?.middleName ?? '',
          lastName: selectedValue?.details?.lastName ?? '',
          phoneNumber: selectedValue?.details?.phoneNumber ?? '',
        },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValue])

  const onSubmit = async (data: AdminInput) => {
    const reqData = {
      role: data?.role,
      ward: data?.ward ? +data?.ward : null,
      details: {
        firstName: data?.details?.firstName,
        middleName: data?.details?.middleName,
        lastName: data?.details?.lastName,
        phoneNumber: data?.details?.phoneNumber,
      },
    }
    try {
      let res
      if (selectedValue) {
        res = await updateAdminFn({
          variables: {
            data: {
              id: selectedValue?.id,
              ...reqData,
            },
          },
        })
      } else {
        res = await createAdminFn({
          variables: {
            data: {
              email: data?.email,
              password: data?.password,
              ...reqData,
            },
          },
        })
      }
      // refetch()

      // invalidte query
      if (res?.data) {
        toast.closeAll()
        toast({
          title: notificationLabels?.success[lang],
          description: generateMessage(
            manageAdminLabel?.admin[lang],
            selectedValue ? notificationLabels?.updated[lang] : notificationLabels?.added[lang],
            lang
          ),
          status: 'success',
          duration: 2000,
          isClosable: true,
        })
      }
      reset(defaultValues)
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
      setOpen(false)
      setSelectedValue(null)
    }
  }

  useEffect(() => {
    if (selectedValue) {
      setOpen(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValue])

  useEffect(() => {
    watch()
  }, [watch])

  const handleFakeFiller = () => {
    reset(adminFakeData)
  }
  return (
    <Box>
      <Modal
        onCloseComplete={() => {
          reset(defaultValues)
        }}
        isOpen={open}
        setOpen={setOpen}
        title={getMessage(manageAdminLabel?.admin[lang], 'add', lang)}
        data={
          <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Card p='4' boxShadow={'xs'}>
                <Heading lineHeight={1.1} fontSize={'16px'} pb='4'>
                  {manageAdminLabel?.personalDetails[lang]}
                </Heading>
                {envConfig?.environment === 'DEVELOPMENT' && (
                  <Flex display='flex' alignItems='center' justifyContent='flex-end'>
                    <Button onClick={handleFakeFiller} size='sm' mx={2} colorScheme={'teal'} variant={'outline'}>
                      {utilLabel?.fakeFiller?.[lang]}
                    </Button>
                  </Flex>
                )}

                <Flex
                  direction={{
                    md: 'row',
                    base: 'column',
                  }}
                  justifyContent='space-between'
                  gap='5'
                  pt='5'
                >
                  <FormControl isInvalid={errors.details?.firstName != null}>
                    <FormLabel>
                      पहिलो नाम <RequireSign />
                    </FormLabel>
                    <NepaliInput
                      error={errors.details?.firstName != null}
                      placeholder={'पहिलो नाम लेख्नुहोस |'}
                      handleChange={async (e: string) => {
                        setValue(`details.firstName`, e)
                        await trigger(`details.firstName`)
                      }}
                      value={watch(`details.firstName`)}
                      icon={<AiOutlineUser />}
                    />
                    <FormErrorMessage>{errors?.details?.firstName?.message}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={errors.details?.middleName != null}>
                    <FormLabel>बिचको नाम </FormLabel>

                    <NepaliInput
                      error={errors.details?.middleName != null}
                      placeholder={'बिचको नाम लेख्नुहोस |'}
                      handleChange={async (e: string) => {
                        setValue(`details.middleName`, e)
                        await trigger(`details.middleName`)
                      }}
                      value={watch(`details.middleName`) ?? ''}
                      icon={<AiOutlineUser />}
                    />
                    <FormErrorMessage>{errors?.details?.middleName?.message}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={errors.details?.lastName != null}>
                    <FormLabel>
                      थर <RequireSign />
                    </FormLabel>

                    <NepaliInput
                      error={errors.details?.lastName != null}
                      placeholder={'थर लेख्नुहोस |'}
                      handleChange={async (e: string) => {
                        setValue(`details.lastName`, e)
                        await trigger(`details.lastName`)
                      }}
                      value={watch(`details.lastName`)}
                      icon={<AiOutlineUser />}
                    />

                    <FormErrorMessage>{errors?.details?.lastName?.message}</FormErrorMessage>
                  </FormControl>
                </Flex>
              </Card>
              <Card mt='5' p='4' boxShadow={'xs'}>
                <Heading lineHeight={1.1} fontSize={'16px'} pb='4'>
                  {manageAdminLabel?.contactDetails[lang]}
                </Heading>
                <Flex
                  direction={{
                    md: 'row',
                    base: 'column',
                  }}
                  justifyContent='space-between'
                  gap='5'
                >
                  <FormControl isInvalid={errors.email != null}>
                    <FormLabel>
                      {manageAdminLabel?.email[lang]} <RequireSign />
                    </FormLabel>
                    <InputGroup size={'sm'}>
                      <InputLeftElement pointerEvents='none'>
                        <IoMailUnreadOutline />
                      </InputLeftElement>
                      <Input
                        isDisabled={selectedValue?.email != null}
                        size='sm'
                        variant={errors?.email != null ? 'error' : ''}
                        type='email'
                        {...register('email')}
                        placeholder={manageAdminLabel?.emailPlaceholder[lang]}
                      />
                    </InputGroup>
                    <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={errors.details?.phoneNumber != null}>
                    <FormLabel>
                      {manageAdminLabel?.phoneNumber[lang]} <RequireSign />
                    </FormLabel>
                    <InputGroup size={'sm'}>
                      <InputLeftElement pointerEvents='none'>
                        <AiOutlinePhone />
                      </InputLeftElement>
                      <Input
                        size='sm'
                        variant={errors?.details?.phoneNumber != null ? 'error' : ''}
                        type='tel'
                        {...register('details.phoneNumber')}
                        placeholder={manageAdminLabel?.phoneNumberPlaceholder[lang]}
                      />
                    </InputGroup>
                    <FormErrorMessage>{errors?.details?.phoneNumber?.message}</FormErrorMessage>
                  </FormControl>
                </Flex>
              </Card>
              <Card mt='5' p='4' boxShadow={'xs'}>
                <Heading lineHeight={1.1} fontSize={'16px'} pb='4'>
                  {manageAdminLabel?.administrativeDetails[lang]}
                </Heading>
                <Flex
                  direction={{
                    md: 'row',
                    base: 'column',
                  }}
                  justifyContent='space-between'
                  gap='5'
                >
                  <FormControl isInvalid={errors.role != null}>
                    <FormLabel>
                      {manageAdminLabel?.role[lang]} <RequireSign />
                    </FormLabel>
                    <Select size='sm' {...register('role')} placeholder={manageAdminLabel?.selectAdminRole[lang]}>
                      {Object.values(Role).map((role: Role) => {
                        if (role === Role.SudoAdmin) return null

                        if (adminDetails?.admin?.role !== Role.SudoAdmin) if (role === Role.SuperAdmin) return null
                        if (adminDetails?.admin?.role !== Role.SuperAdmin)
                          if (role === 'MUNICIPALITY_ADMIN') return null
                        return (
                          <option key={role} value={role}>
                            {AdminRole?.[role][lang]}
                          </option>
                        )
                      })}
                    </Select>
                    <FormErrorMessage>{errors?.role?.message}</FormErrorMessage>
                  </FormControl>
                  {!hideWard ? (
                    <FormControl isInvalid={errors.ward != null}>
                      <FormLabel>
                        {manageAdminLabel?.wardNumber[lang]} <RequireSign />
                      </FormLabel>
                      <WardOption
                        error={errors?.ward != null}
                        handleChange={(e: string) => {
                          setValue('ward', +e)
                          void trigger(`ward`)
                        }}
                        value={selectedValue?.ward?.id ?? ''}
                      />
                      <FormErrorMessage>{errors?.ward?.message}</FormErrorMessage>
                    </FormControl>
                  ) : (
                    <FormControl></FormControl>
                  )}
                </Flex>
              </Card>
              {!selectedValue ? (
                <Card mt='5' p='4' boxShadow={'xs'}>
                  <Heading lineHeight={1.1} fontSize={'16px'} pb='4'>
                    {manageAdminLabel?.security[lang]}
                  </Heading>
                  <Flex
                    direction={{
                      md: 'row',
                      base: 'column',
                    }}
                    justifyContent='space-between'
                    gap='5'
                  >
                    <FormControl isInvalid={errors.password != null}>
                      <FormLabel>
                        {manageAdminLabel?.password[lang]} <RequireSign />
                      </FormLabel>
                      <InputGroup size='sm'>
                        <InputLeftElement pointerEvents='none'>
                          <AiOutlineLock />
                        </InputLeftElement>
                        <Input
                          {...register('password')}
                          size={'sm'}
                          type={show ? 'text' : 'password'}
                          variant={errors?.password != null ? 'error' : ''}
                          placeholder={'xxxxxxxx'}
                        />
                        <InputRightElement onClick={handleClick} cursor='pointer'>
                          {show ? <BiShow /> : <BiHide />}
                        </InputRightElement>
                      </InputGroup>

                      <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
                    </FormControl>
                  </Flex>
                </Card>
              ) : (
                ''
              )}

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
                  {selectedValue ? utilLabel?.update[lang] : utilLabel?.submit[lang]}
                </Button>
              </Flex>
            </form>
          </Box>
        }
      />
    </Box>
  )
}

export default Add
