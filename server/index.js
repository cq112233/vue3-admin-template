const path = require('path')
const express = require('express')
var bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json({ limit: '1mb' })) // body-parser 解析json格式数据
app.use(bodyParser.urlencoded({ // 此项必须在 bodyParser.json 下面,为参数编码
  extended: true
}))
// 这里我简单的 防token
let token = null
let refreshToken = null
app.post('/refreshToken', (req, res) => {
  // if (refreshToken !== req.body.data.refreshToken) return res.status(500).send()
  // render函数就是express对模板引擎的调用方法，它会自动调用模板引擎去你配置的目录下找index.html文件，并解析返回
  res.send({
    accessToken: 'i am token 1',
    refreshToken: 'i am refreshToken 1'
  })
  token = 'i am token 1'
})

app.post('/login', (req, res) => {
  token = `i am token ${req.body.roleId}`
  refreshToken = `i am refreshToken ${req.body.roleId}`
  // render函数就是express对模板引擎的调用方法，它会自动调用模板引擎去你配置的目录下找index.html文件，并解析返回
  res.send({
    accessToken: `i am token ${req.body.roleId}`,
    refreshToken: `i am refreshToken ${req.body.roleId}`
  })

  setTimeout(() => {
    token = 'xxxxx'
  }, 10000)
})

app.post('/userinfo', (req, res) => {
  // render函数就是express对模板引擎的调用方法，它会自动调用模板引擎去你配置的目录下找index.html文件，并解析返回
  // if (token !== req.headers.authorization) return res.status(401).send()
  // res.status(401).send()
  res.status(200).send({
    id: 1,
    username: 'zhangsan',
    age: 18,
    // 显示层级
    permissionList: [
      {
        code: 'nested',
        ranked: 1,
        hidden: false,
        children: [
          {
            code: 'menu1',
            ranked: 1,
            hidden: false,
            children: [
              {
                code: 'menu1.x',
                hidden: true
              }
            ]
          },
          {
            code: 'menu2',
            ranked: 1,
            hidden: true,
            children: [
              {
                code: 'menu2.x',
                hidden: false
              }
            ]
          }
        ]
      },
      {
        code: 'about',
        ranked: 1,
        hidden: false,
        children: [
          {
            code: 'about1',
            ranked: 1,
            hidden: true,
            children: [
              {
                code: 'about1.x',
                hidden: true
              }
            ]
          },
          {
            code: 'about2',
            ranked: 1,
            hidden: false,
            children: [
              {
                code: 'about2.x',
                hidden: false
              }
            ]
          }
        ]
      }
    ]
    // roles: ? ['admin'] : ['employee']
  })
})
app.get('/test', (req, res) => {
  // console.log(req.headers.authorization, token)
  // return res.status(401).send()
  // render函数就是express对模板引擎的调用方法，它会自动调用模板引擎去你配置的目录下找index.html文件，并解析返回
  if (token !== req.headers.authorization) return res.status(401).send()
  res.send({
    title: '标题'
  })
})
app.get('/test1', (req, res) => {
  // console.log(req.headers.authorization, token)
  // return res.status(401).send()
  // render函数就是express对模板引擎的调用方法，它会自动调用模板引擎去你配置的目录下找index.html文件，并解析返回
  if (token !== req.headers.authorization) return res.status(401).send()
  res.send({
    title: '标题1'
  })
})
app.get('/test2', (req, res) => {
  // console.log(req.headers.authorization, token)
  // return res.status(401).send()
  // render函数就是express对模板引擎的调用方法，它会自动调用模板引擎去你配置的目录下找index.html文件，并解析返回
  if (token !== req.headers.authorization) return res.status(401).send()
  res.send({
    title: '标题2'
  })
})

// 启动服务
app.listen(8011, () => {
  console.log('server up to http://localhost:8011/')
})
