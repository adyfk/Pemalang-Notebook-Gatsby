const path = require(`path`)
const axios = require("axios")
const _ = require("lodash")
const fs = require("fs")

const { key, spreadsheetId } = process.env
const createFile = (fileName, object) =>
  fs.writeFile("./static/" + fileName, JSON.stringify(object), "utf8", () => "")

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions
  try {
    const fetchProducts = () =>
      axios.get(
        `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchGet?ranges=Product&majorDimension=ROWS&key=${key}`
      )

    const fetchStaticItems = () =>
      axios.get(
        `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchGet?ranges=Static!A:C&majorDimension=ROWS&key=${key}`
      )

    const fetchTypeItems = () =>
      axios.get(
        `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchGet?ranges=Relasi!A:C&majorDimension=ROWS&key=${key}`
      )

    const [
      responseData,
      responseDataStatic,
      responseTypeItem,
    ] = await Promise.all([
      fetchProducts(),
      fetchStaticItems(),
      fetchTypeItems(),
    ])
    const headOfTablesProduct = responseData.data.valueRanges[0].values
    const headOfTablesType = responseTypeItem.data.valueRanges[0].values
    let rowsProduct = [],
      rowsType = []
    for (var i = 1; i < headOfTablesProduct.length; i++) {
      var rowData = {}
      for (var j = 0; j < headOfTablesProduct[i].length; j++) {
        rowData[headOfTablesProduct[0][j]] = headOfTablesProduct[i][j]
      }
      rowsProduct.push(rowData)
    }
    for (var i = 1; i < headOfTablesType.length; i++) {
      var rowData = {}
      for (var j = 0; j < headOfTablesType[i].length; j++) {
        rowData[headOfTablesType[0][j]] = headOfTablesType[i][j]
      }
      rowsType.push(rowData)
    }
    const navigationMap = {}
    const groupProductMap = {}
    rowsProduct = rowsProduct.map(product => {
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

      navigationMap[data.type] = new Set()
      groupProductMap[data.type + data.merk[0]] = new Set()
      if (data.merk[2]) {
        groupProductMap[data.type + data.merk[0] + data.merk[1]] = new Set()
      }
      return data
    })
    rowsProduct.forEach((item, i) => {
      navigationMap[item.type].add(item.merk[0])
      groupProductMap[item.type + item.merk[0]].add(item.merk[1])
      if (item.merk[2])
        groupProductMap[item.type + item.merk[0] + item.merk[1]].add(
          item.merk[2]
        )

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
    Object.keys(navigationMap).forEach(type => {
      navigationMap[type] = [...navigationMap[type]]
    })
    Object.keys(groupProductMap).forEach(type => {
      groupProductMap[type] = [...groupProductMap[type]]
    })

    responseDataStatic.data.valueRanges[0].values.forEach((i, idx) => {
      const data = { name: i[0], url: i[1], label: i[2] || "" }
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
    rowsType.forEach((data, idx) => {
      createNode({
        id: createNodeId(`typeProduct_${idx}`),
        parent: `__SOURCE__`,
        internal: {
          type: `typeProduct`,
          contentDigest: createContentDigest(data),
        },
        children: [],
        ...data,
      })
    })

    createFile("my-nav.json", navigationMap)
    createFile("my-group-product.json", groupProductMap)
    // createFile("my-data.json", rowsProduct)
  } catch (error) {
    console.log(error)
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
      component: path.resolve(`src/templates/product.js`),
      context: {
        productId: node.id,
        merk: node.merk[0],
      },
    })
  })

  const myNav = require("./static/my-nav.json")

  Object.keys(myNav).forEach(type => {
    const pathUrl = `/${type}`.toLowerCase()
    createPage({
      path: pathUrl,
      component: path.resolve(`src/templates/product-container.js`),
      context: {
        type,
      },
    })
  })
}
