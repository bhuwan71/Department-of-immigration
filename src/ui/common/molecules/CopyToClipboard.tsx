import React, { useRef, useState } from 'react'
import { Colors } from '@utils/Colors'
import { Box, Text } from '@chakra-ui/react'
import { utilLabel } from '@data/localization/common/utils'
import useLang from '@hooks/useLang'
import { MdOutlineContentCopy } from 'react-icons/md'

interface CopyToClipboardProps {
  text: string
}

const CopyToClipboard: React.FC<CopyToClipboardProps> = ({ text }) => {
  const textRef = useRef<HTMLTextAreaElement>(null)
  const { lang } = useLang()
  const [copy, setCopy] = useState<boolean>(false)
  const handleCopyClick = () => {
    if (textRef.current) {
      textRef.current.select()
      document.execCommand('copy')
      window.getSelection()?.removeAllRanges()
      setCopy(true)

      const timer: ReturnType<typeof setTimeout> = setTimeout(() => {
        setCopy(false)
      }, 1000)
      return () => {
        clearTimeout(timer)
      }
    }
  }

  return (
    <Box pl='1' mt='-2'>
      <button onClick={handleCopyClick}>
        {copy ? (
          <Text fontSize={'11px'} color={'gray'}>
            {utilLabel?.copied?.[lang]}
          </Text>
        ) : (
          <MdOutlineContentCopy size={'12px'} title='copy' style={{ color: Colors.primaryColor, cursor: 'pointer' }} />
        )}
      </button>
      {/* This hidden textarea allows us to copy the text to the clipboard */}
      <textarea ref={textRef} readOnly style={{ position: 'absolute', top: '-9999px' }} value={text} />
    </Box>
  )
}

export default CopyToClipboard
