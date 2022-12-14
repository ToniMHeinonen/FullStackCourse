import { FlatList, View, StyleSheet, Pressable } from 'react-native'
import { useNavigate } from 'react-router-native'
import useRepositories from '../hooks/useRepositories'
import RepositoryItem from './RepositoryItem'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
})

const ItemSeparator = () => <View style={styles.separator} />

export const RepositoryListContainer = ({ repositories, onPress }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : []

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Pressable onPress={() => onPress(item.id)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
    />
  )
}

const RepositoryList = () => {
  const { repositories } = useRepositories()
  const navigate = useNavigate()

  const onPress = (id) => {
    navigate(`/${id}`)
  }

  return (
    <RepositoryListContainer repositories={repositories} onPress={onPress} />
  )
}

export default RepositoryList
