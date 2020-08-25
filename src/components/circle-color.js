import React from "react"
import makeStyles from "@material-ui/core/styles/makeStyles"

export default function CircleColor({ width, color, height, ...props }) {
  const classes = useStyles({
    width,
    height,
    color,
  })
  return <div {...props} className={classes["circle-color"]} />
}
const useStyles = makeStyles(() => ({
  "circle-color": {
    backgroundColor: props => props.color,
    width: props => props.width || 10,
    height: props => props.height || 10,
    borderRadius: "50%",
    border: "1px solid grey",
  },
}))
