import { Html, Head, Main, NextScript } from "next/document"
import { ColorModeScript } from "@chakra-ui/react"
import { theme } from "styles/theme"

export default function Document() {
  return (
    <Html>
      <Head lang="pt-br">
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fira+Sans:wght@300;400;500;600;700&display=swap"
        />
      </Head>

      <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
