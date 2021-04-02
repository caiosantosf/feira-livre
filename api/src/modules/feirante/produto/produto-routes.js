const express = require('express')
const { getManyWithFeiraId, getManyWithFeiranteId, post, destroy, getOne, put, patchImage } = require('./produto-controller')
const { routeSecurity : security } = require('../../../config/security')
const validation = require('./produto-validation')
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

routes.get('/feirantes/:feiranteId/produtos',
  getManyWithFeiranteId
)

routes.get('/feiras/:feiraId/feirantes/produtos',
  getManyWithFeiraId
)

routes.post('/feirantes/:feiranteId/produtos', 
  security(['feirante']),
  validation(['descricao', 'imagemUrl', 'valor', 'unidadeMedida']), 
  post
)

routes.get('/feirantes/:feiranteId/produtos/:id',
  getOne
)

routes.put('/feirantes/:feiranteId/produtos/:id', 
  security(['feirante']), 
  validation(['descricao', 'imagemUrl', 'valor', 'unidadeMedida']),
  put
)

routes.delete('/feirantes/:feiranteId/produtos/:id', 
  security(['feirante']), 
  destroy
)

routes.patch('/feirantes/:feiranteId/produtos/:id', 
  upload.single('file'),
  patchImage
)

module.exports = routes
