import { Button, Stack, TextField } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { FC, useCallback } from 'react'

type Props = {
  leaveMessage: (message: string) => Promise<void>
}

const initialValues = { message: '' }

const ChatForm: FC<Props> = ({ leaveMessage }) => {
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
