const db = require('../../database/connection')

module.exports = {
  async getMany (req, res) {
    const { currentPage } = req.headers
    const feirantes = await db('feirantes')
                          .orderBy('descricao')
                          .paginate({ perPage: 10, currentPage, isLengthAware: true  })

    if (feirantes.hasOwnProperty('data')) {
      if (feirantes.data.length) {
        return res.status(200).json(feirantes)
      }
    }
    return res.status(204).json({ message: 'Não existem feirantes cadastrados' })
  },

  async getOne (req, res) {
    const { id } = req.params
    const feirante = await db('feirantes').where({ id })

    if (feirante.length) {
      return res.status(200).json(feirante[0])
    }
    return res.status(404).json({ message: 'Feirante não encontrado'})
  },

  async post (req, res) {
    const data = req.body
    data.password = await encrypt(data.password)

    try {
      const id = await db('feirantes').insert(data).returning('id')
      return res.status(201).json({ id: id[0] })
    } catch (error) {
      const message = dbErrors(error)
      return res.status(400).json(message)
    }
  },

  async put (req, res) {
    const { id } = req.params
    const data = req.body
    data.password = await encrypt(data.password)
    try {
      const result = await db('feirantes').where({ id }).update({ id, ...data })
      if (result) {
        return res.status(200).json({ message : 'Feirante alterado'})
      }
      return res.status(404).json({ message: 'Feriante não encontrato'})
    } catch (error) {
      return res.status(500).json(error)     
    }
  },

  async destroy (req, res) {
    const { id } = req.params
    const result = await db('feirantes').where({ id }).del()

    if (result) {
      return res.status(200).json({ message: 'Feirante excluído'})
    }
    return res.status(404).json({ message: 'Feirante não encontrato'})
  }
}
