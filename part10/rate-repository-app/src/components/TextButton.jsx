import { Pressable, StyleSheet } from 'react-native'
import theme from '../theme'
import Text from './Text'

const styles = StyleSheet.create({
  button: {
    margin: 5,
    padding: 10,
    borderRadius: theme.borders.radiusImage,
    backgroundColor: theme.colors.primary,
  },
  buttonPressed: {
    backgroundColor: theme.colors.primaryLight,
  },
  text: {
    color: 'white',
    alignSelf: 'center',
    paddingVertical: 5,
  },
})

const TextButton = ({ onPress, buttonStyle, textStyle, ...props }) => {
  const buttonStyles = ({ pressed }) => [
    styles.button,
    pressed && styles.buttonPressed,
    buttonStyle,
  ]
  const textStyles = [styles.text, textStyle]

  return (
    <Pressable onPress={onPress} style={buttonStyles} {...props}>
      <Text fontSize="subheading" fontWeight="bold" style={textStyles}>
        {props.children}
      </Text>
    </Pressable>
  )
}

export default TextButton
