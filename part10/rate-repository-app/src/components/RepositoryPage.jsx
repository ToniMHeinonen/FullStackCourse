import RepositoryItem from './RepositoryItem'
import { useParams } from 'react-router-native'
import useRepository from '../hooks/useRepository'
import { FlatList, StyleSheet, View } from 'react-native'
import { format } from 'date-fns'
import Text from './Text'
import repositoryStyles, {
  RepositoryItemSeparator,
} from '../styles/repositoryStyles'
import theme from '../theme'

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
    // Make text wrap by setting shrink
    flexShrink: 1,
  },
  ratingContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    justifyContent: 'center',
    marginRight: 15,
  },
  rating: {
    textAlign: 'center',
  },
  reviewText: {
    color: 'black',
    marginTop: 5,
  },
})

const RepositoryInfo = ({ repository }) => {
  return (
    <View>
      <RepositoryItem item={repository} showButton />
      <RepositoryItemSeparator />
    </View>
  )
}

const ReviewItem = ({ review }) => {
  return (
    <View style={[repositoryStyles.container, styles.row]}>
      <View style={styles.ratingContainer}>
        <Text
          color="primary"
          fontSize="subheading"
          fontWeight="bold"
          style={styles.rating}
        >
          {review.rating}
        </Text>
      </View>
      <View style={styles.column}>
        <Text fontWeight="bold">{review.user.username}</Text>
        <Text color="textSecondary">
          {format(new Date(review.createdAt), 'MM/dd/yyyy')}
        </Text>
        <Text style={styles.reviewText}>{review.text}</Text>
      </View>
    </View>
  )
}

const RepositoryPage = () => {
  const { id } = useParams()
  const { repository } = useRepository(id)

  if (!repository) return null

  const reviews = repository
    ? repository.reviews.edges.map((edge) => edge.node)
    : []

  return (
    <FlatList
      data={reviews}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={RepositoryItemSeparator}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      renderItem={({ item }) => <ReviewItem review={item} />}
    />
  )
}

export default RepositoryPage
