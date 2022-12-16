import React, { useState } from 'react'
import { FlatList, Pressable, StyleSheet } from 'react-native'
import { useNavigate } from 'react-router-native'
import { useDebounce } from 'use-debounce'

import { Picker } from '@react-native-picker/picker'
import useRepositories from '../hooks/useRepositories'
import { RepositoryItemSeparator } from '../styles/repositoryStyles'
import RepositoryItem from './RepositoryItem'
import SearchBar from './SearchBar'

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
    margin: 15,
    marginTop: 0,
  },
})

const RepositoryListHeader = ({
  sortOrder,
  setSortOrder,
  searchInput = { searchInput },
  setSearchInput = { setSearchInput },
}) => {
  return (
    <>
      <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} />
      <SortOrderPicker value={sortOrder} setValue={setSortOrder} />
    </>
  )
}

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    // this.props contains the component's props
    const { sortOrder, setSortOrder, searchInput, setSearchInput } = this.props

    return (
      <RepositoryListHeader
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />
    )
  }

  render() {
    const { repositories, onPress } = this.props
    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : []

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={RepositoryItemSeparator}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="always"
        ListHeaderComponent={this.renderHeader}
        renderItem={({ item }) => (
          <Pressable onPress={() => onPress(item.id)}>
            <RepositoryItem item={item} />
          </Pressable>
        )}
      />
    )
  }
}

const RepositoryList = () => {
  const [searchInput, setSearchInput] = useState('')
  const [searchKeyword] = useDebounce(searchInput, 500)
  const [sortOrder, setSortOrder] = useState('latest-repos')
  const { repositories } = useRepositories(sortOrder, searchKeyword)
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
      searchInput={searchInput}
      setSearchInput={setSearchInput}
    />
  )
}

export default RepositoryList
