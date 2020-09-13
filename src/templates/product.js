import React from "react"
import clsx from "clsx"
import { graphql } from "gatsby"
import SwipeableViews from "react-swipeable-views"
import Layout from "../layouts"
import Grid from "@material-ui/core/Grid"
import Container from "@material-ui/core/Container"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import makeStyles from "@material-ui/core/styles/makeStyles"
import CircleCheckedIcon from "@material-ui/icons/CheckCircle"
import CancelIcon from "@material-ui/icons/Cancel"
import Img from "gatsby-image"
import withTheme from "@material-ui/core/styles/withTheme"
import Tooltip from "@material-ui/core/Tooltip"
import ListCardProduct from "../components/list-card-product"

const ProductTemplate = ({ data, ...props }) => {
  const [idx_image, setIdxImage] = React.useState(0)
  const classes = useStyles(props)
  const product = data.product
  const images = product.optimized_product
  const metaDescription = product.desc + product.spec.join(", ")
  const metaKeywords = product.tag.join(", ") + product.keyword
  return (
    <Layout
      title={product.title}
      description={metaDescription}
      keywords={metaKeywords}
      {...props}
    >
      <article className={classes["container"]}>
        <Container>
          <Grid container spacing={6}>
            <Grid item lg={6} md={6} xs={12} sm={12}>
              <Grid container>
                <Grid
                  container
                  style={{ position: "relative" }}
                  spacing={1}
                  item
                  lg
                  md
                  xs
                  sm
                >
                  <Grid item className={classes["container-tab-image"]}>
                    {images.map((image, idx) => (
                      <Box
                        className={clsx(
                          classes["image-tab"],
                          idx_image === idx && classes["image-tab-active"]
                        )}
                        onClick={() => setIdxImage(idx)}
                        key={idx}
                      >
                        <Img fluid={image.childImageSharp.fluid} />
                      </Box>
                    ))}
                  </Grid>
                  <Grid item lg md sm xs>
                    <Box position="relative">
                      <SwipeableViews
                        resistance
                        enableMouseEvents
                        index={idx_image}
                        onChangeIndex={i => setIdxImage(i)}
                      >
                        {images.map((image, idx) => (
                          <Img key={idx} fluid={image.childImageSharp.fluid} />
                        ))}
                      </SwipeableViews>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item lg={5} md={5} xs={12} sm={12}>
              <Grid container spacing={2}>
                <Grid item lg md sm xs>
                  <Box fontWeight={500}>
                    <Typography variant="subtitle1" component="h2">
                      {product.title}
                      <Tooltip
                        title={`Product ${
                          product.available ? "Tersedia" : "Kosong"
                        }`}
                      >
                        <Box pl={1} position="absolute" component="span">
                          {product.available ? (
                            <CircleCheckedIcon
                              style={{ color: "green", fontSize: 13 }}
                            ></CircleCheckedIcon>
                          ) : (
                            <CancelIcon
                              style={{ color: "red", fontSize: 13 }}
                            ></CancelIcon>
                          )}
                        </Box>
                      </Tooltip>
                    </Typography>
                  </Box>
                </Grid>
                <Grid item>
                  <Typography
                    className={classes["real-price"]}
                    component="span"
                    variant="subtitle1"
                  >
                    Rp {product.price.toLocaleString()}
                  </Typography>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Typography variant="body2" component="span">
                    <Box fontWeight={300}>
                      {product.desc || "Tidak ada Deskripsi"}
                    </Box>
                  </Typography>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  {product.tag.map((txt, idx) => (
                    <Typography
                      component="span"
                      className={classes["chip-tag"]}
                      key={idx}
                    >
                      {txt.toUpperCase()}
                    </Typography>
                  ))}
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Typography variant="caption" component="span">
                    <Box color="blue.dark" fontWeight={500} mb={1}>
                      {"Spesifikasi"}
                    </Box>
                  </Typography>
                  <Typography variant="caption" component="span">
                    <ul>
                      {product.spec.map((txt, idx) => (
                        <li key={idx}>{txt}</li>
                      ))}
                    </ul>
                  </Typography>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Typography variant="caption" component="span">
                    <Box color="blue.dark" fontWeight={500} mb={1}>
                      {"Kondisi"}
                    </Box>
                  </Typography>
                  <Typography variant="caption" component="span">
                    <ul>
                      {product.cond.map((txt, idx) => (
                        <li key={idx}>{txt}</li>
                      ))}
                    </ul>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </article>
      <section id="body-content" className={classes["body-content"]}>
        <Box pt={4}>
          <Typography align="center" variant="h6" fontWeight="bold">
            Related Product
          </Typography>
        </Box>
        <Box py={4}>
          <ListCardProduct data={data.productRelated}></ListCardProduct>
        </Box>
      </section>
    </Layout>
  )
}

const useStyles = makeStyles(theme => ({
  "@global": {
    ul: {
      "& li": {
        marginLeft: -10,
      },
    },
  },
  "container-tab-image": {
    margin: "auto",
    [theme.breakpoints.down("md")]: {
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: 999,
    },
  },
  container: {
    [theme.breakpoints.up("md")]: {
      paddingLeft: 22,
      paddingRight: 22,
      paddingTop: 40,
      paddingBottom: 40,
    },
    [theme.breakpoints.up("lg")]: {
      paddingLeft: 70,
      paddingRight: 70,
    },
  },
  "image-tab": {
    border: "none",
    cursor: "pointer",
    width: 50,
    padding: "7px 3px",
    borderRadius: 3,
    marginBottom: 10,
    // borderColor: theme.palette.orange.dark,
    // transition: "border-color 250ms ease-in 0s",
  },
  "image-tab-active": {
    border: `1px solid ${theme.palette.orange.light}`,
  },
  "real-price": {
    fontSize: 14,
    color: "red",
    fontWeight: "bold",
  },
  "chip-tag": {
    padding: "1px 10px",
    marginRight: 10,
    backgroundColor: theme.palette.orange.main,
    borderRadius: 5,
    color: "white",
    fontSize: 13,
  },
  "body-content": {
    [theme.breakpoints.up("md")]: {
      paddingLeft: 30,
      paddingRight: 30,
    },
    borderTop: "1px solid " + theme.palette.orange.light,
    borderBottom: "1px solid " + theme.palette.orange.light,
  },
}))

export const query = graphql`
  query getProduct($productId: String, $tag: String) {
    product(id: { eq: $productId }) {
      available
      color
      cond
      desc
      id
      key
      tag
      price
      spec
      status
      title
      type
      keyword
      optimized_product {
        childImageSharp {
          fluid(quality: 100) {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      }
    }
    productRelated: allProduct(
      limit: 3
      sort: { order: DESC, fields: key }
      filter: { tag: { eq: $tag }, id: { ne: $productId } }
    ) {
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

export default withTheme(ProductTemplate)
