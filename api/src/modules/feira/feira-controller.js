const db = require('../../database/connection')

module.exports = {
  async getMany (req, res) {
    const { cidade, estado, usuarioId } = req.headers
    const feiras = await db('feiras')
                          .modify(q => { if (cidade) q.where({ cidade }) })
                          .modify(q => { if (estado) q.where({ estado }) })
                          .modify(q => { if (usuarioId) q.where({ usuarioId }) })
                          .orderBy('descricao')

    if (feiras.length) {
      return res.status(200).json(feiras)
    }

    return res.status(204).json({ message: 'Não existem feiras cadastradas' })
  },

  async getEstados (req, res) {
    const estados = await db('feiras')
                          .select('estado')
                          .groupBy('estado')
                          .orderBy('estado')

    if (estados.length) {
      return res.status(200).json(estados)
    }

    return res.status(204).json({ message: 'Não existem feiras cadastradas' })
  },

  async getCidades (req, res) {
    const { estado } = req.params

    const cidades = await db('feiras')
                          .select('cidade')
                          .where({ estado })
                          .groupBy('cidade')
                          .orderBy('cidade')

    if (cidades.length) {
      return res.status(200).json(cidades)
    }

    return res.status(204).json({ message: 'Não existem feiras cadastradas' })
  },

  async getOne (req, res) {
    const { id } = req.params
    const feira = await db('feiras')

    if (feira.length) {
      return res.status(200).json(feira[0])
    }
    return res.status(404).json({ message: 'feira não encontrada'})
  },

  async post (req, res) {
    const data = req.body

    try {
      const id = await db('feiras').insert(data).returning('id')
      return res.status(201).json({ id: id[0] })
    } catch (error) {
      return res.status(500).json(error)
    }
  },

  async put (req, res) {
    const { id } = req.params
    const data = req.body

    try {
      const result = await db('feiras').where({ id }).update({ id, ...data })
      if (result) {
        return res.status(200).json({ message : 'feira alterada' })
      }
      return res.status(404).json({ message: 'feira não encontrada' })
    } catch (error) {
      return res.status(500).json(error)     
    }
  },

  async destroy (req, res) {
    const { id } = req.params
    const result = await db('feiras').where({ id }).del()

    if (result) {
      return res.status(200).json({ message: 'feira excluída' })
    }
    return res.status(404).json({ message: 'feira não encontrada' })
  },

  async patchImage (req, res) {
    const { id } = req.params
    
    const { filename : imagemUrl} = req.file
    
    try {
      const result = await db('feiras').where({ id }).update({ imagemUrl })
      if (result) {
        return res.status(200).json({ message : 'Imagem salva com sucesso'})
      }
      return res.status(404).json({ message: 'Feira não encontrada'})
    } catch (error) {
      return res.status(500).json({ message: 'Erro não conhecido'})
    }
  },
}
