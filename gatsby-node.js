require("dotenv").config()
const path = require(`path`)
const axios = require("axios")
const _ = require("lodash")
const fs = require("fs")

const { key, spreadsheetId } = process.env

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions

  try {
    const fetchFormItems = () =>
      axios.get(
        `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchGet?ranges=Product&majorDimension=ROWS&key=${key}`
      )

    const response = await fetchFormItems()
    const headOfTables = response.data.valueRanges[0].values
    let rows = []
    for (var i = 1; i < headOfTables.length; i++) {
      var rowData = {}
      for (var j = 0; j < headOfTables[i].length; j++) {
        rowData[headOfTables[0][j]] = headOfTables[i][j]
      }
      rows.push(rowData)
    }
    const groupLaptop = {}
    rows = rows.map(product => {
      const data = {
        ...product,
      }
      const trim = item => item.trim()
      data["images"] = data.images.split(",").map(trim)

      const price = data.price.split("|").map(trim)

      data["price"] = [+price[0], +price[1]]

      const spec = data.spec.split("\n").map(trim)
      data["spec"] = spec

      const cond = data.cond.split("\n").map(trim)
      data["cond"] = cond

      const merk = data.merk.split(",")
      data["merk"] = merk

      const available = data.available === "TRUE"
      data["available"] = available

      groupLaptop[data.type] = groupLaptop[data.type] || {}
      if (merk[1]) {
        groupLaptop[data.type][merk[0]] = _.uniq(
          typeof groupLaptop[data.type][merk[0]] === "object"
            ? [...groupLaptop[data.type][merk[0]], merk[1]]
            : [merk[1]]
        )
      } else {
        groupLaptop[data.type][merk[0]] = []
      }

      return data
    })
    rows.forEach((item, i) => {
      const itemNode = {
        id: createNodeId(`${i}`),
        parent: `__SOURCE__`,
        internal: {
          type: `product`,
          contentDigest: createContentDigest(item),
        },
        children: [],
        ...item,
      }

      createNode(itemNode)
    })
    const object = {
      ...groupLaptop,
      attributes: Object.keys(groupLaptop),
    }
    createNode({
      id: createNodeId(`object`),
      parent: `__SOURCE__`,
      internal: {
        type: `object`,
        contentDigest: createContentDigest(object),
      },
      ...object,
    })

    fs.writeFile(
      "./group-laptop.json",
      JSON.stringify(groupLaptop),
      "utf8",
      () => ""
    )
    fs.writeFile("./my-data.json", JSON.stringify(rows), "utf8", () => "")
  } catch (error) {
    // console.log("error================================", error)
    // var json = JSON.stringify(error)
    // fs.writeFile("./myError.json", json, "utf8", () => "")
  }
}

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allProduct {
        edges {
          node {
            key
            title
            spec
            cond
            price
            images
            merk
            type
          }
        }
      }
    }
  `)

  if (result.errors) {
    result.errors.forEach(e => console.error(e.toString()))
    return Promise.reject(result.errors)
  }

  const items = result.data.allProduct.edges

  items.forEach(edge => {
    const { node } = edge
    const [type, merk] = [
      node.type.toLowerCase(),
      node.merk.map(i => i.toLowerCase()),
    ]
    const pathUrl = `/${type}/${merk.join("/")}/${node.key}`
    createPage({
      path: pathUrl,
      component: path.resolve(`src/templates/product-laptop.js`),
      context: {
        ...edge.node,
      },
    })
  })
}
