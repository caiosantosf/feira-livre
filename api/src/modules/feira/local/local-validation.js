const validation = (fields) => {
  return (req, res, next) => {
    const { id, cep, logradouro, numero, complemento, bairro, diaSemana, horarioInicio, horarioTermino } = req.body
    const messages = {}
    const regExpNumbers = /^[0-9]+$/
    const regExpTime = /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/


    if (fields.includes('id')) {
      if ( (typeof id !== 'undefined') && (id != 0) ) {
        if (!regExpNumbers.test(id)) {
          messages.id = 'Id deve numérico'
        }
      } else {
        messages.id = 'O Id é obrigatório'
      }
    }

    if (fields.includes('cep')) {
      if ( (typeof cep !== 'undefined') && (cep.trim() !== '') ) {
        if (cep.length !== 8) {
          messages.cep = 'O CEP deve ter 8 caracteres'
        }

        if (!regExpNumbers.test(cep)) {
          messages.cep = 'O CEP deve ser numérico'
        }
      } else {
        messages.cep = 'O CEP é obrigatória'
      }
    }

    if (fields.includes('logradouro')) {
      if ( (typeof logradouro !== 'undefined') && (logradouro.trim() !== '') ) {
        if (logradouro.length > 255) {
          messages.logradouro = 'O Endereço não pode ter mais do que 255 caracteres'
        }
      } else {
        messages.logradouro = 'O Endereço é obrigatória'
      }
    }

    if (fields.includes('numero')) {
      if ( (typeof numero !== 'undefined') && (numero !== 0) ) {
        if (numero.length > 8) {
          messages.numero = 'A senha não pode ter mais do que 8 caracteres'
        }

        if (!regExpNumbers.test(numero)) {
          messages.numero = 'O Número deve ser numérico'
        }
      } else {
        messages.numero = 'O Número é obrigatório'
      }
    }

    if (fields.includes('complemento')) {
      if ( (typeof complemento !== 'undefined') && (complemento.trim() !== '') ) {
        if (complemento.length > 255) {
          messages.complemento = 'O Complemento não pode ter mais do que 255 caracteres'
        }
      } else {
        messages.complemento = 'O Complemento é obrigatório'
      }
    }

    if (fields.includes('bairro')) {
      if ( (typeof bairro !== 'undefined') && (bairro.trim() !== '') ) {
        if (bairro.length > 255) {
          messages.bairro = 'O Bairro não pode ter mais do que 255 caracteres'
        }
      } else {
        messages.bairro = 'O Bairro é obrigatório'
      }
    }

    if (Object.keys(messages).length > 0) {
      return res.status(400).json(messages)
    }

    if (fields.includes('diaSemana')) {
      if ( (typeof diaSemana !== 'undefined') && (id != 0) ) {
        if (!regExpNumbers.test(diaSemana)) {
          messages.diaSemana = 'O dia da semana não é válido'
        }
      } else {
        messages.diaSemana = 'O dia da semana é obrigatório'
      }
    }

    if (fields.includes('horarioInicio')) {
      if ( (typeof horarioInicio !== 'undefined') && (id != 0) ) {
        if (!regExpTime.test(horarioInicio)) {
          messages.horarioInicio = 'O Horário de Início não é válido'
        }
      } else {
        messages.horarioInicio = 'O Horário de Início é obrigatório'
      }
    }
    
    if (fields.includes('horarioTermino')) {
      if ( (typeof horarioTermino !== 'undefined') && (id != 0) ) {
        if (!regExpTime.test(horarioTermino)) {
          messages.horarioInicio = 'O Horário de Termino não é válido'
        }
      } else {
        messages.horarioInicio = 'O Horário de Termino é obrigatório'
      }
    }

    next()
  }
}

module.exports = validation
