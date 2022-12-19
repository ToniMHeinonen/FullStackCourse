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
  buttonPrimary: {
    backgroundColor: theme.colors.primary,
  },
  buttonPrimaryPressed: {
    backgroundColor: theme.colors.primaryLight,
  },
  buttonDelete: {
    backgroundColor: theme.colors.delete,
  },
  buttonDeletePressed: {
    backgroundColor: theme.colors.deleteLight,
  },
  text: {
    color: 'white',
    alignSelf: 'center',
    paddingVertical: 5,
  },
})

const TextButton = ({ onPress, color, textStyle, style, ...props }) => {
  let buttonStyle = styles.buttonPrimary
  let buttonPressedStyle = styles.buttonPrimaryPressed

  if (color === 'delete') {
    buttonStyle = styles.buttonDelete
    buttonPressedStyle = styles.buttonDeletePressed
  }

  const buttonStyles = ({ pressed }) => [
    styles.button,
    buttonStyle,
    pressed && buttonPressedStyle,
    style,
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
