import { View, StyleSheet } from 'react-native'
import * as Linking from 'expo-linking'
import theme from '../theme'
import { convertToThousands } from '../utils'
import Image from './Image'
import Subheading from './Subheading'
import Text from './Text'
import TextButton from './TextButton'

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: 'white',
    padding: 10,
  },
  topRow: {
    flexDirection: 'row',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  topColumn: {
    flexDirection: 'column',
    marginLeft: 20,
    // Make text wrap by setting shrink
    flexShrink: 1,
    marginBottom: 10,
  },
  logo: {
    borderRadius: theme.borders.radiusImage,
  },
  description: {
    paddingVertical: 5,
  },
  language: {
    color: 'white',
    backgroundColor: theme.colors.primary,
    padding: 5,
    alignSelf: 'flex-start',
    borderRadius: theme.borders.radiusImage,
    marginVertical: 5,
  },
  statistic: {
    flexDirection: 'column',
  },
  statisticParam: {
    alignSelf: 'center',
  },
  openButton: {
    marginTop: 15,
  },
})

const Statistic = ({ name, value }) => {
  return (
    <View style={styles.statistic}>
      <Subheading style={styles.statisticParam}>{value}</Subheading>
      <Text color="textSecondary" style={styles.statisticParam}>
        {name}
      </Text>
    </View>
  )
}

const RepositoryItem = ({ item, showButton }) => {
  const stars = convertToThousands(item.stargazersCount)
  const forks = convertToThousands(item.forksCount)
  const reviews = convertToThousands(item.reviewCount)

  const openRepository = () => {
    Linking.openURL(item.url)
  }

  return (
    <View testID="repositoryItem" style={styles.container}>
      <View style={styles.topRow}>
        <Image size="tinyLogo" uri={item.ownerAvatarUrl} style={styles.logo} />
        <View style={styles.topColumn}>
          <Subheading>{item.fullName}</Subheading>
          <Text color="textSecondary" style={styles.description}>
            {item.description}
          </Text>
          <Text fontSize="subheading" style={styles.language}>
            {item.language}
          </Text>
        </View>
      </View>
      <View style={styles.bottomRow}>
        <Statistic name="Stars" value={stars} />
        <Statistic name="Forks" value={forks} />
        <Statistic name="Reviews" value={reviews} />
        <Statistic name="Rating" value={item.ratingAverage} />
      </View>
      {showButton && (
        <TextButton onPress={openRepository} style={styles.openButton}>
          Open in GitHub
        </TextButton>
      )}
    </View>
  )
}

export default RepositoryItem
