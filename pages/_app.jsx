import * as React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import Head from 'next/head';
import Fonts from '../components/Fonts';

const theme = extendTheme({
  fonts: {
    heading: 'Raleway',
    body: 'Raleway',
  },
});

const App = ({ Component, pageProps }) => (
  <ChakraProvider theme={theme}>
    <Fonts />
    <Head>
      <title>Multistream.gg</title>
      <link rel="icon" href="/favicon.ico" />
      <meta name="description" content="Find and watch multiple Twitch streams on the same screen." />

      <meta property="og:url" content="https://multistream.gg/" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Multistream" />
      <meta property="og:description" content="Find and watch multiple Twitch streams on the same screen." />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="multistream.gg" />
      <meta property="twitter:url" content="https://multistream.gg/" />
      <meta name="twitter:title" content="Multistream" />
      <meta name="twitter:description" content="Find and watch multiple Twitch streams on the same screen." />
    </Head>
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
