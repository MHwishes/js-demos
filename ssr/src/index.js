// import React from 'react'
// import {renderToString} from 'react-dom/server'
const express = require('express')
const app = express()

app.get('/', (req,res) => res.send(`
<html>
   <head>
       <title>ssr demo</title>
   </head>
   <body>
       Hello world
   </body>
</html>
`))

app.listen(3000, () => console.log('Exampleapp listening on port 3000!'))
