import { useQuery } from '@apollo/client'
import { GET_REPOSITORIES } from '../graphql/queries'

const useRepositories = () => {
  const { data, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  })

  if (loading) return { repositories: { edges: [] }, loading }

  const repositories = data.repositories

  return { repositories, loading }
}

export default useRepositories
