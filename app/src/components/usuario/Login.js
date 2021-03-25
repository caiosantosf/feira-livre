import { useHistory } from "react-router-dom"
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box';
import Copyright from '../../components/nav/copyright'
import Voltar from '../../components/nav/voltar'
import { api } from '../../config/api';

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
    marginTop: theme.spacing(1),
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

export default function SignIn() {
  const classes = useStyles()

  const [error, setError] = React.useState({})
  const [auth, setAuth] = React.useState({})

  let history = useHistory()

  const handleAuth = async () => {
    try {
      setError({})
      const res = await api.post('/usuarios/login/', auth)
      const { token, id, tipo } = res.data

      sessionStorage.setItem('usuarioId', id)
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
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Continuar Conectado"
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
                <Grid item xs>
                  <Link 
                  component="button"
                  variant="body2"
                  onClick={() => {
                    history.push('/novasenha')
                  }}>
                    Esqueceu a Senha?
                  </Link>
                </Grid>
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