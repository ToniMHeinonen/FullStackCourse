import { Pressable, StyleSheet, TextInput, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import theme from '../theme'

const styles = StyleSheet.create({
  container: {
    margin: 15,
    padding: 10,
    backgroundColor: theme.colors.mainColor,
    borderRadius: theme.borders.radiusImage,
    flexDirection: 'row',
    flexShrink: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    alignItems: 'center',
  },
  textInput: {
    marginHorizontal: 10,
    flex: 1,
  },
  closeButton: {
    width: 24,
    textAlign: 'center',
  },
})

const SearchBar = ({ searchInput, setSearchInput }) => {
  const handleClose = () => {
    setSearchInput('')
  }

  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color={theme.colors.textSecondary} />
      <TextInput
        style={styles.textInput}
        placeholder="Search repositories"
        value={searchInput}
        onChangeText={setSearchInput}
      />
      {searchInput && (
        <Pressable onPress={handleClose}>
          {({ pressed }) => (
            <Ionicons
              style={styles.closeButton}
              name="close"
              size={pressed ? 18 : 24}
              color={theme.colors.textSecondary}
            />
          )}
        </Pressable>
      )}
    </View>
  )
}

export default SearchBar
