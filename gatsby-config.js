module.exports = {
  siteMetadata: {
    title: `Pemalang Notebook`,
    description: "Jual beli laptop, baju ,dan percetakan",
    author: `Pemalang Notebook`,
  },
  plugins: [
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
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
        theme: {
          nameOfGod: "god",
        },
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
