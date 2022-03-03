
// require.context 是webpack的一个api
const req = require.context('./', false, /\.vue$/)
// 全局注册

export default function installGlobalComponents (app) {
  req.keys().forEach(element => {
    let name = element.replace(/(\.\/)|(\.vue)/ig, '')
    name = req(element).default.name || name
    app.component(name, req(element).default)
  })
}
