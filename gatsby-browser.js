const React = require("react")
const { createMuiTheme, ThemeProvider } = require("@material-ui/core")

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
exports.wrapRootElement = ({ element }) => {
  return <ThemeProvider theme={theme}>{element}</ThemeProvider>
}
