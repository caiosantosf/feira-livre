import axios from 'axios'

const apiUrl = 'http://192.168.0.16:3300/'

const api = axios.create({
  baseURL: apiUrl
})

const apiCep = cep => (axios.get(`https://viacep.com.br/ws/${cep}/json/`))
const apiCidades = uf => (axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/distritos`))

export { api, apiCep, apiCidades, apiUrl }