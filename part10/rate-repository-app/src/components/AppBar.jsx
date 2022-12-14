import { View, StyleSheet, ScrollView } from 'react-native'
import Constants from 'expo-constants'
import theme from '../theme'
import AppBarTab from './AppBarTab'
import { ME } from '../graphql/queries'
import { useQuery } from '@apollo/client'
import useSignOut from '../hooks/useSignOut'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    flexDirection: 'row',
  },
})

const AppBar = () => {
  const { data, loading } = useQuery(ME, {
    fetchPolicy: 'cache-and-network',
  })
  const signOut = useSignOut()

  let signElement = null

  if (!loading) {
    signElement = data.me ? (
      <AppBarTab text="Sign out" onClick={signOut} />
    ) : (
      <AppBarTab text="Sign in" route="/login" />
    )
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab text="Repositories" route="/" />
        {signElement}
      </ScrollView>
    </View>
  )
}

export default AppBar
