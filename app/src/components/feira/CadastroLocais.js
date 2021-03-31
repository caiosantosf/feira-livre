import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Voltar from '../nav/Voltar'
import Paper from '@material-ui/core/Paper'
import Alert from '@material-ui/lab/Alert';
import { api, apiCep } from '../../config/Api';
import { errorApi } from '../../config/HandleErrors'
import { useHistory } from "react-router-dom";

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
    width: '100%'
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
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
}));

export default function CadastroLocais(props) {
  const classes = useStyles();

  const [local, setLocal] = React.useState([])
  const [error, setError] = React.useState([])

  let id = 0
  const { state } = props.location
  if (state) {
    id = state.id
  }

  let history = useHistory()

  const feiraId = sessionStorage.getItem('feiraId')

  const handleCepApi = async () => {
    try {
      const res = await apiCep(local.cep)
      const { data } = res
      if (!data.erro) {
        setLocal({ ...local,
                  logradouro: data.logradouro, 
                  complemento: data.complement,
                  bairro: data.bairro
                })
      }
    } catch (error) {
      setError({cep: "CEP Inválido!"})
    }
  }

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/feiras/${feiraId}/locais/${id}`)

        if (res.status === 200) {
          setLocal(res.data)
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
    if (id) {
      fetchData()
    }
  }, [id, feiraId, history])

  const handleDelete = async () => {
    try {
      setError([])

      const config = { headers :{
        'x-access-token' : sessionStorage.getItem('token'),
      }}

      const res = await api.delete(`/feiras/${feiraId}/locais/${id}`, config)

      if (res.status === 200) {
        history.push('/locais')
      }
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

  const handleSave = async () => {
    try {
      setError([])

      let { id, ...localData } = local

      const config = { headers :{
        'x-access-token' : sessionStorage.getItem('token'),
      }}

      const res = !id ? await api.post(`/feiras/${feiraId}/locais`, localData, config)
                     : await api.put(`/feiras/${feiraId}/locais/${id}`, localData, config)

      if (res.status === 201 || res.status === 200) {
        history.push('/locais')
      }
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

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Voltar titulo="Locais e Horários" pagina="locais"/>
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
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="cep"
                      label="CEP"
                      name="cep"
                      autoComplete="cep"
                      maxLength="8"
                      onBlur={handleCepApi}
                      value={local.cep || ''}
                      onChange={e => {
                        const re = /^[0-9\b]+$/
                        const key = e.target.value
            
                        if (key === '' || re.test(key)) {
                          setLocal({ ...local, cep: e.target.value})
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <TextField
                      autoComplete="logradouro"
                      name="logradouro"
                      fullWidth
                      id="logradouro"
                      label="Endereço"
                      autoFocus
                      value={local.logradouro || ''}
                      onChange={e => {
                        setLocal({ ...local, logradouro: e.target.value})
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      autoComplete="numero"
                      name="numero"
                      fullWidth
                      id="numero"
                      label="Número"
                      autoFocus
                      value={local.numero || ''}
                      onChange={e => {
                        setLocal({ ...local, numero: e.target.value})
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="complemento"
                      name="complemento"
                      fullWidth
                      id="complemento"
                      label="Complemento"
                      autoFocus
                      value={local.complemento || ''}
                      onChange={e => {
                        setLocal({ ...local, complemento: e.target.value})
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="bairro"
                      label="Bairro"
                      name="bairro"
                      autoComplete="bairro"
                      value={local.bairro || ''}
                      onChange={e => {
                        setLocal({ ...local, bairro: e.target.value})
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="horaInicial"
                      label="Hora Inicial"
                      type="time"
                      fullWidth
                      defaultValue="06:00"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 300, // 5 min
                      }}
                      value={local.horarioInicio || ''}
                      onChange={e => {
                        setLocal({ ...local, horarioInicio: e.target.value})
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <TextField
                      id="horaFinal"
                      label="Hora Final"
                      type="time"
                      fullWidth
                      defaultValue="12:00"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 300, // 5 min
                      }}
                      value={local.horarioTermino || ''}
                      onChange={e => {
                        setLocal({ ...local, horarioTermino: e.target.value})
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="select-day">Dia da Semana</InputLabel>
                    <Select
                      fullWidth
                      labelId="select-day"
                      id="select-day"
                      value={local.diaSemana || ''}
                      onChange={e => {
                        setLocal({ ...local, diaSemana: e.target.value})
                      }}
                    >
                      <MenuItem value={'Domingo'}>Domingo</MenuItem>
                      <MenuItem value={'Segunda-Feira'}>Segunda-Feira</MenuItem>
                      <MenuItem value={'Terça-Feira'}>Terça-Feira</MenuItem>
                      <MenuItem value={'Quarta-Feira'}>Quarta-Feira</MenuItem>
                      <MenuItem value={'Quinta-Feira'}>Quinta-Feira</MenuItem>
                      <MenuItem value={'Sexta-Feira'}>Sexta-Feira</MenuItem>
                      <MenuItem value={'Sábado'}>Sábado</MenuItem>
                    </Select>
                  </FormControl>
                  </Grid>
                </Grid>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={() => handleSave()}
                >
                  Salvar
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  className={classes.submit}
                  onClick={() => handleDelete()}
                  style={!id ? {display: 'none'} : {}}
                >
                  Apagar
                </Button>
              </form>
            </div>
          </Paper>
        </Container>
      </div>
    </React.Fragment>
  );
}