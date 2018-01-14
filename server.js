const express = require('express')
const next = require('next')
const httpProxy = require('http-proxy');  
const dev = process.env.NODE_ENV.indexOf('development')==-1?true:false;
const compression = require('compression')
const app = next({ dev })
const handle = app.getRequestHandler()
// 新建一个代理 Proxy Server 对象  
var proxy = httpProxy.createProxyServer({});  
app.prepare()
.then(() => {
  const server = express()
  server.use(compression())
  //node服务 反向代理解决跨域问题
  server.get('/ant/ant/ant-cgi/*', (req, res) => {
	  console.log("client ip GET:" + req.url);  
    return proxy.web(req, res, { target: 'http://127.0.0.2' });  
  })
  //node服务 反向代理解决跨域问题
  server.post('/ant/ant/ant-cgi/*', (req, res) => {
	   console.log("client ip POST:" + req.url);  
    return proxy.web(req, res, { target: 'http://127.0.0.2' });  
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
