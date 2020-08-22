import { jssPreset } from "@material-ui/styles"
import { create } from "jss"
import jssExpand from "jss-plugin-expand"
import jssCompose from "jss-plugin-compose"
import jssGlobal from "jss-plugin-global"
import jssExtend from "jss-plugin-extend"

const stylesProviderProps = {
  jss: create({
    ...jssPreset(),
    plugins: [
      ...jssPreset().plugins,
      jssGlobal(),
      jssExpand(),
      jssCompose(),
      jssExtend(),
    ],
    insertionPoint: `mui-inject-first`,
  }),
}

export default stylesProviderProps
