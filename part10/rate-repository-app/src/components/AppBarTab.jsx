import { Pressable, StyleSheet } from 'react-native'
import { Link } from 'react-router-native'
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

const AppBarTab = ({ text, route }) => {
  return (
    <Pressable>
      <Link to={route}>
        <Text fontWeight="bold" style={styles.text}>
          {text}
        </Text>
      </Link>
    </Pressable>
  )
}

export default AppBarTab
