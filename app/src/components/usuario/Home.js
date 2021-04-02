import React from 'react';
import { useHistory } from "react-router-dom"
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper'
import Alert from '@material-ui/lab/Alert';
import { api } from '../../config/api';
import Voltar from '../nav/Voltar'
import { errorApi } from '../../config/handleErrors'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
}));

export default function Home(props) {
  const classes = useStyles()

  const [solicitacoes, setSolicitacoes] = React.useState(0)
  const [error, setError] = React.useState([])

  let history = useHistory()

  const usuarioId = sessionStorage.getItem('usuarioId')
  const feiraId = sessionStorage.getItem('feiraId')
  const feiranteId = sessionStorage.getItem('feiranteId')

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

  const handleDelete = async () => {
    try {
      setError([])

      const config = { headers :{
        'x-access-token' : sessionStorage.getItem('token'),
      }}

      if (feiraId) {
        await api.delete(`/feiras/${feiraId}`, config)
      }

      if (feiranteId) {
        await api.delete(`/feirantes/${feiranteId}`, config)
      }

      const res = await api.delete(`/usuarios/${usuarioId}`, config)

      if (res.status === 204 || res.status === 200) {
        sessionStorage.setItem('usuarioId', '')
        sessionStorage.setItem('feiraId', '')
        sessionStorage.setItem('feiranteId', '')
        sessionStorage.setItem('token', '')
        history.push('/')
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

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <div className={classes.root}>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Deseja realmente excluir sua conta?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Ao Confirmar a exclusão, serão apagados o seu usuário e a sua feira.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleDelete} color="secondary" autoFocus>
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>

        <Voltar titulo="Página Inicial" pagina="/"/>
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
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={() => {history.push('/cadastro', {usuarioId})}}
              >
                Alterar dados do usuário
              </Button>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                style={sessionStorage.getItem('tipo') === 'feira' ? {} : {display: 'none'}}
                className={classes.submit}
                onClick={() => {history.push('/cadastro-feira', {usuarioId})}}
              >
                Alterar dados da feira
              </Button>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                style={sessionStorage.getItem('tipo') === 'feirante' ? {} : {display: 'none'}}
                className={classes.submit}
                onClick={() => {history.push('/cadastro-feirante', {usuarioId})}}
              >
                Alterar dados do feirante
              </Button>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                style={sessionStorage.getItem('tipo') === 'feira' ? {} : {display: 'none'}}
                className={classes.submit}
                onClick={() => {history.push('/locais')}}
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
                onClick={() => {history.push('/produtos', {usuarioId})}}
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
                  sessionStorage.setItem('feiraId', '')
                  sessionStorage.setItem('feiranteId', '')
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
                onClick={() => {
                  handleClickOpen()
                }}
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