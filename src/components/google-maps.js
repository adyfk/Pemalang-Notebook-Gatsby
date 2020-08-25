import React from "react"
import RoomIcon from "@material-ui/icons/Room"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import loadable from "@loadable/component"

const GoogleMapReact = loadable(() => import(`google-map-react`))

const Position = () => (
  <Box width="150px">
    <Box fill="#FFFFFF">
      <RoomIcon variant="white" />
      <Typography>Pemalang Notebook</Typography>
    </Box>
  </Box>
)
function Maps() {
  return (
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
      <Position lat={-6.884397} lng={109.38074} text="Pemalang Notebook" />
    </GoogleMapReact>
  )
}

export default Maps
