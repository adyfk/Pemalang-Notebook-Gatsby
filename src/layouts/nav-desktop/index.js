import React, { useState } from "react"
import clsx from "clsx"
import Img from "gatsby-image"
import { Link } from "gatsby"
import { makeStyles } from "@material-ui/core/styles"
import { Typography, IconButton, Grid, InputBase } from "@material-ui/core"
import Search from "@material-ui/icons/Search"
import Clear from "@material-ui/icons/Clear"

function NavDesktop(props) {
  const [show, setShow] = useState("")
  const [search, setSearch] = useState("")
  const classes = useStyles({ status: props.status })
  const { imgLogo } = props
  return (
    <header>
      <nav className={classes.nav}>
        <div aria-label="Desktop Navigation" className={classes["container"]}>
          <div className={classes["left-menu"]}>
            <div className={classes["btn-menu"]}>
              <Typography className={classes["label"]} component="span">
                Laptop
              </Typography>
            </div>
            <div className={classes["btn-menu"]}>
              <Typography className={classes["label"]} component="span">
                Accesories
              </Typography>
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
            <div className={classes["btn-menu"]}>
              <Typography className={classes["label"]} component="span">
                Percetakan
              </Typography>
            </div>
            <Link to="/contact">
              <div className={classes["btn-menu"]}>
                <Typography className={classes["label"]} component="span">
                  Kontak
                </Typography>
              </div>
            </Link>
            <div className={classes["btn-icon"]}>
              <IconButton onClick={() => setShow("search")}>
                <Search fill="#ffffff" />
              </IconButton>
            </div>
          </div>
        </div>
      </nav>
      <div
        className={clsx(
          classes["search-box"],
          show !== "search" && classes["d-hide"]
        )}
      >
        <Grid spacing={2} container alignItems="center">
          <Grid item>
            <Search />
          </Grid>
          <Grid item lg md xs sm>
            <InputBase
              fullWidth
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Cari ..."
            />
          </Grid>
          <Grid item>
            <IconButton onClick={() => setShow("")}>
              <Clear />
            </IconButton>
          </Grid>
        </Grid>
      </div>
    </header>
  )
}

export default NavDesktop

const useStyles = makeStyles(theme => ({
  "@global": {
    "a:-webkit-any-link": {
      color: "-webkit-link",
      cursor: "pointer",
      textDecoration: "none",
    },
  },
  label: props => ({
    color: props.status ? "grey" : "white",
    textDecoration: ["none", "!important"],
  }),
  nav: {
    [theme.breakpoints.down("lg")]: {
      paddingLeft: 22,
      paddingRight: 22,
    },
    [theme.breakpoints.up("lg")]: {
      paddingLeft: 30,
      paddingRight: 30,
    },
    boxShadow: props =>
      props.status ? "0px 1px 15px 0px rgba(0,0,0,0.1)" : "none",
    position: "fixed",
    backgroundColor: props => (props.status ? "white" : "transparent"),
    top: 0,
    left: 0,
    zIndex: 99999,
    width: "100%",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: 75,
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
      height: 1,
      transform: "scaleX(0)",
      transition: "transform 0.15s ease-in 0s",
      width: "100%",
    },
    "&:hover": {
      "&::after": {
        transform: "scaleX(1)",
        backgroundColor: props => (props.status ? "grey" : "white"),
      },
    },
    "@global": {
      span: {
        margin: "auto",
        textTransform: "uppercase",
        fontSize: "0.8rem",
        fontWeight: 500,
        letterSpacing: 1.5,
      },
    },
  },
  "btn-icon": {
    margin: "auto 0",
    "@global": {
      svg: {
        fill: props => (props.status ? "grey" : "white"),
      },
    },
  },
  "search-box": {
    position: "fixed",
    top: 75,
    width: "100%",
    zIndex: 9999,
    backgroundColor: "rgba(255,255,255,0.8)",
    padding: "10px 20px",
  },
  "d-hide": {
    display: "none",
  },
  "d-block": {
    display: "block",
  },
}))
