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
import Copyright from '../../components/nav/copyright'
import { api } from '../../config/api';
import Voltar from '../../components/nav/voltar'
import { errorApi } from '../../config/handleErrors'

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
    width: '100%', // Fix IE 11 issue.
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

  const [user, setUser] = React.useState({})
  const [error, setError] = React.useState([])

  const { state } = props.location
  let user_id = ''
  if (state) {
    user_id = state.user_id
  }

  let history = useHistory()
  
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/users/${user_id}`, 
          { headers :{
            'x-access-token' : sessionStorage.getItem('token')
          }})

        const { data } = res
        delete data.password

        setUser(data)
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
    if (user_id) {
      fetchData()
    }
  }, [user_id, history])

  const handleSave = async () => {
    try {
      setError([])

      if (user.password !== user.passwordConfirm) {
        setError(['Confirmação de Senha está diferente da Senha'])
      } else {
        const { passwordConfirm, id, ...userData } = user

        const config = { headers :{
          'x-access-token' : sessionStorage.getItem('token'),
        }}

        let res = ''
        
        if (user_id) {
          await api.put(`/users/${id}`, userData, config)

          history.push('/home')
        } else {
          res = await api.post('/users/', userData)
          const { token, id: idCreated } = res.data

          if (token) {
            sessionStorage.setItem('token', token)
            sessionStorage.setItem('user_id', idCreated)
            if (user.tipo === 'feira') {
              history.push('/cadastro-feira', {user_id: id ? id : idCreated})
            } else {
              if (user.tipo === 'feirante') {
                history.push('/cadastro-feirante', {user_id: id ? id : idCreated})
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
                    value={user.nome || ''}
                    onChange={e => {
                      setUser({ ...user,
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
                    value={user.email || ''}
                    onChange={e => {
                      setUser({ ...user,
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
                    value={user.password || ''}
                    onChange={e => {
                      setUser({ ...user,
                        password: e.target.value
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
                    value={user.passwordConfirm || ''}
                    onChange={e => {
                      setUser({ ...user,
                        passwordConfirm: e.target.value
                      })
                    }}
                  />
                </Grid>
                <Grid item xs={12} style={user_id ? { display: 'none' } : {}}>
                <FormControl className={classes.formControl}>
                  <InputLabel id="select-tipo">Tipo de Usuário</InputLabel>
                  <Select
                    required
                    fullWidth
                    labelId="select-user-tipo"
                    id="select-user-tipo"
                    value={user.tipo || ''}
                    onChange={e => {
                      setUser({ ...user,
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
            <Box mt={8}>
              <Copyright />
            </Box>
          </div>
          </Paper>
        </Container>  
      </div>
    </React.Fragment>
  );
}