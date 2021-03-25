const express = require('express')
const { getMany, post, destroy, getOne, put } = require('./feirante-controller')
const { routeSecurity : security } = require('../../config/security')
const validation = require('./feirante-validation')

const routes = express.Router()

routes.get('/feirantes',///:feiraId/feirantes',
  getMany
)

routes.post('/feirantes', 
  security(['feirante']), 
  validation(['usuarioId', 'feiraId', 'nome', 'descricao', 'confirmado']),
  post
)

routes.get('/feirantes/:id',
  getOne
)

routes.put('/feirantes/:id', 
  security(['feirante']), 
  validation(['usuarioId', 'feiraId', 'nome', 'descricao', 'confirmado']),
  put
)

routes.patch('/feirantes/:id', 
  security(['feira']), 
  validation(['confirmado']),
  put
)

routes.delete('/feirantes/:id', 
  security(['feirante']), 
  destroy
)

module.exports = routes
