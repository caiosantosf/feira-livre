import { useHistory } from "react-router-dom"
import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper'
import Voltar from '../nav/Voltar'
import { api } from '../../config/api';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', 
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
}));

export default function Login() {
  const classes = useStyles()

  const [error, setError] = React.useState({})
  const [auth, setAuth] = React.useState({})

  let history = useHistory()

  const handleAuth = async () => {
    try {
      setError({})
      const res = await api.post('/usuarios/login/', auth)
      const { token, id, tipo, feiraId, feiranteId } = res.data

      sessionStorage.setItem('usuarioId', id)
      sessionStorage.setItem('feiraId', feiraId)
      sessionStorage.setItem('feiranteId', feiranteId)
      sessionStorage.setItem('token', token)
      sessionStorage.setItem('tipo', tipo)
      
      history.push('/home')
    } catch (error) {
      setError(error)
    }
  }

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Voltar titulo="Acessar Conta" />
        <Container component="main" maxWidth="false">
          <Paper className="paperApp" elevation={3}>
            <CssBaseline />
            <div className={classes.paper}>
            <form className={classes.form} noValidate>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Endereço de Email"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={e => {
                  setAuth({ ...auth,
                    email: e.target.value
                  })
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={e => {
                  setAuth({ ...auth,
                    senha: e.target.value
                  })
                }}
              />

              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleAuth}
              >
                Acessar
              </Button>
              <Grid container>
                <Grid item>
                  <Link
                  component="button"
                  variant="body2"
                  onClick={() => {
                    history.push('/cadastro')
                  }}>
                    {"Não tem uma conta? Crie uma!"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          </Paper>
        </Container>  
      </div>
    </React.Fragment>
  );
}