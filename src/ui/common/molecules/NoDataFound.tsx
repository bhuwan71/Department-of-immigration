import { Button, Flex, Text } from '@chakra-ui/react'
import { utilLabel } from '@data/localization/common/utils'
import useLang from '@hooks/useLang'
import { VscFileSymlinkFile } from 'react-icons/vsc'
import { useNavigate } from 'react-router-dom'

interface Props {
  data?: string
  showBackBtn?: boolean
}

export default function NoDataFound(props: Props) {
  const { showBackBtn } = props
  const navigate = useNavigate()
  const { lang } = useLang()

  return (
    <Flex justifyContent='center' alignItems='center' flexDirection='column' my={3}>
      <VscFileSymlinkFile size='3rem' color='gray' />
      <Text color='blackAlpha.700' py='3'>
        {utilLabel?.noData[lang]}
      </Text>
      <Text color='blackAlpha.700'>
        {utilLabel?.noData[lang]}, {utilLabel?.pleaseTryAgainLater[lang]}
      </Text>
      {showBackBtn && (
        <Button
          size={'sm'}
          onClick={() => {
            navigate(-1)
          }}
        >
          {utilLabel?.goBack[lang]}
        </Button>
      )}
    </Flex>
  )
}
