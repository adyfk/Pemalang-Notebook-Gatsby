import React from "react"
import Layout from "../layouts"
import makeStyles from "@material-ui/core/styles/makeStyles"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import { Typography, Grid, Container, Box } from "@material-ui/core"
import loadable from "@loadable/component"

const AsyncComponent = loadable(
  props => import(`../components/${props.page}`),
  {
    cacheKey: props => props.page,
  }
)

export default function Home(props) {
  const classes = useStyles()
  const { imgJumboTron, labelJumboTron, allProduct } = props.data

  return (
    <Layout {...props} top={true}>
      <section className={classes["jumbo-tron"]} id="jumbo-tron">
        <Img
          className={classes["jumbo-tron-image"]}
          fluid={imgJumboTron.optimized_data_static.childImageSharp.fluid}
        />
        <div className={classes["jumbo-tron-container-label"]}>
          {labelJumboTron.label.split(",").map(text => {
            return (
              <Typography key={text} className={classes["jumbo-tron-label"]}>
                {text}
              </Typography>
            )
          })}
        </div>
      </section>
      <section id="body-content">
        <Box pt={4}>
          <Typography align="center" variant="h5" fontWeight="bold">
            Produk Terbaru
          </Typography>
        </Box>
        <Box py={4}>
          <Container>
            <Grid container className={classes["body-content"]} spacing={5}>
              {allProduct.nodes.map(product => (
                <React.Suspense fallback={<div />}>
                  <Grid lg={3} md={3} sm={6} xs={6} key={product.id} item>
                    <AsyncComponent
                      page="card-product"
                      productId={product.key}
                      {...product}
                    ></AsyncComponent>
                  </Grid>
                </React.Suspense>
              ))}
            </Grid>
          </Container>
        </Box>
      </section>
    </Layout>
  )
}

export const useStyles = makeStyles(theme => ({
  "jumbo-tron": {
    position: "relative",
  },
  "jumbo-tron-image": {
    "&::after": {
      content: "''",
      position: "absolute",
      top: 0,
      backgroundColor: "black",
      opacity: 0.5,
      width: "100%",
      height: "100%",
    },
  },
  "jumbo-tron-container-label": {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  },
  "jumbo-tron-label": {
    fontSize: 35,
    fontWeight: 700,
    letterSpacing: 1,
    color: "#FFFFFF",
    textAlign: "center",
    textTransform: "uppercase",
  },
  "body-content": {
    [theme.breakpoints.up("md")]: {
      paddingLeft: 30,
      paddingRight: 30,
    },
  },
}))

export const query = graphql`
  query MyQuery {
    imgJumboTron: dataStatic(name: { eq: "jumbo_tron" }) {
      optimized_data_static {
        childImageSharp {
          fluid(quality: 40) {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
    }
    labelJumboTron: dataStatic(name: { eq: "jumbo_tron_label" }) {
      label
    }
    allProduct(limit: 4, sort: { order: DESC, fields: key }) {
      nodes {
        key
        color
        available
        price
        merk
        title
        status
        type
        id
        spec
        optimized_product {
          childImageSharp {
            fluid(quality: 40) {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
      }
    }
  }
`
