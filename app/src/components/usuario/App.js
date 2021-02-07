import React from 'react';
import { useHistory } from "react-router-dom"
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';


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
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));



export default function SignIn() {
  const classes = useStyles();

let history = useHistory()

const [cidade, setCidade] = React.useState('');

  const handleChangeCidade = (event) => {
    setCidade(event.target.value);
  };

const [feira, setFeira] = React.useState('');

  const handleChangeFeira = (event) => {
    setFeira(event.target.value);
  };

  
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h6">
          Seja Bem-Vindo ao App Feira-Livre
        </Typography>
        <Typography component="h1" variant="h6">
          Escolha um local para visitar!
        </Typography>

        <FormControl className={classes.formControl}>  
        <InputLabel id="select-cidade">Cidade</InputLabel>
        <Select
          labelId="select-cidade"
          id="select-cidade"
          value={cidade}
          onChange={handleChangeCidade}
        >
          <MenuItem value={1}>Franca</MenuItem>
          <MenuItem value={2}>Riberão Preto</MenuItem>
          <MenuItem value={3}>Batatais</MenuItem>
        </Select>
        </FormControl>
        <FormControl className={classes.formControl}>  
        <InputLabel id="select-feira">Local da Feira-Livre</InputLabel>
        <Select
          className={classes.form}
          labelId="select-feira"
          id="select-feira"
          value={feira}
          onChange={handleChangeFeira}
        >
          <MenuItem value={1}>Av. Major Nicácio</MenuItem>
          <MenuItem value={2}>Centro</MenuItem>
          <MenuItem value={3}>Estação</MenuItem>
        </Select>
        </FormControl>
        
        <form className={classes.form}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => {
              history.push('/cliente')
            }}
          >
            Acessar
          </Button>

          <div className={classes.paper}>
            <Typography component="h1" variant="h6">
              Acesso do Feirante
            </Typography>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={() => {
                  history.push('/login')
                }}
              >
                Feirante
              </Button>
          </div>
        </form>
      </div>

      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}