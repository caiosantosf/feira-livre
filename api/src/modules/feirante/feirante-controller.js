const db = require('../../database/connection')

module.exports = {
  async getMany (req, res) {
    const { feiraId, confirmado } = req.headers
    const feirantes = await db('feirantes')
                            .modify(q => { if (feiraId) q.where({ feiraId }) })
                            .modify(q => { if (confirmado) q.where({ confirmado }) })
                            .join('usuarios', 'usuarios.id', 'feirantes.usuarioId')
                            .select('feirantes.*', 'usuarios.nome as nomeUsuario')
                            .orderBy('descricao')
                        
    if (feirantes.length) {
      return res.status(200).json(feirantes)
    }

    return res.status(204).json({ message: 'Não foi encontrada nenhum feirante' })
  },

  async getOne (req, res) {
    const { id } = req.params
    const feirante = await db('feirantes')
                            .where({ id })
                            .join('usuarios', 'usuarios.id', 'feirantes.usuarioId')
                            .select('feirantes.*', 'usuarios.nome as nomeUsuario')

    if (feirante.length) {
      return res.status(200).json(feirante[0])
    }
    return res.status(204).json({ message: 'Feirante não encontrado'})
  },

  async post (req, res) {
    const data = req.body

    data.confirmado = false

    try {
      const id = await db('feirantes').insert(data).returning('id')
      return res.status(201).json({ id: id[0] })
    } catch (error) {
      return res.status(500).json(error)
    }
  },

  async put (req, res) {
    const { id } = req.params
    const data = req.body

    try {
      const result = await db('feirantes').where({ id }).update({ id, ...data })
      if (result) {
        return res.status(200).json({ message : 'Feirante alterado'})
      }
      return res.status(204).json({ message: 'Feriante não encontrato'})
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
    return res.status(204).json({ message: 'Feirante não encontrato'})
  }
}
