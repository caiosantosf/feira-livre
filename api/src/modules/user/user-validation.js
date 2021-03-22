const validation = (fields) => {
  return (req, res, next) => {
    const { id, nome, email, senha, tipo } = req.body
    const messages = {}
    const regExpNumbers = /^[0-9]+$/
    const regExpEmail = /\S+@\S+\.\S+/

    if (fields.includes('id')) {
      if ( (typeof id !== 'undefined') && (id != 0) ) {
        if (!regExpNumbers.test(id)) {
          messages.id = 'Id deve numérico.'
        }
      } else {
        messages.id = 'O Id é obrigatório.'
      }
    }

    if (fields.includes('nome')) {
      if ( (typeof nome !== 'undefined') && (nome.trim() !== '') ) {
        if (nome.length > 255) {
          messages.nome = 'O Nome não pode ter mais do que 255 caracteres.'
        }
      } else {
        messages.nome = 'O Nome é obrigatório.'
      }
    }

    if (fields.includes('email')) {
      if ( (typeof email !== 'undefined') && (email.trim() !== '') ) {
        if (!regExpEmail.test(email)) {
          messages.email = 'O Email é inválido.'
        }
      } else {
        messages.email = 'O Email é obrigatório.'
      }
    }
    
    if (fields.includes('senha')) {
      if ( (typeof senha !== 'undefined') && (senha.trim() !== '') ) {
        if (senha.length > 8) {
          messages.senha = 'A senha não pode ter mais do que 8 caracteres.'
        }
      } else {
        messages.senha = 'A senha é obrigatória.'
      }
    }

    if (fields.includes('tipo')) {
      if ( (typeof tipo !== 'undefined') && (tipo.trim() !== '') ) {
        if (tipo !== 'feira' && tipo !== 'feirante') {
          messages.senha = 'O Tipo de Usuário é inválido.'
        }
      } else {
        messages.senha = 'O Tipo de Usuário é obrigatório'
      }
    }

    if (Object.keys(messages).length > 0) {
      return res.status(400).json(messages)
    }

    next()
  }
}

module.exports = validation
