const express = require('express')
const { getMany, post, destroy, getOne, put } = require('./feirante-controller')
const { routeSecurity : security } = require('../../config/security')
const validation = require('./user-validation')

const routes = express.Router()

routes.get('/feirante',
  getMany
)

routes.post('/feirante', 
  post
)

routes.get('/feirante/:id',
  getOne
)

routes.put('/feirante/:id', 
  security(['feirante']), 
  validation(['descricao']),
  put
)

routes.delete('/feirante/:id', 
  security(['feirante']), 
  destroy
)

module.exports = routes
