import React from "react"
import Img from "gatsby-image"
import { makeStyles, Grid, Typography, Container, Box } from "@material-ui/core"
import GoogleMapReact from "google-map-react"
import Instagram from "./../../static/icon/instagram.svg"
import Tokopedia from "./../../static/icon/tokopedia.svg"
import Shopee from "./../../static/icon/shopee.svg"
import At from "./../../static/icon/at.svg"
import RoomIcon from "@material-ui/icons/Room"
import { Link } from "gatsby"

const Position = () => (
  <Box width="150px">
    <Box fill="#FFFFFF" color="#FFFFFF">
      <RoomIcon color="#FFFFFF" variant="white" />
      <Typography>Pemalang Notebook</Typography>
    </Box>
  </Box>
)
function Footer(props) {
  const classes = useStyles()
  const { imgLogoWithLabel } = props
  return (
    <footer className={classes["container"]}>
      <Container>
        <Grid container justify="space-between" alignItems="center">
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Grid container spacing={4} alignItems="center" direction="column">
              <Grid item>
                <Img fixed={imgLogoWithLabel.childImageSharp.fixed}></Img>
              </Grid>
              <Grid container spacing={1} justify="center" direction="row">
                <Grid item component={Link} to="/">
                  <Instagram></Instagram>
                </Grid>
                <Grid item component={Link} to="/">
                  <Tokopedia></Tokopedia>
                </Grid>
                <Grid item component={Link} to="/">
                  <Shopee></Shopee>
                </Grid>
                <Grid item component={Link} to="/">
                  <At></At>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
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
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    padding: "0px 0px 100px 0px",
    transform: "translate(0,70%)",
  },
  "google-maps": {
    height: "300px",
    width: "100%",
  },
}))
export default Footer
