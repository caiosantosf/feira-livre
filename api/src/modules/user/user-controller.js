const db = require('../../database/connection')
const { encrypt, compareCrypt, token } = require('../../config/security')
//const sendMail = require('../../../config/email')

const dbErrors = error => {
  let message = { message : 'Ocorreu um erro não identificado', error}
  if (error.hasOwnProperty('constraint')) {
    if (error.constraint === 'usuarios_email_unique') {
      message = { email : 'Email já cadastrado!' }
    }
  }
  return message
}

module.exports = {
  async auth (req, res) {
    const { email , senha : reqSenha } = req.body
    const usuario = await db('usuarios').where({ email })

    if (usuario.length) {
      const { id , senha: dbSenha, tipo } = usuario[0]
      
      if (await compareCrypt(reqSenha, dbSenha)) {

        let feiraId = 0
        const feira = await db('feiras').where({ usuarioId: id })
        if (feira.length) {
          feiraId = feira[0].id
        }
        
        let feiranteId = 0
        const feirante = await db('feirantes').where({ usuarioId: id })
        if (feirante.length) {
          feiranteId = feirante[0].id
        }
        
        return res.status(200).json({ auth: true, token: token(id, tipo), id, tipo, feiraId, feiranteId })
      }
      return res.status(400).json({ senha: 'Senha inválida' })
    }
    return res.status(204).json({ email: 'Email não cadastrado' })
  },

  async getMany (req, res) {
    const usuarios = await db('usuarios')
                          .whereNot({ 'name' : 'admin'})
                          .orderBy('name')

    if (usuarios.hasOwnProperty('data')) {
      if (usuarios.data.length) {
        return res.status(200).json(usuarios)
      }
    }
    return res.status(204).json({ message: 'Não existem usuários cadastrados' })
  },

  async getOne (req, res) {
    const { id } = req.params
    const usuario = await db('usuarios').where({ id })

    if (usuario.length) {
      return res.status(200).json(usuario[0])
    }
    return res.status(204).json({ message: 'Usuário não encontrato'})
  },

  async post (req, res) {
    const data = req.body
    data.senha = await encrypt(data.senha)

    try {
      const id = await db('usuarios').insert(data).returning('id')
      return res.status(201).json({ id: id[0], tipo: data.tipo, token: token(id[0], data.tipo), tipo: data.tipo })
    } catch (error) {
      const message = dbErrors(error)
      return res.status(400).json(message)
    }
  },

  async put (req, res) {
    const { id } = req.params
    const data = req.body
    data.senha = await encrypt(data.senha)
    try {
      const result = await db('usuarios').where({ id }).update({ id, ...data })
      if (result) {
        return res.status(200).json({ message : 'Usuário alterado'})
      }
      return res.status(204).json({ message: 'Usuário não encontrato'})
    } catch (error) {
      const message = dbErrors(error)
      return res.status(500).json(message)     
    }
  },

  async emailResetSenha (req, res) {
    const { email } = req.body
    const usuario = await db('usuarios').where({ email })
    
    if (usuario.length) {
      const { id } = usuario[0]
      const domain = process.env.APP_LOCATION
      const link = `${domain}redefine-senha/${id}?token=${token(id)}`
      //if (await sendMail(email, link)) {
        //return res.status(200).json({ email: 'Enviamos um link de recuperação de senha para o seu email. Verifique se não foi para o Spam ou lixo eletrônico'})
      //}
      return res.status(400).json({ email: 'Houve um problema ao enviar o email de recuperação de senha. Contate a empresa.'})
    }
    return res.status(204).json({ email: 'Não foi encontrato nenhum Usuário com esse email'})
    
  },

  async destroy (req, res) {
    const { id } = req.params
    const result = await db('usuarios').where({ id }).del()

    if (result) {
      return res.status(200).json({ message: 'Usuário excluído'})
    }
    return res.status(204).json({ message: 'Usuário não encontrato'})
  }
}
