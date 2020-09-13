import React from "react"
import { graphql } from "gatsby"
import makeStyles from "@material-ui/core/styles/makeStyles"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import Layout from "../layouts"
import Img from "gatsby-image"
import ListCardProduct from "../components/list-card-product"
import LeftSideProductContainer from "./components/left-side-product-container"

const filterProduct = (data, params) => {
  const values = {}
  values["nodes"] = data.filter(product => {
    let bool = true
    if (params.filterColor) bool = product.color.includes(params.filterColor)
    if (params.filter && bool) {
      bool = product.tag.some(i => {
        return params.filter.includes(i)
      })
    }
    if (params.filterScreenSize && bool) {
      switch (params.filter) {
        case "1": {
          bool = product.inch <= 13
          break
        }
        case "2": {
          bool = product.inch <= 16
          break
        }
        default: {
          bool = product.inch > 16
          break
        }
      }
    }
    return bool
  })
  return values
}

const ProductContainer = props => {
  const [filter, setFilter] = React.useState("")
  const [filterColor, setFilterColor] = React.useState("")
  const [filterScreenSize, setFilterScreenSize] = React.useState("")
  const classes = useStyles()
  const {
    data: { typeProduct, allProduct },
    pageContext: { myGroupProduct, myColor, type },
  } = props

  const productMap = filterProduct(allProduct.nodes, {
    filter,
    filterColor,
    filterScreenSize,
    myGroupProduct,
    myColor,
  })

  const init = () => {
    setFilter(props.location?.search?.replace("?query=", "") || "")
  }
  React.useEffect(init, [])

  React.useEffect(() => {
    setFilterColor("")
    setFilterScreenSize("")
  }, [filter])

  return (
    <Layout title={`Category ${type}`} {...props}>
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
              <LeftSideProductContainer
                filter={filter}
                filterColor={filterColor}
                filterScreenSize={filterScreenSize}
                setFilter={setFilter}
                setFilterColor={setFilterColor}
                setFilterScreenSize={value =>
                  setFilterScreenSize(value === filterScreenSize ? "" : value)
                }
                {...props}
              />
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
