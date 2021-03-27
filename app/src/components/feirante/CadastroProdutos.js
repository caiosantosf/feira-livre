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

export default function CadastroProdutos(props) {
  const classes = useStyles();

  const [usuario, setUsuario] = React.useState({})
  const [error, setError] = React.useState([])
	
  const [usertype, setUsertype] = React.useState('');

  const handleChange = (event) => {
    setUsertype(event.target.value);
  };
	
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
            sessionStorage.setItem('usuarioId', idCreated)
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
              <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="nomeProduto"
                    label="Nome do Produto"
                    name="nomeProduto"
                    autoComplete="nomeProduto"
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <TextField
                    name="preco"
                    required
                    fullWidth
                    id="preco"
                    label="Preço"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="select-unidade">Unidade de Medida</InputLabel>
                    <Select
                      required
                      fullWidth
                      labelId="select-unidade"
                      id="select-unidade"
                      value={usertype}
                      onChange={handleChange}
                    >
                      <MenuItem value={1}>Kilo</MenuItem>
                      <MenuItem value={2}>100 Gramas</MenuItem>
                      <MenuItem value={3}>Unidade</MenuItem>
                      <MenuItem value={4}>Dúzia</MenuItem>
                      <MenuItem value={5}>Metro</MenuItem>
                      <MenuItem value={6}>Litro</MenuItem>
                      <MenuItem value={7}>ML</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Cadastrar
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
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
