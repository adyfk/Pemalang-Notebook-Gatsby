import React from "react"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import Grid from "@material-ui/core/Grid"
import makeStyles from "@material-ui/core/styles/makeStyles"
import { Link } from "gatsby"
import Img from "gatsby-image"

const CardProduct = props => {
  const classes = useStyles(props)
  const image = props.optimized_product[0] || { childImageSharp: {} }
  const to = `/${props.type}/${props.merk.join("/")}/${
    props.productId
  }`.toLowerCase()
  return (
    <Grid container component={Link} to={to}>
      <Grid lg={12} md={12} xs={12} sm={12} item>
        <Box position="relative" borderRadius={50}>
          <div className={classes["chip-top-left"]}>
            {props.available ? "Tersedia" : "Kosong"}
          </div>
          <Img fluid={image.childImageSharp.fluid}></Img>
        </Box>
      </Grid>
      <Grid lg={12} md={12} xs={12} sm={12} item>
        <Grid container alignItems="center">
          <Grid item lg={9} md={9} xs={9} sm={9}>
            <Typography className={classes["top-label"]}>
              {props.color}
            </Typography>
          </Grid>
          <Grid item lg={3} md={3} xs={3} sm={3} align="right">
            <Typography className={classes["top-label"]}>
              {props.color.split(",").length} Color
            </Typography>
          </Grid>
          <Grid item lg={9} md={9} xs={9} sm={9}>
            <Box fontWeight="700" letterSpacing={2}>
              <Typography>{props.title}</Typography>
            </Box>
          </Grid>
          <Grid item lg={3} md={3} xs={3} sm={3} align="right">
            <div className={classes["circle-color"]} />
          </Grid>
          <Grid item>
            <Typography className={classes["real-price"]} component="span">
              Rp {props.price.toLocaleString()}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
const useStyles = makeStyles(() => ({
  "chip-top-left": {
    position: "absolute",
    top: 5,
    left: 5,
    zIndex: 999,
    fontSize: 11,
    padding: "3px 15px",
    fontWeight: 500,
    borderRadius: 3,
    border: "1px solid #CCCCCC",
    color: "#f08400",
    backgroundColor: "white",
  },
  "top-label": {
    fontSize: 11,
    color: "#333333",
    wordWrap: "nowrap",
    textTransform: "uppercase",
  },
  "circle-color": {
    backgroundColor: props => props.color,
    width: 10,
    height: 10,
    borderRadius: "50%",
    border: "1px solid grey",
  },
  "real-price": {
    fontSize: 10,
    color: "red",
    fontWeight: "bold",
  },
}))
export default CardProduct
