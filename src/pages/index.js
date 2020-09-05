import React from "react"
import Layout from "../layouts"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import makeStyles from "@material-ui/core/styles/makeStyles"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import ListCardProduct from "../components/list-card-product"

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
      <section className={classes["body-content"]}>
        <Box pt={4}>
          <Typography align="center" variant="h6" fontWeight="bold">
            Latest Product
          </Typography>
        </Box>
        <Box py={4}>
          <ListCardProduct data={allProduct}></ListCardProduct>
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
      opacity: 0.7,
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
    borderBottom: "1px solid " + theme.palette.orange.light,
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
    allProduct(limit: 3, sort: { order: ASC, fields: key }) {
      nodes {
        key
        color
        available
        price
        tag
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
