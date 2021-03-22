const db = require('../../../database/connection')

module.exports = {

  async getMany (req, res) {
    const { feiraId } = req.params

    let locais = await db('feiraLocais')
                          .where('feiraId', feiraId)
                          .orderBy('id', 'desc')
                          
    if (locais.length) {
      return res.status(200).json(locais)
    }

    return res.status(204).json({ message: 'Não existem locais cadastrados' })
  },

  async getOne (req, res) {
    const { id } = req.params
    let local = await db('feiraLocais').where({ id })

    if (local.length) {      
      return res.status(200).json(local[0])
    }
    return res.status(404).json({ message: 'Local não encontrados'})
  },

  async post (req, res) {
    const data = req.body
    const { feiraId } = req.params

    data.feiraId = feiraId

    try {
      const id = await db('feiraLocais').insert(data).returning('id')
      
      if (id) {
        return res.status(201).json({ id: id[0] })
      }

      return res.status(500).json({message: 'Ocorreu um erro inesperado'})
    } catch (error) {
      return res.status(500).json(error)
    }
  },

  async put (req, res) {
    const { id, feiraId } = req.params
    const data = req.body

    data.feiraId = feiraId

    try {
      const result = await db('feiraLocais').where({ id }).update({ id, ...data })

      if (result) {
        return res.status(200).json({ message : 'Local salvo com sucesso'})
      }

      return res.status(404).json({ message: 'Local não encontrado'})
    } catch (error) {
      return res.status(500).json(error)
    }
  },

  async destroy (req, res) {
    const { id } = req.params
    const result = await db('feiraLocais').where({ id }).del()

    if (result) {
      return res.status(200).json({ message: 'Local excluído com sucesso'})
    }
    return res.status(404).json({ message: 'Local não encontrado'})
  }
}
