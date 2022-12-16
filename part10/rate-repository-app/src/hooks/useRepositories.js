import { useQuery } from '@apollo/client'
import { GET_REPOSITORIES } from '../graphql/queries'

const useRepositories = ({ sortOrder, searchKeyword, first }) => {
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

  const variables = { orderBy, orderDirection, searchKeyword, first }

  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables,
  })

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage

    if (!canFetchMore) {
      return
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    })
  }

  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  }
}

export default useRepositories
