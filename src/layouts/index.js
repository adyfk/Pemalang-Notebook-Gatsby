import React from "react"
import CssBaseline from "@material-ui/core/CssBaseline"
import clsx from "clsx"
import { graphql, useStaticQuery } from "gatsby"
import NavDesktop from "./nav-desktop"
import NavMobile from "./nav-mobile"
import withTheme from "@material-ui/core/styles/withTheme"
import makeStyles from "@material-ui/core/styles/makeStyles"
import useScroll from "@hoooks/use-scroll"
import loadable from "@loadable/component"
import "./styles.css"
import Seo from "../components/seo"
import Hidden from "@material-ui/core/Hidden"

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

  const status = props.location.pathname === "/" ? y > 400 : true

  return (
    <div className={clsx(props.top || classes["space-top"])}>
      <Seo
        title={props.title}
        description={props.description}
        keywords={props.keywords}
      />
      <CssBaseline />
      <Hidden smDown>
        <NavDesktop status={status} imgLogo={imgLogo} />
      </Hidden>
      <Hidden mdUp>
        <NavMobile status={status} imgLogo={imgLogo} />
      </Hidden>
      {props.children}
      <Footer imgLogoWithLabel={imgLogoWithLabel} />
    </div>
  )
}
Layout.defaultProps = {
  top: false,
}

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: "white",
    },
  },
  "space-top": {
    [theme.breakpoints.up("md")]: {
      marginTop: 75,
    },
  },
}))
export default withTheme(Layout)
