const express = require('express')
const { getMany, post, destroy, getOne, put } = require('./produto-controller')
const { routeSecurity : security } = require('../../../config/security')
const validation = require('./produto-validation')

const routes = express.Router()

routes.get('/feiras/:feiraId/feirantes/produtos',
  getMany
)

routes.post('/feirante/:feiranteId/produtos', 
  security(['feirante']),
  validation(['descricao', 'imagemUrl', 'valor', 'unidadeMedida']), 
  post
)

routes.get('/feirante/:feiranteId/produtos/:id',
  getOne
)

routes.put('/feirante/:feiranteId/produtos/:id', 
  security(['feirante']), 
  validation(['descricao', 'imagemUrl', 'valor', 'unidadeMedida']),
  put
)

routes.delete('/feirante/:feiranteId/produtos/:id', 
  security(['feirante']), 
  destroy
)

module.exports = routes
