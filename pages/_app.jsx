import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Head from 'next/head';

const App = ({ Component, pageProps }) => (
  <ChakraProvider>
    <Head />
    <Component {...pageProps} />
    <style global jsx>
      {`
        html, body {
          background: '#000'
        };
      }
      `}
    </style>
  </ChakraProvider>
);

export default App;
