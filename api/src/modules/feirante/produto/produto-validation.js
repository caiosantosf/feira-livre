const validation = (fields) => {
  return (req, res, next) => {
    const { id, name, descricao, imagemUrl, valor } = req.body
    const messages = {}
    const regExpNumbers = /^[0-9]+$/

    if (fields.includes('id')) {
      if ( (typeof id !== 'undefined') && (id != 0) ) {
        if (!regExpNumbers.test(id)) {
          messages.id = 'Id deve numérico'
        }
      } else {
        messages.id = 'O Id é obrigatório'
      }
    }

    if (fields.includes('descricao')) {
      if ( (typeof descricao !== 'undefined') && (descricao.trim() !== '') ) {
        if (descricao.length > 255) {
          messages.descricao = 'A Descrição não pode ter mais do que 255 caracteres'
        }
      } else {
        messages.descricao = 'A Descrição é obrigatório'
      }
    }

    if (fields.includes('valor')) {
      if (typeof valor !== 'undefined') {
        if (isNaN(valor)) {
          messages.valor = 'O valor não é valido'
        }
      } else {
        messages.valor = 'O valor de ida é obrigatório'
      }
    }

    if (Object.keys(messages).length > 0) {
      return res.status(400).json(messages)
    }

    next()
  }
}

module.exports = validation
