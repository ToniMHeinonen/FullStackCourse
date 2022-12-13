import { StyleSheet, View } from 'react-native'
import { Formik } from 'formik'
import FormikTextInput from './FormikTextInput'
import theme from '../theme'
import TextButton from './TextButton'

const initialValues = {
  username: '',
  password: '',
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainColor,
    padding: 10,
  },
})

const onSubmit = (values) => {
  console.log(values)
}

const SignIn = () => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
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
