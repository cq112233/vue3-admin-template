// 自动导入
const req = require.context('./', false, /\.js$/)
let totalUtils = {}
req.keys().forEach(element => {
  if (req(element).default) {
    totalUtils = { ...totalUtils, ...req(element).default }
  } else {
    totalUtils = { ...totalUtils, ...req(element) }
  }
})

export default totalUtils
