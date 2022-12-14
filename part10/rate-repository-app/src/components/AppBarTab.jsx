import { Pressable, StyleSheet } from 'react-native'
import { useNavigate } from 'react-router-native'
import theme from '../theme'
import Text from './Text'

const styles = StyleSheet.create({
  text: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    color: theme.colors.textInverse,
    fontSize: theme.fontSizes.appBarTab,
  },
})

const AppBarTab = ({ text, route, onPress }) => {
  const navigate = useNavigate()

  const handlePress = () => {
    if (onPress) onPress()
    if (route) navigate(route)
  }

  return (
    <Pressable onPress={handlePress}>
      <Text fontWeight="bold" style={styles.text}>
        {text}
      </Text>
    </Pressable>
  )
}

export default AppBarTab
