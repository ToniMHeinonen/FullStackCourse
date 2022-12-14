import { useApolloClient, useMutation } from '@apollo/client'
import { AUTHENTICATE } from '../graphql/mutations'
import useAuthStorage from './useAuthStorage'

const useSignIn = () => {
  const authStorage = useAuthStorage()
  const apolloClient = useApolloClient()
  const [mutate, result] = useMutation(AUTHENTICATE)

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({ variables: { username, password } })
    await authStorage.setAccessToken(data.authenticate.accessToken)
    apolloClient.resetStore()
    return data
  }

  return [signIn, result]
}

export default useSignIn
