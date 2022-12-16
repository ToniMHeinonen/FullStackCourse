import { FlatList } from 'react-native'
import useMe from '../hooks/useMe'
import { RepositoryItemSeparator } from '../styles/repositoryStyles'
import ReviewItem from './ReviewItem'

const MyReviews = () => {
  const { me, fetchMore } = useMe({ includeReviews: true, first: 8 })

  const reviews = me ? me.reviews.edges.map((edge) => edge.node) : []

  const onEndReach = () => {
    fetchMore()
  }

  return (
    <FlatList
      data={reviews}
      keyExtractor={({ id }) => id}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.3}
      ItemSeparatorComponent={RepositoryItemSeparator}
      renderItem={({ item }) => (
        <ReviewItem review={item} title={item.repository.fullName} />
      )}
    />
  )
}

export default MyReviews
