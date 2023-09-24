import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  initialColorMode: 'light',
  useSystemColorMode: false,
  components: {
    Button: {
      baseStyle: {
        fontStyle: 'normal',
      },
      // 1. We can update the base styles
      variants: {
        styled: {
          appearance: 'none',
          borderRadius: '40em',
          borderStyle: 'none',
          boxSizing: 'border-box',
          fontFamily: '-apple-system, sans-serif',
          fontSize: '1.2rem',
          fontWeight: '700',
          letterSpacing: '-.24px',
          margin: 0,
          outline: 'none',
          padding: '1.3rem 1.6rem',
          textAlign: 'center',
          textDecoration: 'none',
          transition: 'all .15s',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          touchAction: 'manipulation',
          bgColor: '#FFFFFF',
          color: '#000000',
          cursor: 'pointer',
          boxShadow: '0 -12px 6px #ADCFFF inset',

          _hover: {
            bgColor: '#FFC229',
            boxShadow: '0 -6px 8px #FF6314 inset',
            transform: 'scale(1.125)',
          },
          _active: {
            transform: 'scale(1.025)',
          },
          _mediaQueries: {
            '(min-width: 768px)': {
              fontSize: '1.5rem',
              padding: '.75rem 2rem',
            },
          },
        },

        'styled-color': {
          appearance: 'none',
          borderRadius: '40em',
          borderStyle: 'none',
          boxSizing: 'border-box',
          fontFamily: '-apple-system, sans-serif',
          fontSize: '1.2rem',
          fontWeight: '500',
          letterSpacing: '-.24px',
          margin: 0,
          outline: 'none',
          padding: '1.3rem 1.6rem',
          textAlign: 'center',
          textDecoration: 'none',
          transition: 'all .15s',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          touchAction: 'manipulation',
          bgColor: '#eb5050',
          color: 'white',
          cursor: 'pointer',
          boxShadow: '0 -12px 6px #d63e3e inset',

          _hover: {
            bgColor: '#FFC229',
            boxShadow: '0 -6px 8px #FF6314 inset',
            transform: 'scale(1.125)',
          },
          _active: {
            transform: 'scale(1.025)',
          },
          _mediaQueries: {
            '(min-width: 768px)': {
              fontSize: '1.5rem',
              padding: '.75rem 2rem',
            },
          },
        },
      },
    },
  },
  styles: {
    global: {
      body: {
        color: '200D08',
      },
    },
  },
  colors: {
    brand: {
      dark: '#200D08',
      orange: '#F96317',
      orange80: '#FF7833',
      yellow: '#FFC229',
      green: '#06D6A0',
      white: '#FCFCFC',
    },
  },
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },
});

export default theme;
