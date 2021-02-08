const express = require('express')
const { getMany, post, destroy, getOne, put } = require('./feira-controller')
const { routeSecurity : security } = require('../../config/security')
const validation = require('./user-validation')

const routes = express.Router()

routes.get('/feiras',
  getMany
)

routes.post('/feiras', 
  validation(['cidade', 'estado', 'descricao']), 
  post
)

routes.get('/feiras/:id',
  getOne
)

routes.put('/feiras/:id', 
  security(['feira']), 
  validation(['cidade', 'estado', 'descricao']),
  put
)

routes.delete('/feiras/:id', 
  security(['feira']), 
  destroy
)

module.exports = routes
