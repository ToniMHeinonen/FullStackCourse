import { StyleSheet, View } from 'react-native'
import { Formik } from 'formik'
import FormikTextInput from './FormikTextInput'
import theme from '../theme'
import TextButton from './TextButton'
import * as yup from 'yup'
import useSignIn from '../hooks/useSignIn'

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

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainColor,
    padding: 10,
  },
})

const SignIn = () => {
  const [signIn] = useSignIn()

  const onSubmit = async (values) => {
    const { username, password } = values

    try {
      const { data } = await signIn({ username, password })
      console.log(data)
    } catch (e) {
      console.log(e)
    }
  }

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
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry />
      <TextButton onPress={onSubmit}>Submit</TextButton>
    </View>
  )
}

export default SignIn
