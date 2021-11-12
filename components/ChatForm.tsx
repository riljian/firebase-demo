import { Button, Stack, TextField } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { FC, useCallback } from 'react'
import GetRandomKey from './GetRandomKey'
import SendFile from './SendFile'

type Props = {
  leaveMessage: (message: string) => Promise<void>
  sendFile: (file: File) => Promise<void>
}

const initialValues = { message: '' }

const ChatForm: FC<Props> = ({ leaveMessage, sendFile }) => {
  const onFormikSubmit = useCallback(
    ({ message }, { resetForm }) => {
      leaveMessage(message)
        .then(() => {
          resetForm()
        })
        .catch((error) => {
          console.error(error)
        })
    },
    [leaveMessage]
  )
  return (
    <Formik initialValues={initialValues} onSubmit={onFormikSubmit}>
      <Form>
        <Stack direction="row" spacing={2}>
          <SendFile sendFile={sendFile} />
          <GetRandomKey />
          <Field
            name="message"
            as={TextField}
            fullWidth
            label="Message"
            required
          />
          <Button type="submit">Send</Button>
        </Stack>
      </Form>
    </Formik>
  )
}

export default ChatForm
