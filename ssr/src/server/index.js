import React from 'react'
import {renderToString} from 'react-dom/server'
import { StaticRouter } from 'react-router-dom';
import express from 'express'
import { renderRoutes } from 'react-router-config';
import routes from '../routers'

const app = express()
// 前端打包完的 静态资源
app.use(express.static('public'));

app.get('*', (req,res) =>{
    const App=(
     <StaticRouter location={req.path}>
      {renderRoutes(routes)}
     </StaticRouter>
 );

const html=`
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<title>Document</title>
</head>
<body>
<div id="app">${renderToString(App)}</div>
<script src="/index.js"></script>
</body>
</html>
`
res.send(html)
})

app.listen(3000, () => console.log('Exampleapp listening on port 3000!'))
