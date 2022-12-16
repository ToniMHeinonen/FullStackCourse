import RepositoryItem from './RepositoryItem'
import { useParams } from 'react-router-native'
import useRepository from '../hooks/useRepository'
import { FlatList, View } from 'react-native'

import { RepositoryItemSeparator } from '../styles/repositoryStyles'
import ReviewItem from './ReviewItem'

const RepositoryInfo = ({ repository }) => {
  return (
    <View>
      <RepositoryItem item={repository} showButton />
      <RepositoryItemSeparator />
    </View>
  )
}

const RepositoryPage = () => {
  const { id } = useParams()
  const { repository, fetchMore } = useRepository({ id, first: 8 })

  if (!repository) return null

  const reviews = repository
    ? repository.reviews.edges.map((edge) => edge.node)
    : []

  const onEndReach = () => {
    fetchMore()
  }

  return (
    <FlatList
      data={reviews}
      keyExtractor={({ id }) => id}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.2}
      ItemSeparatorComponent={RepositoryItemSeparator}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      renderItem={({ item }) => (
        <ReviewItem review={item} title={item.user.username} />
      )}
    />
  )
}

export default RepositoryPage
