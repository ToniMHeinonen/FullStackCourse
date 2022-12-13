import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { APOLLO_URI } from './constants'

const httpLink = createHttpLink({
  uri: `${APOLLO_URI}/graphql`,
})

const createApolloClient = () => {
  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  })
}

export default createApolloClient
