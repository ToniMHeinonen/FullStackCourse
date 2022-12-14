import { StyleSheet, View } from 'react-native'
import { Route, Routes, Navigate } from 'react-router-native'

import theme from '../theme'
import AppBar from './AppBar'
import CreateReview from './CreateReview'
import CreateUser from './CreateUser'
import MyReviews from './MyReviews'
import RepositoryList from './RepositoryList'
import RepositoryPage from './RepositoryPage'
import SignIn from './SignIn'

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.appBackground,
  },
})

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="/login" element={<SignIn />} exact />
        <Route path="/sign-up" element={<CreateUser />} exact />
        <Route path="/:id" element={<RepositoryPage />} exact />
        <Route path="/create-review" element={<CreateReview />} exact />
        <Route path="/my-reviews" element={<MyReviews />} exact />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  )
}

export default Main
