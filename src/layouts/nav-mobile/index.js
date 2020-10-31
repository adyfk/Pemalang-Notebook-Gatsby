import React, { useState } from "react"
import List from "@material-ui/core/List"
import Collapse from "@material-ui/core/Collapse"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import Img from "gatsby-image"
import ExpandLess from "@material-ui/icons/ExpandLess"
import ExpandMore from "@material-ui/icons/ExpandMore"
import myNav from "../../../static/my-nav.json"
import { makeStyles } from "@material-ui/core/styles"
import { Link } from "gatsby"

const useStyles = makeStyles(theme => ({
  "@global": {
    "a:-webkit-any-link": {
      color: "-webkit-link",
      cursor: "pointer",
      textDecoration: "none",
    },
    header: {
      position: "relative",
    },
  },
  container: {
    zIndex: 9999,
    width: "100vw",
    boxShadow: "0px 1px 15px 0px rgba(0,0,0,0.1)",
    padding: 20,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    flexDirection: "row",
  },
  "box-container": {
    padding: 20,
  },
  nav: {
    backgroundColor: "white",
    zIndex: 99999,
    width: "100%",
  },
  "list-menu": {
    width: "100%",
    height: "100%",
  },
  "list-nested-menu": {
    paddingLeft: theme.spacing(4),
    color: ["black", "!important"],
  },
  "disable-link-color": {
    color: ["black", "!important"],
  },
}))

function NavMobile(props) {
  const classes = useStyles(props)
  const [open, setOpen] = useState(false)
  const [expand, setExpand] = useState(false)
  const { imgLogo } = props

  const _handleClickOpen = value => () => setOpen(value)
  const _handleClickExpand = value => () => setExpand(value)

  return (
    <header>
      <nav className={classes.nav}>
        <div aria-label="Mobile Navigation" className={classes["container"]}>
          <Link to="/">
            <Img
              fadeIn={false}
              imgStyle={{ marginTop: 1 }}
              fixed={imgLogo.childImageSharp.fixed}
              loading="eager"
              alt={imgLogo.name}
              title={imgLogo.name}
            />
          </Link>
          <div>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              onClick={_handleClickOpen(!open)}
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          </div>
        </div>
      </nav>
      <Collapse in={open}>
        <div className={classes["list-menu"]}>
          <List disablePadding>
            <ListItem
              button
              onClick={_handleClickExpand(
                expand === "product" ? false : "product"
              )}
            >
              <ListItemText primary="Product" />
              {expand === "product" ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={expand === "product"} timeout="auto" unmountOnExit>
              {Object.keys(myNav).map(subMenu => {
                return (
                  <List
                    component={Link}
                    to={`/${subMenu.toLowerCase()}`}
                    disablePadding
                  >
                    <ListItem button className={classes["list-nested-menu"]}>
                      <ListItemText primary={subMenu} />
                    </ListItem>
                  </List>
                )
              })}
            </Collapse>
            <ListItem component={Link} to="#contact-us" button>
              <ListItemText
                className={classes["disable-link-color"]}
                primary="Contact"
              />
            </ListItem>
          </List>
        </div>
      </Collapse>
    </header>
  )
}
export default NavMobile
