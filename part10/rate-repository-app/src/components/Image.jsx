import { Image as NativeImage, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  logo: {
    width: 64,
    height: 64,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
})

const Image = ({ uri, size, style, ...props }) => {
  const imageStyle = [
    styles.logo,
    size === 'tinyLogo' && styles.tinyLogo,
    style,
  ]

  return <NativeImage source={{ uri: uri }} style={imageStyle} {...props} />
}

export default Image
