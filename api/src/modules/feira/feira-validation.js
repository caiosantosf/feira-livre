const validation = (fields) => {
  return (req, res, next) => {
    const { nome, id, descricao, cidade, estado } = req.body
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

    if (fields.includes('nome')) {
      if ( (typeof nome !== 'undefined') && (nome.trim() !== '') ) {
        if (nome.length > 255) {
          nome.nome = 'O Nome não pode ter mais do que 255 caracteres'
        }
      } else {
        messages.nome = 'O Nome é obrigatória'
      }
    }

    if (fields.includes('descricao')) {
      if ( (typeof descricao !== 'undefined') && (descricao.trim() !== '') ) {
        if (descricao.length > 255) {
          messages.descricao = 'A Descrição não pode ter mais do que 255 caracteres'
        }
      } else {
        messages.descricao = 'A Descrição é obrigatória'
      }
    }

    if (fields.includes('cidade')) {
      if ( (typeof cidade !== 'undefined') && (cidade.trim() !== '') ) {
        if (cidade.length > 255) {
          messages.cidade = 'A Cidade não pode ter mais do que 255 caracteres'
        }
      } else {
        messages.cidade = 'A Cidade é obrigatória'
      }
    }

    if (fields.includes('estado')) {
      if ( (typeof estado !== 'undefined') && (estado.trim() !== '') ) {
        if (estado.length !== 2) {
          messages.estado = 'O Estado deve ter 2 caracteres'
        }
      } else {
        messages.estado = 'O Estado é obrigatório'
      }
    }

    next()
  }
}

module.exports = validation
