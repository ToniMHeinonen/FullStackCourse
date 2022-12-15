import { View } from 'react-native'
import { useNavigate } from 'react-router-native'
import { Formik } from 'formik'
import FormikTextInput from './FormikTextInput'
import TextButton from './TextButton'
import * as yup from 'yup'
import useCreateReview from '../hooks/useCreateReview'
import formStyles from '../styles/formStyles'

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
}

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Username is required'),
  repositoryName: yup.string().required('Password is required'),
  rating: yup
    .number()
    .min(0, 'Minimum rating is 0')
    .max(100, 'Maximum rating is 100')
    .required('Rating is required'),
})

const CreateReview = () => {
  const [createReview] = useCreateReview()
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    try {
      const { data } = await createReview(values)
      navigate(`/${data.createReview.repositoryId}`)
    } catch (e) {
      console.log(e)
    }
  }

  return <CreateReviewContainer onSubmit={onSubmit} />
}

export const CreateReviewContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

const CreateReviewForm = ({ onSubmit }) => {
  return (
    <View style={formStyles.container}>
      <FormikTextInput name="ownerName" placeholder="Repository owner name" />
      <FormikTextInput name="repositoryName" placeholder="Repository name" />
      <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
      <FormikTextInput name="text" placeholder="Review" multiline />
      <TextButton onPress={onSubmit}>Create a review</TextButton>
    </View>
  )
}

export default CreateReview
