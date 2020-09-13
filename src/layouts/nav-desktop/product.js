import React from "react"
import makeStyles from "@material-ui/core/styles/makeStyles"
import Fade from "@material-ui/core/Fade"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import Grid from "@material-ui/core/Grid"
import myNav from "../../../static/my-nav.json"
import { Link } from "gatsby"
import clsx from "clsx"

function Product(props) {
  const classes = useStyles()
  return (
    <Fade in={props.open}>
      <div
        tabIndex="0"
        role="button"
        {...props}
        className={clsx(classes["container"], props.open || classes["hide"])}
      >
        <div className={classes["box-container"]}>
          <Grid container spacing={4}>
            {Object.keys(myNav).map((type, index, { length }) => {
              const to = params => params.toLowerCase()
              const latestBox = length - index === 1
              return (
                <Grid
                  className={clsx(latestBox || classes["border-right-box"])}
                  key={type}
                  item
                  lg={2}
                  md={2}
                  sm={12}
                  xs={12}
                >
                  <Link to={to(`/${type}`)}>
                    <Box mb={2} className={classes["text-parent"]}>
                      <Typography variant="h6">{type}</Typography>
                    </Box>
                  </Link>
                  {myNav[type].map(i => {
                    return (
                      <div key={i}>
                        <Link to={`/${to(type)}?query=${i}`}>
                          <Box pb={1} className={classes["text-child"]}>
                            <Typography component="span">{i}</Typography>
                          </Box>
                        </Link>
                      </div>
                    )
                  })}
                </Grid>
              )
            })}
          </Grid>
        </div>
      </div>
    </Fade>
  )
}

Product.defaultProps = {
  open: false,
}

const useStyles = makeStyles(theme => ({
  container: {
    position: "fixed",
    top: 74,
    left: 0,
    zIndex: 9999,
    width: "100vw",
    backgroundColor: "white",
    boxShadow: "0px 1px 15px 0px rgba(0,0,0,0.1)",
    [theme.breakpoints.up("md")]: {
      padding: 20,
    },
  },
  "box-container": {
    [theme.breakpoints.up("md")]: {
      padding: "20px 100px 50px 100px",
    },
    [theme.breakpoints.down("md")]: {
      padding: 20,
    },
  },
  "text-parent": {
    isolate: true,
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.orange.main,
    },
  },
  "text-child": {
    isolate: true,
    cursor: "pointer",
    display: "inline-block",
    position: "relative",
    "&:hover": {
      color: theme.palette.blue.main,
      "&::after": {
        transform: "scaleX(1)",
        backgroundColor: theme.palette.blue.main,
      },
    },
    "&::after": {
      content: "''",
      bottom: 2,
      left: 0,
      position: "absolute",
      height: 1,
      transform: "scaleX(0)",
      transition: "transform 0.20s ease-in 0s",
      width: "100%",
    },
  },
  "border-right-box": {
    [theme.breakpoints.up("md")]: {
      borderRight: "1px solid rgba(0,0,0,0.2)",
      marginRight: 50,
    },
  },
  hide: {
    top: -1000,
  },
}))

export default Product
