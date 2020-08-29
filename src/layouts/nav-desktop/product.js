import React from "react"
import makeStyles from "@material-ui/core/styles/makeStyles"
import Fade from "@material-ui/core/Fade"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import Grid from "@material-ui/core/Grid"
import navData from '../../../my-nav.json'
function Product(props) {
  const classes = useStyles()
  return (
    <Fade in={props.open}>
      <div
        tabIndex="0"
        role="button"
        {...props}
        className={classes["container"]}
      >
        <div className={classes['box-container']}>
          <Grid container>
              {Object.keys(navData).map((type)=>{
                return <Grid item lg={2} md={2}>
                  <Box mb={2}>
                    <Typography variant='h6'>{type}</Typography>
                  </Box>
                    {navData[type].map(i=>{
                      return <div>{i}</div>
                    })}
                </Grid>
              })}
          </Grid>
        </div>
      </div>
    </Fade>
  )
}

Product.defaultProps = {
  open: false,
}

const useStyles = makeStyles({
  container: {
    position: "fixed",
    top: 74,
    padding: 20,
    left: 0,
    zIndex: 9999,
    width: "100vw",
    backgroundColor: "white",
    boxShadow: "0px 1px 15px 0px rgba(0,0,0,0.1)",
  },
  "box-container":{
    padding: '20px 70px 50px 70px'
  }
})

export default Product
