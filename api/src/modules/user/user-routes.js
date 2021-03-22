const express = require('express')
const { auth, getMany, post, destroy, getOne, put, emailResetSenha } = require('./user-controller')
const { routeSecurity : security } = require('../../config/security')
const validation = require('./user-validation')

const routes = express.Router()

routes.post('/usuarios/login', 
  validation(['email', 'senha']), 
  auth
)

routes.post('/usuarios/login/emailresetsenha',
  validation(['email']), 
  emailResetSenha
)

routes.patch('/usuarios/login/resetsenha/:id', 
  security(['feira', 'feirante']), 
  validation(['senha']), 
  put
)

routes.post('/usuarios', 
  validation(['nome', 'email', 'senha', 'tipo']), 
  post
)

routes.get('/usuarios/:id', 
  security(['feira', 'feirante']), 
  getOne
)

routes.put('/usuarios/:id', 
  security(['feira', 'feirante']), 
  validation(['nome', 'email', 'senha', 'tipo']), 
  put
)

routes.delete('/usuarios/:id', 
  security(['feira', 'feirante']), 
  destroy
)

module.exports = routes
