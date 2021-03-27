const express = require('express')
const { getMany, post, destroy, getOne, put } = require('./local-controller')
const { routeSecurity : security } = require('../../../config/security')
const validation = require('./local-validation')

const routes = express.Router()

routes.get('/feiras/:feiraId/locais',
  getMany
)

routes.post('/feiras/:feiraId/locais', 
  security(['feira']), 
  validation(['cep', 'logradouro', 'numero', 'bairro', 'diaSemana', 
              'horarioInicio', 'horarioTermino']), 
  post
)

routes.get('/feiras/:feiraId/locais/:id', 
  getOne
)

routes.put('/feiras/:feiraId/locais/:id', 
  security(['feira']), 
  validation(['cep', 'logradouro', 'numero', 'bairro', 'diaSemana', 
              'horarioInicio', 'horarioTermino']),
  put
)

routes.delete('/feiras/:feiraId/locais/:id', 
  security(['feira']), 
  destroy
)

module.exports = routes
