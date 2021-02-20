const express = require('express')
const { getMany, post, destroy, getOne, put } = require('./produto-controller')
const { routeSecurity : security } = require('../../../config/security')
const validation = require('./produto-validation')

const routes = express.Router()

routes.get('/feiras/:feira_id/feirantes/produtos',
  getMany
)

routes.post('/feirante/:feirante_id/produtos', 
  security(['feirante']),
  validation(['descricao', 'imagemUrl', 'valor', 'unidadeMedida']), 
  post
)

routes.get('/feirante/:feirante_id/produtos/:id',
  getOne
)

routes.put('/feirante/:feirante_id/produtos/:id', 
  security(['feirante']), 
  validation(['descricao', 'imagemUrl', 'valor', 'unidadeMedida']),
  put
)

routes.delete('/feirante/:feirante_id/produtos/:id', 
  security(['feirante']), 
  destroy
)

module.exports = routes
