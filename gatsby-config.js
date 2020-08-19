/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: `Pemalang Notebook`,
    description: "Jual beli laptop, baju ,dan percetakan",
    author: `Pemalang Notebook`,
  },
  plugins: [
    // {
    //   // keep as first gatsby-source-filesystem plugin for gatsby image support
    //   resolve: "gatsby-source-filesystem",
    //   options: {
    //     path: `${__dirname}/static/img`,
    //     name: "uploads",
    //   },
    // },
    // {
    //   resolve: "gatsby-source-filesystem",
    //   options: {
    //     path: `${__dirname}/src/pages`,
    //     name: "pages",
    //   },
    // },
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        theme: {
          palette: {
            orange: {
              light: "#ffb443",
              main: "#f08400",
              dark: "#b75600",
            },
            blue: {
              light: "#5dbdff",
              main: "#008dce",
              dark: "#00609d",
            },
            white: {
              light: "#ffffff",
              main: "#cccccc",
              dark: "#9b9b9b",
            },
            primary: {
              main: "#BA3D3B", // or whatever colors you need
            },
          },
        },
      },
    },
  ],
}
