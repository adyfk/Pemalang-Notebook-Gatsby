import React from "react"
import Layout from "../layouts"
import { makeStyles } from "@material-ui/core/styles"
export default function Contact(props) {
  useStyles()
  return <Layout {...props}>404</Layout>
}

export const useStyles = makeStyles(() => ({}))
