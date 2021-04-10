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
import { api } from '../../config/api';
import Voltar from '../nav/Voltar'
import { errorApi } from '../../config/handleErrors'

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
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
  Alert: {
    marginTop: theme.spacing(10)
  }
}));

export default function Cadastro(props) {
  const classes = useStyles();

  const [usuario, setUsuario] = React.useState({})
  const [error, setError] = React.useState([])

  const { state } = props.location
  let usuarioId = ''
  if (state) {
    usuarioId = state.usuarioId
  }

  let history = useHistory()
  
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/usuarios/${usuarioId}`, 
          { headers :{
            'x-access-token' : sessionStorage.getItem('token')
          }})

        const { data } = res
        delete data.senha

        setUsuario(data)
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
    if (usuarioId) {
      fetchData()
    }
  }, [usuarioId, history])

  const handleSave = async () => {
    try {
      setError([])

      if (usuario.senha !== usuario.senhaConfirm) {
        setError(['Confirmação de Senha está diferente da Senha'])
      } else {
        const { senhaConfirm, id, ...usuarioData } = usuario

        const config = { headers :{
          'x-access-token' : sessionStorage.getItem('token'),
        }}

        let res = ''
        
        if (usuarioId) {
          await api.put(`/usuarios/${id}`, usuarioData, config)

          history.push('/home')
        } else {
          res = await api.post('/usuarios/', usuarioData)
          const { token, id: idCreated } = res.data

          if (token) {
            sessionStorage.setItem('token', token)

            if (idCreated) {
              sessionStorage.setItem('usuarioId', idCreated)
            }

            if (usuario.tipo === 'feira') {
              history.push('/cadastro-feira', {usuarioId: id ? id : idCreated, novo: true})
            } else {
              if (usuario.tipo === 'feirante') {
                history.push('/cadastro-feirante', {usuarioId: id ? id : idCreated, novo: true})
              } else {
                setError(['Não foi selecionado o tipo de usuario!'])
              }
            }
          }
        }
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
        <Voltar titulo="Cadastro" />
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
                    value={usuario.nome || ''}
                    onChange={e => {
                      setUsuario({ ...usuario,
                        nome: e.target.value
                      })
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Endereço de Email"
                    name="email"
                    autoComplete="email"
                    value={usuario.email || ''}
                    onChange={e => {
                      setUsuario({ ...usuario,
                        email: e.target.value
                      })
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Senha"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={usuario.senha || ''}
                    onChange={e => {
                      setUsuario({ ...usuario,
                        senha: e.target.value
                      })
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="passwordConfirm"
                    label="Confirme a Senha"
                    type="password"
                    id="password"
                    autoComplete="confirmation-password"
                    value={usuario.senhaConfirm || ''}
                    onChange={e => {
                      setUsuario({ ...usuario,
                        senhaConfirm: e.target.value
                      })
                    }}
                  />
                </Grid>
                <Grid item xs={12} style={usuarioId ? { display: 'none' } : {}}>
                <FormControl className={classes.formControl}>
                  <InputLabel id="select-tipo">Tipo de Usuário</InputLabel>
                  <Select
                    required
                    fullWidth
                    labelId="select-usuario-tipo"
                    id="select-usuario-tipo"
                    value={usuario.tipo || ''}
                    onChange={e => {
                      setUsuario({ ...usuario,
                        tipo: e.target.value
                      })
                    }}
                  >
                    <MenuItem value={'feira'}>Feira</MenuItem>
                    <MenuItem value={'feirante'}>Feirante</MenuItem>
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
    </React.Fragment>
  );
}