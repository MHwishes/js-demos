import React from 'react'
import {renderToString} from 'react-dom/server'
import express from 'express'
import Home from './components/App'

const app = express()

app.get('/', (req,res) =>{
const html=renderToString(<Home/>)
res.send(html)
})

app.listen(3000, () => console.log('Exampleapp listening on port 3000!'))
