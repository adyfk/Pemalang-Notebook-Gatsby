module.exports = {
  siteMetadata: {
    title: `Pemalang Notebook`,
    description: "Jual beli laptop, baju ,dan percetakan",
    author: `Pemalang Notebook`,
  },
  plugins: [
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    "gatsby-plugin-react-helmet",
    // {
    //   resolve: `gatsby-plugin-manifest`,
    //   options: {
    //     name: `Pemalang Notebook`,
    //     short_name: `Pemalang Notebok`,
    //     start_url: `/`,
    //     background_color: `#f7f0eb`,
    //     theme_color: `#a2466c`,
    //     display: `standalone`,
    //   },
    // },
    {
      resolve: "gatsby-plugin-remote-images",
      options: {
        nodeType: "product",
        imagePath: "images",
        type: "array",
        name: "optimized_product",
      },
    },
    {
      resolve: "gatsby-plugin-remote-images",
      options: {
        nodeType: "typeProduct",
        imagePath: "image",
        name: "optimized_type_product",
      },
    },
    {
      resolve: "gatsby-plugin-remote-images",
      options: {
        nodeType: "dataStatic",
        imagePath: "url",
        name: "optimized_data_static",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/static/img`,
        name: "images",
      },
    },
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        pathToStylesProvider: `src/styles-provider-props`,
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /icon/,
        },
      },
    },
  ],
}
