import React from "react"
import Img from "gatsby-image"
import { makeStyles, Grid, Typography, Container, Box } from "@material-ui/core"
import GoogleMapReact from "google-map-react"
import Instagram from "./../../static/icon/instagram.svg"
import Tokopedia from "./../../static/icon/tokopedia.svg"
import Shopee from "./../../static/icon/shopee.svg"
import Whatsapp from "./../../static/icon/whatsapp.svg"
import At from "./../../static/icon/at.svg"
import RoomIcon from "@material-ui/icons/Room"
import { graphql, useStaticQuery } from "gatsby"

const Position = () => (
  <Box width="150px">
    <Box fill="#FFFFFF">
      <RoomIcon variant="white" />
      <Typography>Pemalang Notebook</Typography>
    </Box>
  </Box>
)
const query = graphql`
  query getFooterContact {
    urlInstagram: dataStatic(name: { eq: "contact_instagram" }) {
      name
      url
      label
    }
    urlShopee: dataStatic(name: { eq: "contact_shopee" }) {
      name
      url
      label
    }
    urlTokopedia: dataStatic(name: { eq: "contact_tokopedia" }) {
      name
      url
      label
    }
    urlGmail: dataStatic(name: { eq: "contact_gmail" }) {
      name
      url
      label
    }
    urlWhatsapp: dataStatic(name: { eq: "contact_whatsapp" }) {
      name
      url
      label
    }
  }
`

function Footer(props) {
  const {
    urlGmail,
    urlInstagram,
    urlShopee,
    urlWhatsapp,
    urlTokopedia,
  } = useStaticQuery(query)
  const classes = useStyles()
  const { imgLogoWithLabel } = props

  return (
    <footer className={classes["container"]}>
      <Container>
        <Grid container spacing={6} justify="center" alignItems="center">
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Grid container spacing={4} alignItems="center" direction="column">
              <Grid item>
                <Img fixed={imgLogoWithLabel.childImageSharp.fixed}></Img>
              </Grid>
              <Grid container spacing={1} justify="center" direction="row">
                <Grid item component="a" href={urlInstagram.url}>
                  <Instagram></Instagram>
                </Grid>
                <Grid item component="a" href={urlTokopedia.url}>
                  <Tokopedia></Tokopedia>
                </Grid>
                <Grid item component="a" href={urlShopee.url}>
                  <Shopee></Shopee>
                </Grid>
                <Grid item component="a" href={urlWhatsapp.url}>
                  <Whatsapp></Whatsapp>
                </Grid>
                <Grid item component="a" href={urlGmail.url}>
                  <At></At>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={5} md={5} sm={12} xs={12}>
            <div className={classes["google-maps"]}>
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: "AIzaSyAH9kmLWToQwTc1WBGhzsex2U8VIvUCgtk",
                }}
                defaultCenter={{
                  lat: -6.884397,
                  lng: 109.38074,
                }}
                zoom={18}
              >
                <Position
                  lat={-6.884397}
                  lng={109.38074}
                  text="Pemalang Notebook"
                />
              </GoogleMapReact>
            </div>
          </Grid>
          <Grid item lg={1} md={1}></Grid>
          <Grid item lg md xs sm>
            <Box align="center" p={4} mt={4}>
              <Typography component="span" variant="caption">
                Terms of Use •{" "}
              </Typography>
              <Typography component="span" variant="caption">
                Privacy Policy •{" "}
              </Typography>
              <Typography component="span" variant="caption">
                {` `} © 2020 All Rights Reserved
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </footer>
  )
}

const useStyles = makeStyles(() => ({
  container: {
    width: "100%",
    padding: "50px 0px 100px 0px",
  },
  "google-maps": {
    height: "300px",
    width: "100%",
  },
}))
export default Footer
