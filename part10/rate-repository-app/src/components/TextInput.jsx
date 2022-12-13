import { TextInput as NativeTextInput, StyleSheet } from 'react-native'
import theme from '../theme'

const styles = StyleSheet.create({
  textInput: {
    margin: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: theme.colors.borderLightColor,
    borderRadius: theme.borders.radiusImage,
  },
  error: {
    borderColor: theme.colors.error,
  },
})

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [styles.textInput, style, error && styles.error]

  return <NativeTextInput style={textInputStyle} {...props} />
}

export default TextInput
