import React from "react"
import Img from "gatsby-image"
import { Link } from "gatsby"
import { makeStyles, Typography } from "@material-ui/core"

function NavDesktop(props) {
  const classes = useStyles()
  const { imgLogo } = props
  return (
    <div aria-label="Desktop Navigation" className={classes["container"]}>
      <div className={classes["left-menu"]}>
        <div className={classes["btn-menu-left"]}>
          <Typography component="span">Laptop</Typography>
        </div>
        <div className={classes["btn-menu-left"]}>
          <Typography component="span">Accesories</Typography>
        </div>
      </div>
      <Link to="/">
        <Img
          fadeIn={false}
          imgStyle={{ marginTop: 1 }}
          fixed={imgLogo.childImageSharp.fixed}
          loading="eager"
          alt={imgLogo.name}
          title={imgLogo.name}
        />
      </Link>
      <div className={classes["right-menu"]}>
        <div className={classes["btn-menu-right"]}>
          <Typography component="span">Percetakan</Typography>
        </div>
        <div className={classes["btn-menu-right"]}>
          <Typography component="span">Kontak</Typography>
        </div>
      </div>
    </div>
  )
}

export default NavDesktop

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: 70,
  },
  wrapper: {
    display: "flex",
    width: "40%",
    height: "100%",
  },
  "left-menu": {
    composes: "$wrapper",
    justifyContent: "flex-start",
  },
  "right-menu": {
    composes: "$wrapper",
    justifyContent: "flex-end",
  },
  "btn-menu": {
    margin: "0 10px",
    height: "100%",
    padding: "10px",
    display: "flex",
    cursor: "pointer",
    position: "relative",
    "&::after": {
      content: "''",
      bottom: -1,
      left: 0,
      position: "absolute",
      height: 2.5,
      transform: "scaleX(0)",
      transition: "transform 0.15s ease-in 0s",
      width: "100%",
    },
    "&:hover": {
      "&::after": {
        transform: "scaleX(1)",
      },
    },
    "@global": {
      span: {
        margin: "auto",
        textTransform: "uppercase",
        fontSize: "0.8rem",
        fontWeight: 500,
        letterSpacing: 1.5,
        color: "#000000",
      },
    },
  },
  "btn-menu-left": {
    composes: "$btn-menu",
    "&:hover": {
      "&::after": {
        backgroundColor: "#F08619",
      },
      "@global": {
        span: {
          color: "#F08619",
        },
      },
    },
  },
  "btn-menu-right": {
    composes: "$btn-menu",
    "&:hover": {
      "&::after": {
        backgroundColor: "#008FD5",
      },
      "@global": {
        span: {
          color: "#008FD5",
        },
      },
    },
  },
}))
