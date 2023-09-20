import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  initialColorMode: 'light',
  useSystemColorMode: false,
  components: {
    Button: {
      baseStyle: {},
    },
  },
  colors: {
    brand: {
      dark: '#252A33',
      red: '#F1616182',
      yellow: '#FFD166',
      green: '#06D6A0',
      white: '#FCFCFC',
    },
  },
  fonts: {
    heading: `'Calistoga', sans-serif`,
    body: `'Inter', sans-serif`,
  },
});

export default theme;
