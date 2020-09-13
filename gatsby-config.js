module.exports = {
  siteMetadata: {
    title: `Pemalang Notebook`,
    description: "Jual beli laptop, baju ,dan percetakan",
    author: `Pemalang Notebook`,
  },
  plugins: [
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-offline`,
    // {
    //   resolve: `@ccalamos/gatsby-source-googlemaps-static`,
    //   options: {
    //     key: `AIzaSyAH9kmLWToQwTc1WBGhzsex2U8VIvUCgtk`,
    //     center: `-6.884397,109.38074`,
    //     zoom: 13
    //   },
    // },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Pemalang Notebook`,
        short_name: `Pemalang Notebok`,
        description: `Jual beli laptop bekas aman dan terpercaya`,
        icons: [
          {
            src: "public/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "public/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        crossOrigin: `use-credentials`,
      },
    },
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
