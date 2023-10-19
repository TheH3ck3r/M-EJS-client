import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import "animate.css";
import { App } from "components/App/App";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Mirea EJS</title>
        <meta name="description" content="Mirea EJS" />
        <link rel="icon" href="/icons/favicon.svg" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icons/favicon-16x16.png"
        />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#ff5e00" />
        <meta name="background" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#222"></meta>
        <meta name="android:navigationBarColor" content="222"></meta>
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="white"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content="#222222"
        />
      </Head>

      <App>
        <Component {...pageProps} />
      </App>
    </>
  );
}

export default MyApp;
