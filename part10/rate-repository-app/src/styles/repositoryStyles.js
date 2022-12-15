import { StyleSheet, View } from 'react-native'

const repositoryStyles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: 'white',
    padding: 10,
  },
  separator: {
    height: 10,
  },
})

export const RepositoryItemSeparator = () => (
  <View style={repositoryStyles.separator} />
)

export default repositoryStyles
