import React from "react"
import "./src/styles/global.css"
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles"

const theme = createMuiTheme({
  palette: {
    orange: {
      light: "#ffb443",
      main: "#f08400",
      dark: "#b75600",
    },
    blue: {
      light: "#5dbdff",
      main: "#008dce",
      dark: "#00609d",
    },
    white: {
      light: "#ffffff",
      main: "#cccccc",
      dark: "#9b9b9b",
    },
  },
})
export const wrapRootElement = ({ element }) => {
  return <ThemeProvider theme={theme}>{element}</ThemeProvider>
}
