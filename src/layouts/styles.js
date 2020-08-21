import makeStyles from "@material-ui/core/styles/makeStyles"

export const useStyles = makeStyles(theme => ({
  nav: {
    [theme.breakpoints.down("lg")]: {
      paddingLeft: 22,
      paddingRight: 22,
    },
    [theme.breakpoints.up("lg")]: {
      paddingLeft: 30,
      paddingRight: 30,
    },
    boxShadow: "0px 1px 100px 0px rgba(0,0,0,0.1)",
    position: "sticky",
    width: "100%",
  },
}))
