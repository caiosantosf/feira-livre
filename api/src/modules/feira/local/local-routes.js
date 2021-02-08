const express = require('express')
const { getMany, post, destroy, getOne, put } = require('./local-controller')
const { routeSecurity : security } = require('../../config/security')
const validation = require('./user-validation')

const routes = express.Router()

routes.get('feiras/:feira_id/locais',
  getMany
)

routes.post('feiras/:feira_id/locais', 
  security(['feira']), 
  validation(['cep', 'logradouro', 'numero', 'complemento', 'bairro', 'diaSemana', 
              'horarioInicio', 'horarioTermino']), 
  post
)

routes.get('feiras/:feira_id/locais/:id', 
  getOne
)

routes.put('feiras/:feira_id/locais/:id', 
  security(['feira']), 
  validation(['cep', 'logradouro', 'numero', 'complemento', 'bairro', 'diaSemana', 
              'horarioInicio', 'horarioTermino']),
  put
)

routes.delete('feiras/:feira_id/locais/:id', 
  security(['feira']), 
  destroy
)

module.exports = routes
