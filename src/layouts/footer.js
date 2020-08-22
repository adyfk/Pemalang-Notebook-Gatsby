import React from "react"
import Img from "gatsby-image"
import { makeStyles, Grid, Typography, Container, Box } from "@material-ui/core"
import GoogleMapReact from "google-map-react"
const AnyReactComponent = ({ text }) => <div>{text}</div>
function Footer(props) {
  const classes = useStyles()
  const { imgLogoWithLabel } = props
  return (
    <footer className={classes["container"]}>
      <Container fluid>
        <Grid container justify="center" alignItems="center">
          <Grid item lg={5} md={5} sm={12} xs={12}>
            <Img fixed={imgLogoWithLabel.childImageSharp.fixed}></Img>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <div className={classes["google-maps"]}>
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: "tesr",
                }}
                defaultCenter={{
                  lat: 59.95,
                  lng: 30.33,
                }}
                zoom={11}
              >
                <AnyReactComponent
                  lat={59.955413}
                  lng={30.337844}
                  text="My Marker"
                />
              </GoogleMapReact>
            </div>
          </Grid>
          <Grid item>
            <Box p={4}>
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
    padding: "25px 25px 100px 25px",
    transform: "translate(0,100%)",
  },
  "google-maps": {
    height: "300px",
    width: "100%",
  },
}))
export default Footer
