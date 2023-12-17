import { Input, InputGroup, InputLeftElement, Textarea } from '@chakra-ui/react'
import { nepaliUnicodes } from '@config/constant/unicode'
import React, { type ReactNode } from 'react'

interface IProps {
  handleChange: any
  variant?: string
  error?: boolean
  multiline?: boolean
  placeholder: string
  rows?: number
  value?: string
  readOnly?: boolean
  icon?: ReactNode
  height?: string
}
const NepaliInput: React.FC<IProps> = (props) => {
  const handleChange = (val: string) => {
    props.handleChange(
      Array.from(val, (c: string) => {
        if (nepaliUnicodes?.[c]) {
          return nepaliUnicodes[c]
        }
        return c
      }).join('')
    )
  }
  return (
    <>
      {props.multiline ? (
        <Textarea
          rows={props.rows ?? 3}
          value={props.value ?? ''}
          isInvalid={props.error}
          height={props.height ?? '15vh'}
          placeholder={props.placeholder}
          onChange={(e) => {
            handleChange(e.target.value)
          }}
          borderRadius={'sm'}
        />
      ) : (
        <InputGroup size={'sm'}>
          {props?.icon && <InputLeftElement pointerEvents='none'>{props?.icon}</InputLeftElement>}

          <Input
            variant={props.variant}
            type={'text'}
            size={'sm'}
            placeholder={props.placeholder}
            value={props.value ?? ''}
            isInvalid={props.error}
            onChange={(e) => {
              handleChange(e.target.value)
            }}
            readOnly={props.readOnly ?? false}
          />
        </InputGroup>
      )}
    </>
  )
}
NepaliInput.defaultProps = {
  multiline: false,
  error: false,
  value: '',
}
export default NepaliInput
