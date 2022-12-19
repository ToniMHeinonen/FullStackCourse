import { StyleSheet, View } from 'react-native'

import repositoryStyles from '../styles/repositoryStyles'
import Text from './Text'
import { format } from 'date-fns'
import theme from '../theme'
import TextButton from './TextButton'

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
  controlButtonsContainer: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-around',
  },
  controlButton: {
    flex: 1,
  },
})

const ReviewControlButtons = ({ onViewPress, onDeletePress }) => (
  <View style={styles.controlButtonsContainer}>
    <TextButton onPress={onViewPress} style={styles.controlButton}>
      View repository
    </TextButton>
    <TextButton
      onPress={onDeletePress}
      color="delete"
      style={styles.controlButton}
    >
      Delete review
    </TextButton>
  </View>
)

const ReviewItem = ({ review, title, onViewRepository, onDeleteReview }) => {
  return (
    <View style={repositoryStyles.container}>
      <View style={styles.row}>
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
          <Text fontWeight="bold">{title}</Text>
          <Text color="textSecondary">
            {format(new Date(review.createdAt), 'MM/dd/yyyy')}
          </Text>
          <Text style={styles.reviewText}>{review.text}</Text>
        </View>
      </View>
      {onViewRepository && onDeleteReview && (
        <ReviewControlButtons
          onViewPress={() => onViewRepository(review.repositoryId)}
          onDeletePress={() => onDeleteReview(title, review.id)}
        />
      )}
    </View>
  )
}

export default ReviewItem
