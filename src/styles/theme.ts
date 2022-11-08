import { extendTheme } from "@chakra-ui/react"

const colors = {
  primary: {
    light: "red.500",
    default: "red.600",
    dark: "red.700",
  },
  secundary: {
    light: "cyan.500",
    default: "cyan.600",
    dark: "cyan.700",
  },
  background: {
    light: "blackAlpha.700",
    default: "blackAlpha.800",
    dark: "blackAlpha.900",
  },
  font: {
    light: "gray.50",
    default: "gray.100",
    dark: "gray.200",
  },
}

export const theme = extendTheme({
  config: {
    initialColorMode: "dark",
  },
  styles: {
    global: {
      body: {
        bg: colors.background.default,
        color: colors.font.default,
      },
    },
  },
  fonts: {
    body: "\"Fira Sans\", sans-serif",
    heading: "\"Fira Sans\", sans-serif",
  },
  colors,
})
