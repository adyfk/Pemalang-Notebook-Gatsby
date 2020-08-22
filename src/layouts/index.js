import React from "react"
import CssBaseline from "@material-ui/core/CssBaseline"
import { graphql, useStaticQuery } from "gatsby"
import NavDesktop from "./nav-desktop"
import { useMediaQuery } from "@material-ui/core"
import useScroll from "@hoooks/use-scroll"

function Layout(props) {
  const matches = useMediaQuery(theme => theme.breakpoints.up("md"))
  const { y } = useScroll()
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

  const status = () => window.location.pathname === "/" && y > 200
  return (
    <React.Fragment>
      <div style={{ height: 5000 }}>
        <CssBaseline />
        {!!matches && <NavDesktop status={status()} imgLogo={imgLogo} />}
        {props.children}
      </div>
    </React.Fragment>
  )
}

export default Layout
