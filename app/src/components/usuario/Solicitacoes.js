import React from 'react';
import { useHistory } from "react-router-dom"
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box';
import { api } from '../../config/api';
import Voltar from '../../components/nav/Voltar'
import { errorApi } from '../../config/handleErrors'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import Alert from '@material-ui/lab/Alert';

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

export default function Solicitacoes(props) {
  const classes = useStyles()

  const [solicitacoes, setSolicitacoes] = React.useState([])
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
          setSolicitacoes(resFeirantes.data)
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
    fetchData()
  }, [feiraId, history])

  const handleSave = async () => {
    try {
      setError([])

      const config = { headers :{
        'x-access-token' : sessionStorage.getItem('token'),
      }}

      for (let sol of solicitacoes) {
        const { id } = sol
        
        delete sol.id
        delete sol.nomeUsuario

        await api.patch(`/feirantes/${id}`, sol, config)
      }
      
      history.push('/home')
    } catch (error) {
      const errorHandled = errorApi(error)
      if (errorHandled.general) {
        setError([errorHandled.error])
      } else {
        let errorMessage = []
        Object.keys(errorHandled.error).forEach((key, i) => {
          errorMessage.push(errorHandled.error[key])
        })
        setError(errorMessage)
      }
    }
  }

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Voltar titulo="Solicitações" />
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

              <List dense className={classes.rootList}>
                {solicitacoes.map((feirante, index) => {
                  return (
                    <React.Fragment>
                      <ListItem key={feirante.id} button onClick={() => {
                            let solAux = [...solicitacoes]
                            solAux[index].confirmado = solAux[index].confirmado ? false : true
                            
                            setSolicitacoes(solAux)
                          }}>
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            checked={solicitacoes[index].confirmado || false}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ 'aria-labelledby': feirante.id }}
                          />
                        </ListItemIcon>
                        <ListItemText 
                          id={feirante.id} 
                          primary={`${feirante.nome} (${feirante.nomeUsuario})`} 
                          />
                      </ListItem>
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => {handleSave()}}
                      >
                        Confirmar
                      </Button>
                    </React.Fragment>
                  );
                })}
              </List>
                
              </form>
          </div>
          </Paper>
        </Container>  
      </div>
    </React.Fragment>
  );
}