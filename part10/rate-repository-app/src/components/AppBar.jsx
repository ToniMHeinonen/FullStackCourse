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

  let conditionalElements = null

  if (!loading) {
    conditionalElements = data.me ? (
      <>
        <AppBarTab text="Create a review" route="/create-review" />
        <AppBarTab text="Sign out" onPress={signOut} />
      </>
    ) : (
      <AppBarTab text="Sign in" route="/login" />
    )
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab text="Repositories" route="/" />
        {conditionalElements}
      </ScrollView>
    </View>
  )
}

export default AppBar
