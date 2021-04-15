require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path');

const usuarioRoutes = require('./modules/user/user-routes')
const feiraRoutes = require('./modules/feira/feira-routes')
const feiranteRoutes = require('./modules/feirante/feirante-routes')
const produtosRoutes = require('./modules/feirante/produto/produto-routes')
const locaisRoutes = require('./modules/feira/local/local-routes')

const app = express()

app.use(cors())
app.use(express.json())

app.use(express.static(path.join(__dirname.replace('\\src',''), 'public')))

app.use(usuarioRoutes)
app.use(feiraRoutes)
app.use(feiranteRoutes)
app.use(produtosRoutes)
app.use(locaisRoutes)

app.listen(process.env.PORT, () => {
  console.log(`API server running on port ${process.env.PORT}!`)
})
