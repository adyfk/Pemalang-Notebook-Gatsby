import React from "react"
// import clsx from "clsx"
import { graphql, Link } from "gatsby"
import makeStyles from "@material-ui/core/styles/makeStyles"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import Divider from "@material-ui/core/Divider"
import Grid from "@material-ui/core/Grid"
import Box from "@material-ui/core/Box"
import Layout from "../layouts"
import Img from "gatsby-image"
import ListCardProduct from "../components/list-card-product"
import CircleColor from "../components/circle-color"
import clsx from "clsx"

const filterProduct = (data, params) => {
  const values = {}
  values["nodes"] = data.filter(product => {
    let bool = true
    if (params.filterColor)
      bool = bool && product.color.includes(params.filterColor)
    if (params.filter)
      bool =
        bool &&
        product.tag.some(i => {
          return params.filter.includes(i)
        })
    return bool
  })
  return values
}

const ProductContainer = props => {
  const [filter, setFilter] = React.useState("")
  const [filterColor, setFilterColor] = React.useState("")
  const classes = useStyles()
  const {
    data: { typeProduct, allProduct },
    pageContext: { myNav, myGroupProduct, type, myColor },
  } = props

  const productMap = filterProduct(allProduct.nodes, {
    filter,
    filterColor,
    myGroupProduct,
    myColor,
  })

  React.useEffect(() => {
    setFilterColor("")
  }, [filter])

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
            <Grid item lg={3} md={3} xs={12} sm={12}>
              <Box pb={5}>
                <Box color="white.dark" mb={1}>
                  <Typography variant="subtitle2">Category</Typography>
                </Box>
                <Divider />
                <Box mt={1} pl={1}>
                  {Object.keys(myNav).map(text => {
                    return (
                      <Typography
                        key={text + "label"}
                        component={Link}
                        variant="subtitle2"
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
                <Box mb={1} color="white.dark">
                  <Typography variant="subtitle2">Filter By</Typography>
                </Box>
                <Divider />
                {/* ======================== */}
                <Box pt={3} pl={1}>
                  <Box mb={1} color="primary.light">
                    <Typography variant="body2">{type}</Typography>
                  </Box>

                  <Box mt={1} pl={1}>
                    {myNav[type].map(text => {
                      return (
                        <React.Fragment key={text + "filter"}>
                          <Typography
                            onClick={() => setFilter(text)}
                            variant="subtitle2"
                            className={clsx(
                              classes["label-product"],
                              filter === text && classes["label-product-active"]
                            )}
                          >
                            {text}
                          </Typography>
                          {!!myGroupProduct[text] && myGroupProduct[text]?.[0] && (
                            <Box pl={1}>
                              {myGroupProduct[text]?.map(sub => {
                                return (
                                  <React.Fragment key={text + sub}>
                                    <Typography
                                      onClick={() => setFilter(sub)}
                                      variant="subtitle2"
                                      className={clsx(
                                        classes["label-product"],
                                        filter === sub &&
                                          classes["label-product-active"]
                                      )}
                                    >
                                      - {sub}
                                    </Typography>
                                    {!!myGroupProduct[text + sub] && (
                                      <Box pl={1}>
                                        {myGroupProduct[text + sub]?.map(
                                          sub2 => {
                                            return (
                                              <Typography
                                                onClick={() => setFilter(sub2)}
                                                key={text + sub + sub2}
                                                variant="subtitle2"
                                                className={clsx(
                                                  classes["label-product"],
                                                  filter === sub2 &&
                                                    classes[
                                                      "label-product-active"
                                                    ]
                                                )}
                                              >
                                                - {sub2}
                                              </Typography>
                                            )
                                          }
                                        )}
                                      </Box>
                                    )}
                                  </React.Fragment>
                                )
                              })}
                            </Box>
                          )}
                        </React.Fragment>
                      )
                    })}
                  </Box>
                  <Divider />
                  <Box mt={2}>
                    <Box mb={1} color="primary.light">
                      <Typography variant="body2">Color</Typography>
                    </Box>
                    <Box py={1} pl={1}>
                      <Grid container spacing={1}>
                        {myColor.map(text => {
                          return (
                            <Grid item key={text + "color-product"}>
                              <Box
                                onClick={() =>
                                  setFilterColor(
                                    filterColor === text ? "" : text
                                  )
                                }
                                className={clsx(
                                  classes["color-box"],
                                  filterColor === text &&
                                    classes["color-box-active"]
                                )}
                              >
                                <CircleColor
                                  color={text}
                                  width={30}
                                  height={30}
                                ></CircleColor>
                              </Box>
                            </Grid>
                          )
                        })}
                      </Grid>
                    </Box>
                    <Divider />
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item lg={9} md={9} xs={12} sm={12} container>
              <ListCardProduct disabledContainer={true} data={productMap} />
            </Grid>
          </Grid>
        </Container>
      </section>
    </Layout>
  )
}

const useStyles = makeStyles(theme => ({
  "color-box": {
    cursor: "pointer",
    padding: 1,
    border: "1px solid white",
    borderRadius: "50%",
    "&:hover": {
      border: "1px solid" + theme.palette.orange.light,
    },
  },
  "color-box-active": {
    border: "1px solid " + theme.palette.orange.main,
  },
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
      color: [theme.palette.orange.light, "!important"],
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
    allProduct(filter: { type: { eq: $type } }) {
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

export default ProductContainer
