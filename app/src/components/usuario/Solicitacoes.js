import React from 'react';
import { useHistory } from "react-router-dom"
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box';
import Copyright from '../../components/nav/copyright'
import { api } from '../../config/api';
import Voltar from '../../components/nav/voltar'
import { errorApi } from '../../config/handleErrors'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import Divider from '@material-ui/core/Divider';
import Checkbox from '@material-ui/core/Checkbox';

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

      const res = id ? await api.put(`/feiras/${id}`, feiraData, config)

      if (image) {
        const data = new FormData()

        data.append("name", image[0].file.name)
        data.append("file", image[0].file)

        await api.patch(`/feiras/${idCreated ? idCreated : id}`, data, config)
      }

      sessionStorage.setItem('tipo', 'feira')
      sessionStorage.setItem('feiraId', idCreated)

      history.push('/home')
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
        <Voltar titulo="Solicitações" />
        <Container component="main" maxWidth="false">
          <Paper className="paperApp" elevation={3}>
            <CssBaseline />
            <div className={classes.paper}>
              <form className={classes.form} noValidate>

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