const React = require("react")
const { createMuiTheme, ThemeProvider } = require("@material-ui/core")

const theme = createMuiTheme({})
exports.wrapRootElement = ({ element }) => {
  return <ThemeProvider theme={theme}>{element}</ThemeProvider>
}
