const express = require('express')
const { getMany, post, destroy, getOne, put, getEstados, getCidades } = require('./feira-controller')
const { routeSecurity : security } = require('../../config/security')
const validation = require('./feira-validation')

const routes = express.Router()

routes.get('/feiras',
  getMany
)

routes.get('/feiras/estados',
  getEstados
)

routes.get('/feiras/estados/:estado/cidades',
  getCidades
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
