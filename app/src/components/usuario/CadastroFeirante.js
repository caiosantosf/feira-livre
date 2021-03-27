import React from 'react';
import { useHistory } from "react-router-dom"
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box';
import { api } from '../../config/api';
import Voltar from '../../components/nav/Voltar'
import { errorApi } from '../../config/handleErrors'
import LoadingOverlay from 'react-loading-overlay';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', 
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    width: '100%'
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
}));

export default function CadastroFeirante(props) {
  const classes = useStyles();

  const { state } = props.location
  let usuarioId = ''
  let novo = false
  if (state) {
    usuarioId = state.usuarioId
    novo = state.novo
  }

  const [cidades, setCidades] = React.useState([])
  const [estados, setEstados] = React.useState([])
  const [feiras, setFeiras] = React.useState([])
  const [feirante, setFeirante] = React.useState({})
  const [error, setError] = React.useState([])
  const [isActive, setisActive] = React.useState(false)

  let history = useHistory()

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/feiras/estados/')
        if (res.status === 200) {
          setEstados(res.data)
        }
      } catch (error) {
        alert(error)
      }
    }
    fetchData()
  }, [])

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const resFeirantes = await api.get('/feirantes/', 
          { headers :{
            'x-access-token' : sessionStorage.getItem('token'),
            'usuarioId' : usuarioId
          }})

        if (resFeirantes.status === 200) {
          const data = resFeirantes.data[0]
          const resFeira = await api.get(`/feiras/${data.feiraId}`, 
            { headers :{
              'x-access-token' : sessionStorage.getItem('token'),
              'usuarioId' : usuarioId
            }})
          
          data.estado = resFeira.data.estado
          data.cidade = resFeira.data.cidade

          handleGetCidades(resFeira.data.estado)
          
          setisActive(true)
          const resFeiras = await api.get('/feiras/', 
          { headers :{
            'x-access-token' : sessionStorage.getItem('token'),
            'cidade' : resFeira.data.cidade,
            'estado' : resFeira.data.estado,
          }})
          const { data: dataFeiras } = resFeiras
          if (dataFeiras.length) {
            const feirasAux = []
            for (const feira of dataFeiras) {
              feirasAux.push(feira)
            }
            setFeiras(feirasAux)
          }
          setisActive(false)

          setFeirante(data)
        }
      } catch (error) {
        const errorHandled = errorApi(error)
        if (errorHandled.forbidden) {
          history.push('/')
        } else {
          if (errorHandled.general) {
            setError([errorHandled.error])
          }
        }
      }
    }
    if (!novo) {
      fetchData()
    }
  }, [usuarioId, history, novo])

  const handleSave = async () => {
    try {
      setError([])

      let { id, cidade, estado, ...feiranteData } = feirante
      feiranteData = { ...feiranteData, usuarioId }

      const config = { headers :{
        'x-access-token' : sessionStorage.getItem('token'),
      }}

      const res = id ? await api.put(`/feirantes/${id}`, feiranteData, config)
                     : await api.post('/feirantes/', feiranteData, config)

      const { id: idCreated } = res.data

      sessionStorage.setItem('tipo', 'feirante')
      sessionStorage.setItem('feiranteId', idCreated)
      sessionStorage.setItem('usuarioId', usuarioId)

      history.push('/home')
    } catch (error) {
      const errorHandled = errorApi(error)
      if (errorHandled.general) {
        setError([errorHandled.error])
      } else {
        let errorMessage = []
        Object.keys(errorHandled.error).forEach(function(key, i) {
          errorMessage.push(errorHandled.error[key])
        })
        setError(errorMessage)
      }
    }
  }

  const handleGetCidades = async (estado) => {
    try {
      setisActive(true)
      const res = await api.get(`/feiras/estados/${estado}/cidades`)
      if (res.status === 200) {
        setCidades(res.data)
      }
      setisActive(false)
    } catch (error) {
      setisActive(false)
      const errorHandled = errorApi(error)
      if (errorHandled.general) {
        setError([errorHandled.error])
      } else {
        let errorMessage = []
        Object.keys(errorHandled.error).forEach(function(key, i) {
          errorMessage.push(errorHandled.error[key])
        })
        setError(errorMessage)
      }
    }
  }

  const handleGetFeiras = async (cidade) => {
    try {
      setisActive(true)
      const res = await api.get('/feiras/', 
      { headers :{
        'x-access-token' : sessionStorage.getItem('token'),
        'cidade' : cidade,
        'estado' : feirante.estado,
      }})
      const { data } = res
      if (data.length) {
        const feirasAux = []
        for (const feira of data) {
          feirasAux.push(feira)
        }
        setFeiras(feirasAux)
      }
      setisActive(false)
    } catch (error) {
      setisActive(false)
      const errorHandled = errorApi(error)
      if (errorHandled.general) {
        setError([errorHandled.error])
      } else {
        let errorMessage = []
        Object.keys(errorHandled.error).forEach(function(key, i) {
          errorMessage.push(errorHandled.error[key])
        })
        setError(errorMessage)
      }
    }
  }

  return (
    <React.Fragment>
      <LoadingOverlay
        active={isActive}
        spinner
        text='Carregando...'
        >
      <div className={classes.root}>
        <Voltar titulo="Dados do Feirante" />
        <Container component="main" maxWidth="false">
          <Paper className="paperApp" elevation={3}>
            <CssBaseline />
            <div className={classes.paper}>
            <form className={classes.form} noValidate>
              <Alert severity="error" style={error.length ? { display: 'flex'} : { display : 'none' }}>
                {error.map((err, i) => {
                  return (
                    <React.Fragment> {i ? <br /> : ''} {err} </React.Fragment>
                  )
                })}
              </Alert>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    autoComplete="fname"
                    name="nome"
                    required
                    fullWidth
                    id="nome"
                    label="Nome"
                    autoFocus
                    value={feirante.nome || ''}
                    onChange={e => {
                      setFeirante({ ...feirante,
                        nome: e.target.value
                      })
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="descricao"
                    label="Descrição"
                    name="descricao"
                    autoComplete="descricao"
                    value={feirante.descricao || ''}
                    onChange={e => {
                      setFeirante({ ...feirante,
                        descricao: e.target.value
                      })
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="select-estado">Estado</InputLabel>
                    <Select
                      required
                      fullWidth
                      labelId="select-estado"
                      value={feirante.estado || ''}
                      onChange={e => {
                        handleGetCidades(e.target.value)
                        setFeirante({ ...feirante,
                          estado: e.target.value
                        })
                      }}
                    >
                      {estados.map(estado => {
                        return (
                        <MenuItem key={estado.estado} value={estado.estado}>{estado.estado}</MenuItem>
                      )})}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="select-cidade">Cidade</InputLabel>
                    <Select
                      required
                      fullWidth
                      labelId="select-cidade"
                      value={feirante.cidade || ''}
                      onChange={e => {
                        handleGetFeiras(e.target.value)
                        setFeirante({ ...feirante,
                          cidade: e.target.value
                        })
                      }}
                    >
                      {cidades.map((cidade, i) => {
                        return (<MenuItem key={i} value={cidade.cidade}>{cidade.cidade}</MenuItem>)
                      })}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="select-feira">Feira</InputLabel>
                    <Select
                      required
                      fullWidth
                      labelId="select-feira"
                      value={feirante.feiraId || ''}
                      onChange={e => {
                        setFeirante({ ...feirante,
                          feiraId: e.target.value
                        })
                      }}
                    >
                      {feiras.map((feira, i) => {
                        return (<MenuItem key={i} value={feira.id}>{feira.nome}</MenuItem>)
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                
              </Grid>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSave}
              >
                Salvar
              </Button>
            </form>
          </div>
          </Paper>
        </Container>  
      </div>
      </LoadingOverlay>
    </React.Fragment>
  );
}