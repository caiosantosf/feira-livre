const db = require('../../../database/connection')

module.exports = {
  async getManyWithFeiraId (req, res) {
    const { feiraId } = req.params
    const produtos = await db('feiranteProdutos')
                            .join('feirante', 'feiranteProdutos.feiranteId', '=', 'feirante.id')
                            .where({ 'feirante.feiraId': feiraId })
                            .select('feiranteProdutos.nome', 'feiranteProdutos.descricao', 'feiranteProdutos.unidadeMedida', 
                                    'feiranteProdutos.imagemUrl', 'feiranteProdutos.feiranteId', 'feiranteProdutos.valor')
                            .orderBy('feiranteProdutos.descricao')
                        
    if (produtos.length) {
      produtos.forEach(produto => {
        produto.imagemUrl = `${req.protocol}://${req.get('host')}/uploads/${produto.imagemUrl}`
      })

      return res.status(200).json(produtos)
    }

    return res.status(204).json({ message: 'Não foi encontrado nenhum produto' })
  },

  async getManyWithFeiranteId (req, res) {
    const { feiranteId } = req.params
    const produtos = await db('feiranteProdutos')
                            .where({ feiranteId })
                            .orderBy('descricao')
                        
    if (produtos.length) {
      produtos.forEach(produto => {
        produto.imagemUrl = `${req.protocol}://${req.get('host')}/uploads/${produto.imagemUrl}`
      })
      return res.status(200).json(produtos)
    }

    return res.status(204).json({ message: 'Não foi encontrado nenhum produto' })
  },

  async getOne (req, res) {
    const { id } = req.params
    const produto = await db('feiranteProdutos').where({ id })

    if (feirante.length) {
      return res.status(200).json(feirante[0])
    }
    return res.status(204).json({ message: 'Produto não encontrado'})
  },

  async post (req, res) {
    const data = req.body
    data.senha = await encrypt(data.senha)

    try {
      const id = await db('feiranteProdutos').insert(data).returning('id')
      return res.status(201).json({ id: id[0] })
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
      const result = await db('feiranteProdutos').where({ id }).update({ id, ...data })
      if (result) {
        return res.status(200).json({ message : 'Produto alterado'})
      }
      return res.status(204).json({ message: 'Produto não encontrato'})
    } catch (error) {
      return res.status(500).json(error)     
    }
  },

  async destroy (req, res) {
    const { id } = req.params
    const result = await db('feiranteProdutos').where({ id }).del()

    if (result) {
      return res.status(200).json({ message: 'Produto excluído'})
    }
    return res.status(204).json({ message: 'Produto não encontrato'})
  }
}
