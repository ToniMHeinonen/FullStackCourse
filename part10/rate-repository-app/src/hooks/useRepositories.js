import { useQuery } from '@apollo/client'
import { GET_REPOSITORIES } from '../graphql/queries'

const useRepositories = (sortOrder) => {
  let orderBy, orderDirection
  switch (sortOrder) {
    case 'latest-repos':
      orderBy = 'CREATED_AT'
      orderDirection = 'DESC'
      break
    case 'highest-rated':
      orderBy = 'RATING_AVERAGE'
      orderDirection = 'DESC'
      break
    case 'lowest-rated':
      orderBy = 'RATING_AVERAGE'
      orderDirection = 'ASC'
      break
    default:
      throw Error(`Unimplemented sort order: ${sortOrder}`)
  }

  const { data, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: { orderBy, orderDirection },
  })

  if (loading) return { repositories: { edges: [] }, loading }

  const repositories = data.repositories

  return { repositories, loading }
}

export default useRepositories
