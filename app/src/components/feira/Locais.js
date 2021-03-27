import React from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Voltar from '../../components/nav/Voltar'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Alert from '@material-ui/lab/Alert';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Place, Schedule } from '@material-ui/icons';
import { api } from '../../config/api';
import { errorApi } from '../../config/handleErrors'

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  form: {
    width: '100%'
  },
  submit: {
    margin: theme.spacing(0, 0, 3),
  },
  formControl: {
    margin: theme.spacing(1),
    width: '100%'
  },
  selectEmpty: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(4),
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  rootFab: {
    width: 60,  
    height: 60,   
    borderRadius: 30,                                              
    position: 'fixed',                                          
    bottom: 10,                                                    
    right: 10, 
  },
}));

export default function Locais(props) {
  const classes = useStyles()

  const [locais, setLocais] = React.useState([])
  const [error, setError] = React.useState([])

  let history = useHistory()

  const feiraId = sessionStorage.getItem('feiraId')

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/feiras/${feiraId}/locais`)

        if (res.status === 200) {
          setLocais(res.data)
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
        <Voltar titulo="Locais e Horários" pagina="home"/>
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
                <List dense >
                  {locais.map((local) => {
                    const labelId = `checkbox-list-secondary-label-${local.id}`;
                    return (
                      <ListItem key={local.id} button>
                        <ListItemIcon>
                          <Schedule />
                          <Place />
                        </ListItemIcon>
                        <ListItemText 
                          id={labelId} 
                          primary={`${local.diaSemana} - ${local.bairro}`} 
                          onClick={() => {
                          history.push('/cadastro-locais', {id: local.id})
                        }}/>
                      </ListItem>
                    );
                  })}
                </List>
              </form>
            </div>
          </Paper>
        </Container>
      </div>
      <div className={classes.rootFab}>
        <Fab color="primary" aria-label="add">
          <AddIcon onClick={() => {
          history.push('/cadastro-locais')
          }} />
        </Fab>
      </div>
    </React.Fragment>
  );
}