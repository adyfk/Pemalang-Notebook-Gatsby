import React from "react"
import makeStyles from "@material-ui/core/styles/makeStyles"
import Fade from "@material-ui/core/Fade"

function Product(props) {
  const classes = useStyles()
  return (
    <Fade in={true}>
      <div
        tabindex="0"
        role="button"
        aria-expanded="true"
        {...props}
        className={classes["container"]}
      >
        Woi
      </div>
    </Fade>
  )
}

const useStyles = makeStyles({
  container: {
    position: "fixed",
    top: 77,
    padding: 20,
    left: 0,
    zIndex: 999,
    width: "100vw",
    backgroundColor: "white",
  },
})

export default Product
