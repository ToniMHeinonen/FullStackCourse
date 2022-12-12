import { StyleSheet, Text } from 'react-native'

import theme from '../theme'

const styles = StyleSheet.create({
  subheading: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.subheading,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.bold,
  },
})

const Subheading = ({ style, ...props }) => {
  const textStyle = [styles.subheading, style]

  return <Text style={textStyle} {...props} />
}

export default Subheading
