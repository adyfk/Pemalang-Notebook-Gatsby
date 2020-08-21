import { jssPreset } from "@material-ui/styles"
import { create } from "jss"
import jssExpand from "jss-plugin-expand"
import jssCompose from "jss-plugin-compose"
import jssGlobal from "jss-plugin-global"

const stylesProviderProps = {
  jss: create({
    ...jssPreset(),
    plugins: [...jssPreset().plugins, jssGlobal(), jssExpand(), jssCompose()],
    insertionPoint: `mui-inject-first`,
  }),
}

export default stylesProviderProps
