import React from "react"
import CssBaseline from "@material-ui/core/CssBaseline"
import { graphql, useStaticQuery } from "gatsby"
import NavDesktop from "./nav-desktop"
import { useMediaQuery, makeStyles, withTheme } from "@material-ui/core"
import useScroll from "@hoooks/use-scroll"
import clsx from "clsx"
import { usingTheme } from "../utils/theme"
import loadable from "@loadable/component"

const Footer = loadable(() => import(`./footer`))
function Layout(props) {
  const classes = useStyles()
  const matches = useMediaQuery(theme =>
    usingTheme(theme, props.theme).breakpoints.up("md")
  )
  const { y } = useScroll()
  const { imgLogo, imgLogoWithLabel } = useStaticQuery(graphql`
    query getLogo {
      imgLogo: file(name: { eq: "logo-pemalang-notebook" }) {
        name
        childImageSharp {
          fixed(width: 200, quality: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      imgLogoWithLabel: file(
        name: { eq: "logo-pemalang-notebook-with-label" }
      ) {
        name
        childImageSharp {
          fixed(width: 300, quality: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  const status = props.location.pathname === "/" ? y > 200 : true
  return (
    <div className={clsx(props.top || classes["space-top"])}>
      <CssBaseline />
      {!!matches && <NavDesktop status={status} imgLogo={imgLogo} />}
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
