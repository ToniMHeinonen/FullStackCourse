import { Platform } from 'react-native'

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    textInverse: '#DDD',
    primary: '#0366d6',
    primaryLight: '#2685f0',
    appBarBackground: '#24292e',
    appBackground: '#e1e4e8',
    mainColor: 'white',
    borderLightColor: '#999',
    delete: '#d73a4a',
    deleteLight: '#f74a6a',
    error: '#d73a4a',
  },
  fontSizes: {
    body: 14,
    subheading: 16,
    appBarTab: 16,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System',
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
  borders: {
    radiusImage: 5,
  },
}

export default theme
