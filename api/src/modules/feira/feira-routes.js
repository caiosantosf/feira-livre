const express = require('express')
const { getMany, post, destroy, getOne, put, getEstados, getCidades, patchImage } = require('./feira-controller')
const { routeSecurity : security } = require('../../config/security')
const validation = require('./feira-validation')
const multer = require("multer")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Math.floor(Math.random() * 100000000) + file.originalname)
  }
})

const upload = multer({ storage })

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

routes.patch('/feiras/image/:id', 
  //security([ 'feira' ]),
  upload.single('file'),
  patchImage
)

module.exports = routes
