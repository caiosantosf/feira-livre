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

function Copyright() {
  let history = useHistory()
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" 
      component="button"
      variant="body2"
      onClick={() => {
        history.push('/')
      }}>
        Feira-Livre App
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  },
}));

export default function SignIn() {
  const classes = useStyles();

  let history = useHistory()

  return (
    <React.Fragment>
      <div id="container-imagem"></div>
      <Container component="main" maxWidth="false">
        <Paper elevation={3}>
          <CssBaseline />
          <div className={classes.paper}>
          
           <Avatar alt="Banca de Feira" src="/images/banca-feira.png" />

          <Typography component="h1" variant="h5">
            Acessar Conta
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Endereço de Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Continuar Conectado"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => {
                history.push('/feiragrid')
              }}
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
    </React.Fragment>
  );
}