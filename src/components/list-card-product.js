import React from "react"
import makeStyles from "@material-ui/core/styles/makeStyles"
import Grid from "@material-ui/core/Grid"
import Container from "@material-ui/core/Container"
import CardProduct from "./card-product"

function ListCardProduct(props) {
  const classes = useStyles()
  return (
    <Container>
      <Grid container className={classes["body-content"]} spacing={5}>
        {props.data.nodes.map(product => (
          <Grid lg={4} md={4} sm={6} xs={6} key={product.id} item>
            <CardProduct productId={product.key} {...product}></CardProduct>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

const useStyles = makeStyles(theme => ({
  "body-content": {
    [theme.breakpoints.up("md")]: {
      paddingLeft: 30,
      paddingRight: 30,
    },
  },
}))

export default ListCardProduct
