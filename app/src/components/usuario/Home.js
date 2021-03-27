import React from 'react';
import { useHistory } from "react-router-dom"
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
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
    marginTop: theme.spacing(3),
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

export default function Home(props) {
  const classes = useStyles()

  const [solicitacoes, setSolicitacoes] = React.useState(0)
  const [error, setError] = React.useState([])

  let history = useHistory()

  const { state } = props.location
  let feiraId = 0
  if (state) {
    feiraId = state.feiraId
  }

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const resFeirantes = await api.get('/feirantes', 
        { headers :{
          'feiraId' : feiraId,
          'confirmado' : false
        }})

        if (resFeirantes.status === 200) {
          setSolicitacoes(resFeirantes.data.length)
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
    if (sessionStorage.getItem('tipo') === 'feira') {
      fetchData()
    }
  }, [feiraId, history])

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Voltar titulo="Página Inicial" />
        <Container component="main" maxWidth="false">
          <Paper className="paperApp" elevation={3}>
            <CssBaseline />
            <div className={classes.paper}>
            <form className={classes.form} noValidate>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={() => {history.push('/cadastro', {usuarioId: sessionStorage.getItem('usuarioId')})}}
              >
                Alterar dados do usuário
              </Button>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                style={sessionStorage.getItem('tipo') === 'feira' ? {} : {display: 'none'}}
                className={classes.submit}
                onClick={() => {history.push('/cadastro-feira', {usuarioId: sessionStorage.getItem('usuarioId')})}}
              >
                Alterar dados da feira
              </Button>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                style={sessionStorage.getItem('tipo') === 'feirante' ? {} : {display: 'none'}}
                className={classes.submit}
                onClick={() => {history.push('/cadastro-feirante', {usuarioId: sessionStorage.getItem('usuarioId')})}}
              >
                Alterar dados do feirante
              </Button>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                style={sessionStorage.getItem('tipo') === 'feira' ? {} : {display: 'none'}}
                className={classes.submit}
                onClick={() => {history.push('/locais', {usuarioId: sessionStorage.getItem('usuarioId'), feiraId})}}
              >
                Locais e horários da feira
              </Button>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                style={sessionStorage.getItem('tipo') === 'feira' ? {} : {display: 'none'}}
                className={classes.submit}
                onClick={() => {history.push('/solicitacoes', { feiraId })}}
              >
                {`Solicitações de Feirantes (${solicitacoes})`}
              </Button>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                style={sessionStorage.getItem('tipo') === 'feirante' ? {} : {display: 'none'}}
                className={classes.submit}
                onClick={() => {history.push('/feirantegrid', {usuarioId: sessionStorage.getItem('usuarioId')})}}
              >
                Produtos
              </Button>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
                onClick={() => {
                  sessionStorage.setItem('usuarioId', '')
                  sessionStorage.setItem('token', '')
                  history.push('/')
                }}
              >
                Sair
              </Button>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
                onClick={() => {history.push('/')}}
              >
                Excluir Conta
              </Button>
            </form>
          </div>
          </Paper>
        </Container>  
      </div>
    </React.Fragment>
  );
}