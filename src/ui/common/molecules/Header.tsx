import { Button, Flex, Text } from '@chakra-ui/react'
import { type ReactNode } from 'react'

interface IProps {
  buttonText?: string
  buttonIcon?: ReactNode
  setOpen?: (data: boolean) => void
  header: string
  previousLocation?: string
}

const Header = (props: IProps) => {
  const { buttonText, setOpen, header, buttonIcon } = props
  return (
    <Flex
      sx={{
        direction: {
          md: 'row',
          base: 'column',
        },
        gap: '1rem',
      }}
      justifyContent='space-between'
      borderBottom='1px solid #e8e6e6'
      alignItems={{
        md: 'center',
        base: 'flex-start',
      }}
      pb='2'
      mb='4'
    >
      <Text
        sx={{
          fontSize: '16px',
          fontWeight: '500',
        }}
      >
        {header}
      </Text>
      {buttonText && setOpen && (
        <Button
          onClick={() => {
            setOpen(true)
          }}
          size='sm'
          variant='primary'
        >
          {buttonText} &nbsp; {buttonIcon}
        </Button>
      )}
    </Flex>
  )
}

export default Header
