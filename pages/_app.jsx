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
      <title>
        Multistream.gg - Watch multiple Twitch streams on your screen!
      </title>
      <link rel="icon" href="/favicon.ico" />
      <meta
        name="description"
        content="Watch multiple Twitch streams on your screen! 🙌"
      />

      {/* <!-- Google / Search Engine Tags --> */}
      <meta itemProp="name" content="Multistream.gg 🎮" />
      <meta
        itemProp="description"
        content="Watch multiple Twitch streams on your screen! 🙌"
      />
      <meta itemProp="image" content="http://multistream.gg/assets/og-01.jpg" />

      {/* <!-- Facebook Meta Tags --> */}
      <meta property="og:url" content="https://multistream.gg/" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Multistream.gg 🎮" />
      <meta
        property="og:description"
        content="Watch multiple Twitch streams on your screen! 🙌"
      />
      <meta name="og:image" content="https://multistream.gg/assets/og-01.jpg" />

      {/* <!-- Twitter Meta Tags --> */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="Multistream.gg" />
      <meta property="twitter:url" content="https://multistream.gg/" />
      <meta name="twitter:title" content="Multistream.gg 🎮" />
      <meta
        name="twitter:description"
        content="Watch multiple Twitch streams on your screen! 🙌"
      />
      <meta
        name="twitter:image"
        content="https://multistream.gg/assets/og-01.jpg"
      />
    </Head>
    <Component {...pageProps} />
  </ChakraProvider>
);

export default App;
