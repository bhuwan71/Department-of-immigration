import { Button, Grid, GridItem, Text } from '@chakra-ui/react'
import { officeSetupLabel } from '@data/localization/admin/setup/officeSetup'
import useLang from '@hooks/useLang'
import { utilLabel } from '@data/localization/common/utils'
import { convertToDevanagari } from '@functions/digitConverter'
import { BiEdit } from 'react-icons/bi'
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2'
import { AiOutlineMail, AiOutlineNumber, AiOutlinePhone } from 'react-icons/ai'
import { MdOutlineFax, MdOutlineLocationOn } from 'react-icons/md'
import { type OfficeSetupSchema } from '@graphql/schema/graphql'

interface IProps {
  officeSetup: OfficeSetupSchema | undefined
  setOpen: (open: boolean) => void
  loading: boolean
}
const ShowOfficeSetup = ({ officeSetup, setOpen, loading }: IProps) => {
  const { lang } = useLang()

  return (
    <Grid
      templateColumns={{
        md: 'repeat(8,1fr)',
        base: 'repeat(1,1fr)',
      }}
    >
      <GridItem
        colSpan={{
          md: 6,
          base: 1,
        }}
      >
        <Grid
          templateColumns={{
            lg: 'repeat(6,1fr)',
            md: 'repeat(2,1fr)',
            base: 'repeat(2,1fr)',
          }}
          pb='3'
        >
          <Text display={'flex'}>
            <HiOutlineBuildingOffice2 /> &nbsp; {officeSetupLabel?.officeName?.[lang]}
          </Text>
          <GridItem
            colSpan={{
              lg: 5,
              base: 1,
            }}
          >
            <Text>
              :&nbsp;
              {loading ? officeSetupLabel?.loading?.[lang] : officeSetup?.officeName ?? officeSetupLabel?.na?.[lang]}
            </Text>
          </GridItem>
        </Grid>
        <Grid
          templateColumns={{
            lg: 'repeat(6,1fr)',
            md: 'repeat(2,1fr)',
            base: 'repeat(2,1fr)',
          }}
          pb='3'
        >
          <Text display={'flex'}>
            <AiOutlinePhone /> &nbsp; {officeSetupLabel?.officePhone?.[lang]}
          </Text>
          <Text>
            :&nbsp;
            {loading
              ? officeSetupLabel?.loading?.[lang]
              : officeSetup?.phoneNumber
              ? convertToDevanagari(officeSetup?.phoneNumber, lang)
              : officeSetupLabel?.na?.[lang]}
          </Text>
        </Grid>
        <Grid
          templateColumns={{
            lg: 'repeat(6,1fr)',
            md: 'repeat(2,1fr)',
            base: 'repeat(2,1fr)',
          }}
          pb='3'
        >
          <Text display={'flex'}>
            <AiOutlineMail /> &nbsp; {officeSetupLabel?.officeEmail?.[lang]}
          </Text>
          <Text>
            &nbsp;:&nbsp;
            {loading ? officeSetupLabel?.loading?.[lang] : officeSetup?.email ?? officeSetupLabel?.na?.[lang]}
          </Text>
        </Grid>
        <Grid
          templateColumns={{
            lg: 'repeat(6,1fr)',
            md: 'repeat(2,1fr)',
            base: 'repeat(2,1fr)',
          }}
          pb='3'
        >
          <Text display={'flex'}>
            <AiOutlineNumber /> &nbsp; {officeSetupLabel?.officeCode?.[lang]}
          </Text>
          <Text>
            :&nbsp;
            {loading
              ? officeSetupLabel?.loading?.[lang]
              : officeSetup?.officeCode
              ? convertToDevanagari(officeSetup?.officeCode, lang)
              : officeSetupLabel?.na?.[lang]}
          </Text>
        </Grid>{' '}
        <Grid
          templateColumns={{
            lg: 'repeat(6,1fr)',
            md: 'repeat(2,1fr)',
            base: 'repeat(2,1fr)',
          }}
          pb='3'
        >
          <Text display={'flex'}>
            <MdOutlineFax /> &nbsp; {officeSetupLabel?.fax?.[lang]}
          </Text>
          <Text>
            :&nbsp;
            {loading
              ? officeSetupLabel?.loading?.[lang]
              : officeSetup?.fax
              ? convertToDevanagari(officeSetup?.fax, lang)
              : officeSetupLabel?.na?.[lang]}
          </Text>
        </Grid>
        <Grid
          templateColumns={{
            lg: 'repeat(6,1fr)',
            md: 'repeat(2,1fr)',
            base: 'repeat(2,1fr)',
          }}
          pb='3'
        >
          <Text display={'flex'}>
            <MdOutlineLocationOn style={{ marginTop: '2px' }} /> &nbsp; {officeSetupLabel?.province?.[lang]}
          </Text>
          <Text>
            :&nbsp;
            {loading
              ? officeSetupLabel?.loading?.[lang]
              : (lang === 'en'
                  ? officeSetup?.address?.province?.provinceTitle
                  : officeSetup?.address?.province?.provinceTitleNepali) ?? officeSetupLabel?.na?.[lang]}
          </Text>
        </Grid>
        <Grid
          templateColumns={{
            lg: 'repeat(6,1fr)',
            md: 'repeat(2,1fr)',
            base: 'repeat(2,1fr)',
          }}
          pb='3'
        >
          <Text display={'flex'}>
            <MdOutlineLocationOn style={{ marginTop: '2px' }} /> &nbsp; {officeSetupLabel?.district?.[lang]}
          </Text>
          <Text>
            :&nbsp;
            {loading
              ? officeSetupLabel?.loading?.[lang]
              : (lang === 'en'
                  ? officeSetup?.address?.district?.districtTitle
                  : officeSetup?.address?.district?.districtTitleNepali) ?? officeSetupLabel?.na?.[lang]}
          </Text>
        </Grid>
        <Grid
          templateColumns={{
            lg: 'repeat(6,1fr)',
            md: 'repeat(2,1fr)',
            base: 'repeat(2,1fr)',
          }}
          pb='3'
        >
          <Text display={'flex'}>
            <MdOutlineLocationOn style={{ marginTop: '2px' }} /> &nbsp; {officeSetupLabel?.municipality?.[lang]}
          </Text>
          <Text>
            :&nbsp;
            {loading
              ? officeSetupLabel?.loading?.[lang]
              : (lang === 'en'
                  ? officeSetup?.address?.municipality?.municipalityTitle
                  : officeSetup?.address?.municipality?.municipalityTitleNepali) ?? officeSetupLabel?.na?.[lang]}
          </Text>
        </Grid>
      </GridItem>
      <GridItem
        colSpan={{
          md: 2,
          base: 1,
        }}
      >
        <Button
          variant='outline'
          colorScheme='blue'
          onClick={() => {
            setOpen(true)
          }}
          size='sm'
        >
          <BiEdit /> &nbsp; {officeSetup?.id ? utilLabel?.edit[lang] : utilLabel?.add[lang]}
        </Button>
      </GridItem>
    </Grid>
  )
}

export default ShowOfficeSetup
