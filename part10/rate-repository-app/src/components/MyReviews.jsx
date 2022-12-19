import { FlatList, Alert } from 'react-native'
import { useNavigate } from 'react-router-native'
import useDeleteReview from '../hooks/useDeleteReview'

import useMe from '../hooks/useMe'
import { RepositoryItemSeparator } from '../styles/repositoryStyles'
import ReviewItem from './ReviewItem'

const MyReviews = () => {
  const { me, fetchMore, refetch } = useMe({ includeReviews: true, first: 8 })
  const [deleteReview] = useDeleteReview()
  const navigate = useNavigate()

  const reviews = me ? me.reviews.edges.map((edge) => edge.node) : []

  const onEndReach = () => {
    fetchMore()
  }

  const onViewRepository = (id) => {
    navigate(`/${id}`)
  }

  const onDeleteReview = async (title, id) => {
    Alert.alert(
      'Delete Review',
      `Are you sure you want to delete review for ${title}?`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            await deleteReview({ id })
            await refetch()
          },
        },
      ]
    )
  }

  return (
    <FlatList
      data={reviews}
      keyExtractor={({ id }) => id}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.3}
      ItemSeparatorComponent={RepositoryItemSeparator}
      renderItem={({ item }) => (
        <ReviewItem
          review={item}
          title={item.repository.fullName}
          onViewRepository={onViewRepository}
          onDeleteReview={onDeleteReview}
        />
      )}
    />
  )
}

export default MyReviews
