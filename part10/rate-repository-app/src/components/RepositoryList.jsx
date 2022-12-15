import { useState } from 'react'
import { FlatList, Pressable, StyleSheet } from 'react-native'
import { useNavigate } from 'react-router-native'
import { Picker } from '@react-native-picker/picker'
import useRepositories from '../hooks/useRepositories'
import { RepositoryItemSeparator } from '../styles/repositoryStyles'
import RepositoryItem from './RepositoryItem'

const SortOrderPicker = ({ value, setValue }) => {
  return (
    <Picker
      style={styles.sortOrderContainer}
      selectedValue={value}
      onValueChange={(itemValue) => setValue(itemValue)}
      prompt="Select an item..."
    >
      <Picker.Item label="Latest repositories" value="latest-repos" />
      <Picker.Item label="Highest rated repositories" value="highest-rated" />
      <Picker.Item label="Lowest rated repositories" value="lowest-rated" />
    </Picker>
  )
}

const styles = StyleSheet.create({
  sortOrderContainer: {
    margin: 10,
  },
})

export const RepositoryListContainer = ({
  repositories,
  onPress,
  sortOrder,
  setSortOrder,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : []

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={RepositoryItemSeparator}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={() => (
        <SortOrderPicker value={sortOrder} setValue={setSortOrder} />
      )}
      renderItem={({ item }) => (
        <Pressable onPress={() => onPress(item.id)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
    />
  )
}

const RepositoryList = () => {
  const [sortOrder, setSortOrder] = useState('latest-repos')
  const { repositories } = useRepositories(sortOrder)
  const navigate = useNavigate()

  const onPress = (id) => {
    navigate(`/${id}`)
  }

  return (
    <RepositoryListContainer
      repositories={repositories}
      onPress={onPress}
      sortOrder={sortOrder}
      setSortOrder={setSortOrder}
    />
  )
}

export default RepositoryList
