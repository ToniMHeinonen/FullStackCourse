import { Pressable, StyleSheet } from 'react-native'
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

const AppBarTab = ({ text }) => {
  return (
    <Pressable>
      <Text fontWeight="bold" style={styles.text}>
        {text}
      </Text>
    </Pressable>
  )
}

export default AppBarTab
