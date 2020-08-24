const React = require("react")
const { createMuiTheme, ThemeProvider } = require("@material-ui/core")

const theme = createMuiTheme({
  palette: {
    white: {
      main: "white",
    },
  },
})
exports.wrapRootElement = ({ element }) => {
  return <ThemeProvider theme={theme}>{element}</ThemeProvider>
}
