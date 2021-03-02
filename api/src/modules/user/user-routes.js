const express = require('express')
const { auth, getMany, post, destroy, getOne, put, emailResetPassword } = require('./user-controller')
const { routeSecurity : security } = require('../../config/security')
const validation = require('./user-validation')

const routes = express.Router()

routes.post('/users/login', 
  validation(['email', 'password']), 
  auth
)

routes.post('/users/login/emailresetpassword',
  validation(['email']), 
  emailResetPassword
)

routes.patch('/users/login/resetpassword/:id', 
  security(['feira', 'feirante']), 
  validation(['password']), 
  put
)

routes.post('/users', 
  validation(['nome', 'email', 'password']), 
  post
)

routes.get('/users/:id', 
  security(['feira', 'feirante']), 
  getOne
)

routes.put('/users/:id', 
  security(['feira', 'feirante']), 
  validation(['nome', 'email', 'password']), 
  put
)

routes.delete('/users/:id', 
  security(['feira', 'feirante']), 
  destroy
)

module.exports = routes
