const validation = (fields) => {
  return (req, res, next) => {
    const { id, desricao } = req.body
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

    if (fields.includes('desricao')) {
      if ( (typeof desricao !== 'undefined') && (desricao.trim() !== '') ) {
        if (desricao.length > 255) {
          messages.desricao = 'A descrição não pode ter mais do que 255 caracteres'
        }
      } else {
        messages.desricao = 'A descrição é obrigatório'
      }
    }

    if (Object.keys(messages).length > 0) {
      return res.status(400).json(messages)
    }

    next()
  }
}

module.exports = validation
