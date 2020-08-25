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

    const fetchStaticItems = () =>
      axios.get(
        `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchGet?ranges=Static!A:C&majorDimension=ROWS&key=${key}`
      )

    const [responseData, responseDataStatic] = await Promise.all([
      fetchFormItems(),
      fetchStaticItems(),
    ])
    const headOfTables = responseData.data.valueRanges[0].values
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
      data["images"] = data.images.split("\n").map(trim)
      data["price"] = +data.price.replace(/,00$/g, "").replace(/\D/g, "")

      const spec = data.spec.split("\n").map(trim)
      data["spec"] = spec

      const cond = data.cond.split("\n").map(trim)
      data["cond"] = cond

      const merk = data.merk.split("\n").map(trim)
      data["merk"] = merk

      const color = data.color.split("\n").map(trim)
      data["color"] = color

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
        id: createNodeId(`product_${i}`),
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

    responseDataStatic.data.valueRanges[0].values.forEach((i, idx) => {
      const data = { name: i[0], url: i[1], label: i[2] }
      createNode({
        id: createNodeId(`dataStatic_${idx}`),
        parent: `__SOURCE__`,
        internal: {
          type: `dataStatic`,
          contentDigest: createContentDigest(data),
        },
        children: [],
        ...data,
      })
    })

    // fs.writeFile(
    //   "./group-laptop.json",
    //   JSON.stringify(groupLaptop),
    //   "utf8",
    //   () => ""
    // )
    // fs.writeFile("./my-data.json", JSON.stringify(rows), "utf8", () => "")
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
        nodes {
          id
          merk
          type
          key
        }
      }
    }
  `)

  if (result.errors) {
    result.errors.forEach(e => console.error(e.toString()))
    return Promise.reject(result.errors)
  }

  const items = result.data.allProduct.nodes

  items.forEach(node => {
    const pathUrl = `/${node.type}/${node.merk.join("/")}/${
      node.key
    }`.toLowerCase()
    createPage({
      path: pathUrl,
      component: path.resolve(`src/templates/product-laptop.js`),
      context: {
        productId: node.id,
      },
    })
  })
}
