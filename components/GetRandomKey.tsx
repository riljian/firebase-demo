import { getFunctions, httpsCallable } from '@firebase/functions'
import { VpnKey } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useFormikContext } from 'formik'
import { useCallback } from 'react'

const GetRandomKey = () => {
  const { setFieldValue } = useFormikContext()
  const handleClick = useCallback(() => {
    const functions = getFunctions()
    const getRandomKey = httpsCallable<{ key_prefix: string }, { key: string }>(
      functions,
      'getRandomKey'
    )
    getRandomKey({ key_prefix: 'key_prefix' })
      .then((response) => {
        setFieldValue('message', response.data.key)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [setFieldValue])
  return (
    <IconButton onClick={handleClick}>
      <VpnKey />
    </IconButton>
  )
}

export default GetRandomKey
