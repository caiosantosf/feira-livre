import React from 'react';
import { useHistory } from "react-router-dom"
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper'
import { api } from '../../config/api';
import Copyright from '../../components/nav/copyright'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '20px'
  },
  form: {
    width: '100%'
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  formControl: {
    margin: theme.spacing(1),
    width: '100%'
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

export default function SignIn() {
  const classes = useStyles();

  let history = useHistory()

  const [cidades, setCidades] = React.useState([]);
  const [estados, setEstados] = React.useState([]);

  const [cidade, setCidade] = React.useState();
  const [estado, setEstado] = React.useState();

  const handleChangeCidade = (event) => {
    setCidade(event.target.value);
  };

  const handleChangeEstado = (event) => {
    setEstado(event.target.value);
    handleGetCidades(event.target.value)
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/feiras/estados/')
        setEstados(res.data)
      } catch (error) {
        alert(error)
      }
    }
    fetchData()
  }, [])

  const handleGetCidades = async (estado) => {
    try {
      const res = await api.get(`/feiras/estados/${estado}/cidades`)
      setCidades(res.data)
    } catch (error) {
      alert(error)
    }
  }

  return (
    <React.Fragment>
      <div id="container-imagem"></div>
      <Container component="main" maxWidth="false">
        <Paper elevation={3}>
          <CssBaseline />
          <div className={classes.paper}>
          <Box display="flex" 
              flexDirection="column" 
              justifyContent="center" 
              alignItems="center" 
              alignContent="center"
          >
            <Typography component="h1" variant="h6">
              Seja Bem-Vindo ao App Feira-Livre
            </Typography>
            <Typography component="h2" variant="h6">
              Escolha um local para visitar!
            </Typography>

            <FormControl className={classes.formControl}>  
            <InputLabel id="select-estado">Estado</InputLabel>
            <Select
              className={classes.form}
              labelId="select-estado"
              id="select-estado"
              value={estado}
              onChange={handleChangeEstado}
            >
              {estados.map(estado => {
                return (
                <MenuItem key={estado.estado} value={estado.estado}>{estado.estado}</MenuItem>
              )})}
            </Select>
            </FormControl>
            <FormControl className={classes.formControl}>  
            <InputLabel id="select-cidade">Cidade</InputLabel>
            <Select
              labelId="select-cidade"
              id="select-cidade"
              value={cidade}
              onChange={handleChangeCidade}
            >
              {cidades.map(cidade => {
                return (
                <MenuItem key={cidades.cidades} value={cidade.cidade}>{cidade.cidade}</MenuItem>
              )})}
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
                  sessionStorage.setItem('estado', estado)
                  sessionStorage.setItem('cidade', cidade)
                  history.push('/feiras')
                }}
              >
                Acessar
              </Button>
              <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  className={classes.submit}
                  onClick={() => {
                    history.push('/login')
                  }}
                >
                  Acesso Feira ou Feirante
                </Button>
            </form>
            
            <Box mt={8}>
              <Copyright />
            </Box>
        
            </Box>
          </div>
        </Paper>
      </Container>  
    </React.Fragment>
  );
}