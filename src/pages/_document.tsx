import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <meta content="Generated by create next app" name="description" />
       
          <link href="/favicon.ico" rel="icon" type="image/x-icon" />
        
          <link
            as="font"
            href="/fonts/Inter-roman.var.woff2"
            rel="preload"
            type="font/woff2"
          />
          <link
            as="font"
            href="/fonts/Inter-italic.var.woff2"
            type="font/woff2"
          />
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
