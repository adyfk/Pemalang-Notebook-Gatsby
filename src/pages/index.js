import React from "react"
import Layout from "../layouts"
import makeStyles from "@material-ui/core/styles/makeStyles"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { Typography } from "@material-ui/core"

export default function Home() {
  const classes = useStyles()
  const { imgJumboTron, labelJumboTron } = useStaticQuery(graphql`
    query MyQuery {
      imgJumboTron: dataStatic(name: { eq: "jumbo_tron" }) {
        optimized_data_static {
          childImageSharp {
            fluid(quality: 50) {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
      }
      labelJumboTron: dataStatic(name: { eq: "jumbo_tron_label" }) {
        label
      }
    }
  `)
  return (
    <Layout>
      <section className={classes["jumbo-tron"]}>
        <Img fluid={imgJumboTron.optimized_data_static.childImageSharp.fluid} />
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
    </Layout>
  )
}

export const useStyles = makeStyles(() => ({
  "jumbo-tron": {
    position: "relative",
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
    textShadow: "black 0px 0px 10px",
  },
}))
