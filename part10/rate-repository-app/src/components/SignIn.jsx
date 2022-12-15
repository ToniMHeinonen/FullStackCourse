import { View } from 'react-native'
import { useNavigate } from 'react-router-native'
import { Formik } from 'formik'
import FormikTextInput from './FormikTextInput'
import TextButton from './TextButton'
import * as yup from 'yup'
import useSignIn from '../hooks/useSignIn'
import formStyles from '../styles/formStyles'

const initialValues = {
  username: '',
  password: '',
}

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(4, 'Username length must be at least 4 characters')
    .required('Username is required'),
  password: yup
    .string()
    .min(6, 'Password length must be at least 6 characters')
    .required('Password is required'),
})

const SignIn = () => {
  const [signIn] = useSignIn()
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    const { username, password } = values

    try {
      await signIn({ username, password })
      navigate('/')
    } catch (e) {
      console.log(e)
    }
  }

  return <SignInFormContainer onSubmit={onSubmit} />
}

export const SignInFormContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={formStyles.container}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry />
      <TextButton onPress={onSubmit}>Submit</TextButton>
    </View>
  )
}

export default SignIn
