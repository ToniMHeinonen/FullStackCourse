import { View } from 'react-native'
import { useNavigate } from 'react-router-native'
import { Formik } from 'formik'
import FormikTextInput from './FormikTextInput'
import TextButton from './TextButton'
import * as yup from 'yup'
import formStyles from '../styles/formStyles'
import useCreateUser from '../hooks/useCreateUser'
import useSignIn from '../hooks/useSignIn'

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: '',
}

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1)
    .max(30, 'Username maximum length is 30 characters')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password length must be at least 5 characters')
    .max(50, 'Password maximum length is 50 characters')
    .required('Password is required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null])
    .required('Password confirmation is required'),
})

const CreateUser = () => {
  const [signIn] = useSignIn()
  const [createUser] = useCreateUser()
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    try {
      await createUser(values)
      await signIn(values)
      navigate('/')
    } catch (e) {
      console.log(e)
    }
  }

  return <CreateUserFormContainer onSubmit={onSubmit} />
}

export const CreateUserFormContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <CreateUserForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

const CreateUserForm = ({ onSubmit }) => {
  return (
    <View style={formStyles.container}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry />
      <FormikTextInput
        name="passwordConfirmation"
        placeholder="Password confirmation"
        secureTextEntry
      />
      <TextButton onPress={onSubmit}>Submit</TextButton>
    </View>
  )
}

export default CreateUser
