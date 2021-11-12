import { FileUpload } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { ChangeEvent, FC, useMemo, useRef } from 'react'

type Props = {
  sendFile: (file: File) => Promise<void>
}

const SendFile: FC<Props> = ({ sendFile }) => {
  const inputRef = useRef(null)
  const { handleClick, handleChange } = useMemo(
    () => ({
      handleClick: () => {
        const input = inputRef.current as HTMLInputElement | null
        if (input) {
          input.click()
        }
      },
      handleChange: (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files as FileList
        sendFile(files[0]).catch((error) => {
          console.error(error)
        })
      },
    }),
    [sendFile]
  )
  return (
    <>
      <IconButton onClick={handleClick}>
        <FileUpload />
      </IconButton>
      <input
        type="file"
        accept=".png"
        hidden
        ref={inputRef}
        onChange={handleChange}
      />
    </>
  )
}

export default SendFile
