import {
  Box,
  Button,
  Center,
  chakra,
  Divider,
  Flex,
  Grid,
  GridItem,
  Link,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react'
import { officeInfo } from '@config/constant/office'
import { footerLabel } from '@data/localization/landingPage/footer'
import { convertToDevanagari } from '@functions/digitConverter'
import useLang from '@hooks/useLang'
import { Link as ReactLink } from 'react-router-dom'
import { type ReactNode } from 'react'
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'
import { AiOutlineUserSwitch } from 'react-icons/ai'
import { FaPhoneAlt } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { FaFacebook } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  )
}

const SocialButton = ({ children, label, href }: { children: ReactNode; label: string; href: string }) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  )
}

export default function LargeWithAppLinksAndSocial() {
  const { lang } = useLang()

  return (
    <>
      <Box
        bg={useColorModeValue('#343A40', '#343A40')}
        color={useColorModeValue('white', 'white')}
        position='relative'
        paddingX={10}

      >
        <Grid
          templateColumns={{
            xl: 'repeat(5, 1fr)',
            md: 'repeat(2, 1fr)',
            base: '1fr',
          }}
          px='4'
          py='6'
          gap={6}
        >
          <GridItem rowSpan={2} colSpan={2}>
            <Text fontSize='28px' >Contact Us </Text>
            <hr></hr>
            <Stack>
              <Flex gap='4' direction={'column'}>
                <Box>
                  <Text fontWeight={'600'} fontSize='18px'>
                    {officeInfo?.companyName?.[lang]}
                  </Text>
                  <Text>
                    Kalikasthan, Kathmandu.
                  </Text>
                </Box>
              </Flex>

              <Flex gap='4' direction='column'>
                <Flex gap='1' direction='row' align='center'>
                  <FaPhoneAlt size={14} /> +977-01-4529659, 4429660
                </Flex>
                <Flex gap='1' direction='row' align='center'>
                  <FaPhoneAlt size={14} /> +977-01-4529659, 4429660
                </Flex>
                <Flex gap='1' direction='row' align='center'>
                  <CiMail size={14} /> info@immigration.gov.np
                </Flex>

                <Box>
                  <Text fontSize='26px' >Follow Us on</Text>
                  <Flex gap='4' paddingTop={2} direction='row'>
                    <FaFacebook size={18} />
                    <FaTwitter size={18} />
                  </Flex>
                </Box>
              </Flex>
              <Text pt='1' fontSize={'14px'}>
                {officeInfo?.companyDescription?.[lang]}
              </Text>
            </Stack>
          </GridItem>

          <GridItem rowSpan={2} colSpan={2}>
            <Text fontSize='28px' >Organization Links </Text>
            <hr></hr>
            <Stack>

              <Flex gap='8' direction={'column'} paddingTop={5}>
                <Box>
                  <Link
                    href='#'
                    _hover={{ color: 'blue.500' }}
                    display='block'
                  >
                    <Flex gap='2' fontSize={'12px'} direction='row' align='center'>
                      <IoIosArrowForward size={14} />
                      Office of the Prime Minister and Council of Ministers
                    </Flex>
                  </Link>
                  <Link
                    href='#'
                    _hover={{ color: 'blue.500' }}
                    display='block'
                  >
                    <Flex gap='2' fontSize={'12px'} direction='row' align='center'>
                      <IoIosArrowForward size={14} />
                      Ministry of Home Affairs
                    </Flex>
                  </Link>
                  <Link
                    href='#'

                    _hover={{ color: 'blue.500' }}
                    display='block'
                  >
                    <Flex gap='2' fontSize={'12px'} direction='row' align='center'>
                      <IoIosArrowForward size={14} />
                      Ministry of Education, Science and Technology
                    </Flex>
                  </Link>
                  <Link

                    fontSize='sm'
                    _hover={{ color: 'blue.500' }}
                    display='block'
                  >
                    <Flex gap='2' fontSize={'12px'} direction='row' align='center'>
                      <IoIosArrowForward size={14} />
                      Department of Consular Services
                    </Flex>
                  </Link>
                  <Link
                    href='#'

                    _hover={{ color: 'blue.500' }}
                    display='block'
                  >
                    <Flex gap='2' fontSize={'12px'} direction='row' align='center'>
                      <IoIosArrowForward size={14} />
                      Department of Foreign Employment
                    </Flex>
                  </Link>
                  <Link
                    href='#'

                    _hover={{ color: 'blue.500' }}
                    display='block'
                  >
                    <Flex gap='2' fontSize={'12px'} direction='row' align='center'>
                      <IoIosArrowForward size={14} />
                      Department of Tourism
                    </Flex>
                  </Link>
                  <Link
                    href='#'

                    _hover={{ color: 'blue.500' }}
                    display='block'
                  >
                    <Flex gap='2' fontSize={'12px'} direction='row' align='center'>
                      <IoIosArrowForward size={14} />
                      Department of Passports
                    </Flex>
                  </Link>
                  <Link
                    href='#'
                    _hover={{ color: 'blue.500' }}
                    display='block'
                  >
                    <Flex gap='2' fontSize={'12px'} direction='row' align='center'>
                      <IoIosArrowForward size={14} />
                      Financial Comptroller General Office
                    </Flex>
                  </Link>
                  <Link
                    href='#'
                    _hover={{ color: 'blue.500' }}
                    display='block'
                  >
                    <Flex gap='2' fontSize={'12px'} direction='row' align='center'>
                      <IoIosArrowForward size={14} />
                      Nepal Rastra Bank
                    </Flex>
                  </Link>
                  <Link
                    href='#'
                    _hover={{ color: 'blue.500' }}
                    display='block'
                  >
                    <Flex gap='2' fontSize={'12px'} direction='row' align='center'>
                      <IoIosArrowForward size={14} />
                      Nepal Rastra Bank
                    </Flex>
                  </Link>
                  <Link
                    href='#'
                    _hover={{ color: 'blue.500' }}
                    display='block'
                  >
                    <Flex gap='2' fontSize={'12px'} direction='row' align='center'>
                      <IoIosArrowForward size={14} />
                      Nepalese Missions Abroad
                    </Flex>
                  </Link>
                </Box>
              </Flex>
            </Stack>
          </GridItem>



          <Stack align={'flex-start'}>

            <GridItem rowSpan={2} colSpan={2}>
              <Text fontSize='28px' >Office Hours</Text>
              <hr></hr>
              <Stack>

                <Flex gap='1' direction={'column'} paddingTop={5}>
                  <Flex gap='2' fontSize={'12px'} direction='row' align='center'>
                    10:00 AM - 4:00 PM (Normal Working Days, Sunday to Thursday)
                  </Flex>
                  <Flex gap='2' fontSize={'12px'} direction='row' align='center'>
                    10:00 AM - 3:00 PM (Friday)
                  </Flex>

                  <Flex gap='2' fontSize={'12px'} direction='row' align='center'>
                    Application Submission Hour: 10:30 AM - 2:30 PM
                  </Flex>
                </Flex>
              </Stack>
            </GridItem>
          </Stack>
        </Grid>

        <Box pb={3}>
          <Flex
            align={'center'}
            _before={{
              content: '""',
              borderBottom: '1px solid',
              borderColor: useColorModeValue('gray.200', 'gray.700'),
              flexGrow: 1,
              mr: 8,
            }}
            _after={{
              content: '""',
              borderBottom: '1px solid',
              borderColor: useColorModeValue('gray.200', 'gray.700'),
              flexGrow: 1,
              ml: 8,
            }}
          >
            <Text fontSize={'2xl'} textAlign={'center'}>
              Immigration Network
            </Text>
          </Flex>
          <Center pt='5' >
            <Link href='#'>
              <Flex direction='row' alignItems='center'>
                <Text fontSize={9}>TIA</Text>
                <Text mx='2'>|</Text>
              </Flex>
            </Link>
            <Link href='#'>
              <Flex direction='row' alignItems='center'>
                <Text fontSize={9}>POKHARA</Text>
                <Text mx='2'>|</Text>
              </Flex>
            </Link>
            <Link href='#'>
              <Flex direction='row' alignItems='center'>
                <Text fontSize={9}>KAKARVITTA@NEPAL</Text>
                <Text mx='2'>|</Text>
              </Flex>
            </Link>

            <Link href='#'>
              <Flex direction='row' alignItems='center'>
                <Text fontSize={9}> BIRGUNJ</Text>
                <Text mx='2'>|</Text>
              </Flex>
            </Link>

            <Link href='#'>
              <Flex direction='row' alignItems='center'>
                <Text fontSize={9}> KODARI</Text>
                <Text mx='2'>|</Text>
              </Flex>
            </Link>

            <Link href='#'>
              <Flex direction='row' alignItems='center'>
                <Text fontSize={9}>BELAHIA </Text>
              </Flex>
            </Link>

          </Center>

        </Box>

      </Box>
      <Flex justifyContent='space-between' color={"white"} padding={2} backgroundColor={"#114499"}>
        <Text fontSize={9}>Last Updated : 2023-12-17 04:09:34 04:09:34</Text>
        <Text fontSize={9}>
          © All Rights Reserved to Department of Immigration</Text>
        <Text fontSize={9}>Site Visited :</Text>
      </Flex>
    </>

  )
}
