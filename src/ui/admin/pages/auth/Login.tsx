import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Text,
  useColorMode,
  useToast,
} from '@chakra-ui/react'
import { authLabel } from '@data/localization/common/auth'
import { generatePlaceholder } from '@functions/generateMessage'
import useLang from '@hooks/useLang'
import { loginSchema } from '@config/schema/common/auth.schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { DarkTheme, LightTheme } from '@utils/Colors'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineLock } from 'react-icons/ai'
import { BiHide, BiShow } from 'react-icons/bi'
import { IoMailUnreadOutline } from 'react-icons/io5'
import { AuthValues } from '@type/global.types'
import { useNavigate } from 'react-router-dom'
import { ADMIN_LOGIN } from '@graphql/admin/mutation/auth.mutation'
import { FetchResult, useMutation } from '@apollo/client'
import EncryptDecrypt from '@functions/EncryptDecrypt'
import useAuth from '@hooks/useAuth'
import { AdminLoginSchema } from '@graphql/schema/graphql'

const AdminLogin = () => {
  const { lang } = useLang()
  const toast = useToast()
  const navigate = useNavigate()
  const [show, setShow] = useState<boolean>(false)
  const handleClick = () => {
    setShow(!show)
  }
  const { setUser, setRememberMe, rememberMe } = useAuth()
  const { colorMode } = useColorMode()
  const [adminLoginFn] = useMutation(ADMIN_LOGIN)
  const { encrypt, decrypt } = EncryptDecrypt
  const decryptRememberMe = decrypt(rememberMe)
  const rememberMeData = JSON.parse(decryptRememberMe || '{}') as {
    email: string
    password: string
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthValues>({
    resolver: yupResolver(loginSchema(lang)),
    defaultValues: {
      email: rememberMeData?.email ?? '',
      password: rememberMeData?.password ?? '',
      rememberMe: false,
    },
  })

  const onSubmit = async (e: AuthValues) => {
    try {
      const response: FetchResult<{ adminLogin: AdminLoginSchema }> = await adminLoginFn({
        variables: {
          data: {
            email: e.email,
            password: e.password,
          },
        },
      })
      const encryptedData = encrypt(JSON.stringify(response?.data?.adminLogin)) as string
      setUser(encryptedData)

      if (e.rememberMe) {
        const encryptedRememberMe = encrypt(
          JSON.stringify({
            email: e?.email,
            password: e?.password,
          })
        ) as string
        setRememberMe(encryptedRememberMe)
      } else {
        setRememberMe('')
      }
      navigate('/admin-dashboard', {
        replace: true,
      })
      toast.closeAll()
      toast({
        title: authLabel?.success?.[lang],
        description: authLabel?.loginSuccessfully?.[lang],
        status: 'success',
        isClosable: true,
        duration: 2000,
      })
    } catch (err) {
      toast.closeAll()
      toast({
        title: authLabel?.error?.[lang],
        description: authLabel?.invalidLoginCredential?.[lang],
        status: 'error',
        isClosable: true,
        duration: 2000,
      })
    }
  }

  return (
    <Box
      width={{
        lg: '30vw',
        md: '50vw',
        base: '98vw',
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          <Text
            fontSize='md'
            fontWeight='bold'
            color={colorMode === 'light' ? LightTheme.primaryTextColor : DarkTheme.primaryTextColor}
          >
            {authLabel?.adminLogin[lang]}
          </Text>

          <FormControl isInvalid={errors.email != null}>
            <FormLabel>{authLabel?.emailOrMobileNumber[lang]}</FormLabel>
            <InputGroup size='sm'>
              <InputLeftElement pointerEvents='none'>
                <IoMailUnreadOutline />
              </InputLeftElement>
              <Input
                size='sm'
                variant={errors?.email != null ? 'error' : ''}
                type='text'
                {...register('email')}
                placeholder={generatePlaceholder(authLabel?.emailOrMobileNumber[lang], lang)}
              />
            </InputGroup>
            <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
          </FormControl>
          <FormControl pt='2' isInvalid={errors.password != null}>
            <FormLabel>{authLabel?.password[lang]} </FormLabel>
            <InputGroup size='sm'>
              <InputLeftElement pointerEvents='none'>
                <AiOutlineLock />
              </InputLeftElement>
              <Input
                variant={errors?.password != null ? 'error' : ''}
                type={show ? 'text' : 'password'}
                {...register('password')}
                placeholder={'xxxxxxxx'}
              />
              <InputRightElement onClick={handleClick} cursor='pointer'>
                {show ? <BiShow /> : <BiHide />}
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
          </FormControl>
          <Stack spacing={6}>
            <Stack direction={{ base: 'column', sm: 'row' }} align={'start'} justify={'space-between'}>
              <Checkbox {...register('rememberMe')} defaultChecked>
                {authLabel?.rememberMe?.[lang]}
              </Checkbox>
            </Stack>
            <Button
              isLoading={isSubmitting}
              loadingText={authLabel?.logging[lang]}
              size='sm'
              type='submit'
              width={'100%'}
              variant={'primary'}
            >
              {authLabel?.login[lang]}
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  )
}

export default AdminLogin
