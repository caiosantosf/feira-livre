const express = require('express')
const { getMany, post, destroy, getOne, put } = require('./feirante-controller')
const { routeSecurity : security } = require('../../config/security')
const validation = require('./feirante-validation')

const routes = express.Router()

routes.get('/feiras/:feira_id/feirantes',
  getMany
)

routes.post('/feirantes', 
  post
)

routes.get('/feirantes/:id',
  getOne
)

routes.put('/feirantes/:id', 
  security(['feirante']), 
  validation(['descricao']),
  put
)

routes.delete('/feirantes/:id', 
  security(['feirante']), 
  destroy
)

module.exports = routes
