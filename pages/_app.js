import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import theme from "common/theme";
import { AuthProvider } from "common/auth";
import { getTitle } from "common/utils";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Head>
        <title>{getTitle("NextFireMaterial")}</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps}></Component>
      </ThemeProvider>
    </AuthProvider>
  );
}
