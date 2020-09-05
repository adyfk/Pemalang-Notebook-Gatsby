import React from "react"
// import clsx from "clsx"
import { graphql, Link } from "gatsby"
import makeStyles from "@material-ui/core/styles/makeStyles"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import Box from "@material-ui/core/Box"
import Layout from "../layouts"
import Img from "gatsby-image"
import myNav from "../../static/my-nav.json"

const ProductContainer = props => {
  const classes = useStyles()
  const typeProduct = props.data.typeProduct
  return (
    <Layout {...props}>
      {typeProduct.optimized_type_product && (
        <article>
          <section className={classes["jumbo-tron"]} id="jumbo-tron">
            <Img
              fluid={typeProduct.optimized_type_product.childImageSharp.fluid}
            />
            <div className={classes["label-jumbo-tron"]}>
              <Typography variant="h4" component="span">
                {typeProduct.title}
              </Typography>
            </div>
          </section>
        </article>
      )}
      <section className={classes["body-content"]} id="body-content">
        <Container>
          <Grid container spacing={3}>
            <Grid item lg={3}>
              <Box pb={5}>
                <Typography variant="caption">Category Product</Typography>
                <Box mt={1}>
                  {Object.keys(myNav).map(text => {
                    return (
                      <Typography
                        key={text + "label"}
                        component={Link}
                        variant="body1"
                        activeClassName={classes["label-product-active"]}
                        to={`/${text}`.toLowerCase()}
                        className={classes["label-product"]}
                      >
                        {text}
                      </Typography>
                    )
                  })}
                </Box>
              </Box>
              <Box>
                <Typography variant="caption">Filter by</Typography>
                <Box mt={1}>
                  {Object.keys(myNav).map(text => {
                    return (
                      <Typography
                        key={text}
                        component={Link}
                        variant="body1"
                        activeClassName={classes["label-product-active"]}
                        to={`/${text}`.toLowerCase()}
                        className={classes["label-product"]}
                      >
                        {text}
                      </Typography>
                    )
                  })}
                </Box>
              </Box>
            </Grid>
            <Grid item lg={9}>
              Y
            </Grid>
          </Grid>
        </Container>
      </section>
    </Layout>
  )
}

const useStyles = makeStyles(theme => ({
  "jumbo-tron": {
    position: "relative",
  },
  "label-jumbo-tron": {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    "& span": {
      color: theme.palette.white.light,
    },
  },
  "body-content": {
    padding: "40px 0px",
    [theme.breakpoints.up("md")]: {
      paddingLeft: 30,
      paddingRight: 30,
    },
    borderBottom: "1px solid " + theme.palette.orange.light,
  },
  "label-product": {
    display: "block",
    textDecoration: "none",
    margin: "8px 0px",
    cursor: "pointer",
    color: ["black", "!important"],
    "&:hover": {
      extend: "label-product-active",
    },
  },
  "label-product-active": {
    color: [theme.palette.orange.main, "!important"],
  },
}))

export const query = graphql`
  query getTypeProduct($type: String) {
    typeProduct(type: { eq: $type }) {
      type
      title
      optimized_type_product {
        childImageSharp {
          fluid(quality: 10) {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
    }
  }
`

export default ProductContainer
