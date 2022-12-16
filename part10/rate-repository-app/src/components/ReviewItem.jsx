import { StyleSheet, View } from 'react-native'
import repositoryStyles from '../styles/repositoryStyles'
import Text from './Text'
import { format } from 'date-fns'
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

const ReviewItem = ({ review, title }) => {
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
        <Text fontWeight="bold">{title}</Text>
        <Text color="textSecondary">
          {format(new Date(review.createdAt), 'MM/dd/yyyy')}
        </Text>
        <Text style={styles.reviewText}>{review.text}</Text>
      </View>
    </View>
  )
}

export default ReviewItem
