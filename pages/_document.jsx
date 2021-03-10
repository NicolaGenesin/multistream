import * as React from 'react';
import Document, {
  Html, Head, Main, NextScript,
} from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <title>Multistream.ggz</title>
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
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
