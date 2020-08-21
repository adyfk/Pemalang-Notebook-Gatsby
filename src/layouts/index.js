import React from "react"
import CssBaseline from "@material-ui/core/CssBaseline"
import { useStyles } from "./styles"
import { graphql, useStaticQuery } from "gatsby"
import NavDesktop from "./nav-desktop"

function Layout() {
  const classes = useStyles()

  const { imgLogo } = useStaticQuery(graphql`
    query getLogo {
      imgLogo: file(name: { eq: "logo-pemalang-notebook" }) {
        name
        childImageSharp {
          fixed(width: 200, quality: 100) {
            ...GatsbyImageSharpFixed_tracedSVG
          }
        }
      }
    }
  `)
  return (
    <React.Fragment>
      <CssBaseline />
      <header>
        <nav className={classes.nav}>
          <NavDesktop imgLogo={imgLogo} />
        </nav>
      </header>
    </React.Fragment>
  )
}

export default Layout
