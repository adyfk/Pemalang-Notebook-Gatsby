import React from "react"
import CssBaseline from "@material-ui/core/CssBaseline"
import clsx from "clsx"
import { graphql, useStaticQuery } from "gatsby"
import NavDesktop from "./nav-desktop"
import withTheme from "@material-ui/core/styles/withTheme"
import makeStyles from "@material-ui/core/styles/makeStyles"
import useScroll from "@hoooks/use-scroll"
import loadable from "@loadable/component"
import Hidden from "@material-ui/core/Hidden"
import "./styles.css"
import Seo from "../components/seo"

const Footer = loadable(() => import(`./footer`))

function Layout(props) {
  const classes = useStyles()
  const { y } = useScroll()
  const { imgLogo, imgLogoWithLabel } = useStaticQuery(graphql`
    query getLogo {
      imgLogo: file(name: { eq: "logo-pemalang-notebook" }) {
        name
        childImageSharp {
          fixed(width: 200, quality: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      imgLogoWithLabel: file(
        name: { eq: "logo-pemalang-notebook-with-label" }
      ) {
        name
        childImageSharp {
          fixed(width: 300, quality: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  const status = props.location.pathname === "/" ? y > 200 : true

  return (
    <div className={clsx(props.top || classes["space-top"])}>
      <Seo
        title={props.title}
        description={props.description}
        keywords={props.keywords}
      ></Seo>
      <CssBaseline />
      <Hidden xsDown>
        <NavDesktop status={status} imgLogo={imgLogo} />
      </Hidden>
      {props.children}
      <Footer imgLogoWithLabel={imgLogoWithLabel} />
    </div>
  )
}
Layout.defaultProps = {
  top: false,
}

const useStyles = makeStyles(() => ({
  "@global": {
    body: {
      backgroundColor: "white",
    },
  },
  "space-top": {
    marginTop: 75,
  },
}))
export default withTheme(Layout)
