import React from "react"
import clsx from "clsx"
import { Link } from "gatsby"
import makeStyles from "@material-ui/core/styles/makeStyles"
import Typography from "@material-ui/core/Typography"
import Divider from "@material-ui/core/Divider"
import Grid from "@material-ui/core/Grid"
import Box from "@material-ui/core/Box"
import CircleColor from "../../components/circle-color"

function LeftSideProductContainer(props) {
  const classes = useStyles()
  const { pageContext, filter, filterColor, setFilter, setFilterColor } = props
  const { myNav, myGroupProduct, type, myColor } = pageContext

  return (
    <>
      <Box pb={5} id="filter-by-category">
        <Box color="white.dark" mb={1}>
          <Typography variant="subtitle2">Category</Typography>
        </Box>
        <Divider />
        <Box mt={1} pl={1}>
          {Object.keys(myNav).map(text => {
            return (
              <Typography
                key={text + "label"}
                component={Link}
                variant="subtitle2"
                activeClassName={classes["label-product-active"]}
                to={`/${text}`.toLowerCase()}
                className={classes["label-product"]}
              >
                {text}
              </Typography>
            )
          })}
        </Box>
      </Box>
      <Box id="filter-by-sub">
        <Box mb={1} color="white.dark">
          <Typography variant="subtitle2">Filter By</Typography>
        </Box>
        <Divider />
        {/* ======================== */}
        <Box mb={2} mt={2} color="primary.light">
          <Typography variant="body2">{type}</Typography>
        </Box>
        <Box pl={1} mb={1}>
          {myNav[type].map(text => {
            return (
              <React.Fragment key={text + "filter"}>
                <Typography
                  onClick={() => setFilter(text)}
                  variant="subtitle2"
                  className={clsx(
                    classes["label-product"],
                    filter === text && classes["label-product-active"]
                  )}
                >
                  {text}
                </Typography>
                {!!myGroupProduct[text] && myGroupProduct[text]?.[0] && (
                  <Box pl={1}>
                    {myGroupProduct[text]?.map(sub => {
                      return (
                        <React.Fragment key={text + sub}>
                          <Typography
                            onClick={() => setFilter(sub)}
                            variant="subtitle2"
                            className={clsx(
                              classes["label-product"],
                              filter === sub && classes["label-product-active"]
                            )}
                          >
                            {sub}
                          </Typography>
                          {!!myGroupProduct[text + sub] && (
                            <Box pl={1}>
                              {myGroupProduct[text + sub]?.map(sub2 => {
                                return (
                                  <Typography
                                    onClick={() => setFilter(sub2)}
                                    key={text + sub + sub2}
                                    variant="subtitle2"
                                    className={clsx(
                                      classes["label-product"],
                                      filter === sub2 &&
                                        classes["label-product-active"]
                                    )}
                                  >
                                    {sub2}
                                  </Typography>
                                )
                              })}
                            </Box>
                          )}
                        </React.Fragment>
                      )
                    })}
                  </Box>
                )}
              </React.Fragment>
            )
          })}
        </Box>
        <Divider />
        {type === "Laptop" && (
          <Box mt={2}>
            <Box mb={1} color="primary.light">
              <Typography variant="body2">Screen Size</Typography>
            </Box>
            <Box pt={1} pb={2} pl={1}>
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <Typography variant="subtitle2">11" ~ 13"</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2">14" ~ 16"</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2">17" & up</Typography>
                </Grid>
              </Grid>
            </Box>
            <Divider />
          </Box>
        )}
        <Box mt={2}>
          <Box mb={1} color="primary.light">
            <Typography variant="body2">Color</Typography>
          </Box>
          <Box py={1} pl={1}>
            <Grid container spacing={1}>
              {myColor.map(text => {
                return (
                  <Grid item key={text + "color-product"}>
                    <Box
                      onClick={() =>
                        setFilterColor(filterColor === text ? "" : text)
                      }
                      className={clsx(
                        classes["color-box"],
                        filterColor === text && classes["color-box-active"]
                      )}
                    >
                      <CircleColor
                        color={text}
                        width={30}
                        height={30}
                      ></CircleColor>
                    </Box>
                  </Grid>
                )
              })}
            </Grid>
          </Box>
          <Divider />
        </Box>
      </Box>
    </>
  )
}

const useStyles = makeStyles(theme => ({
  "label-product": {
    display: "block",
    textDecoration: "none",
    margin: "8px 0px",
    cursor: "pointer",
    color: ["black", "!important"],
    "&:hover": {
      color: [theme.palette.orange.light, "!important"],
    },
  },
  "label-product-active": {
    color: [theme.palette.orange.main, "!important"],
  },
}))

export default LeftSideProductContainer
