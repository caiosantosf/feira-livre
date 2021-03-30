import React from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Voltar from '../nav/voltar'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Alert from '@material-ui/lab/Alert';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CssBaseline from '@material-ui/core/CssBaseline';
import { api } from '../../config/api';
import { errorApi } from '../../config/handleErrors'
import Avatar from '@material-ui/core/Avatar/';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  form: {
    width: '100%', 
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
  rootList: {
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

export default function Produtos(props) {
  const classes = useStyles()

  const [produtos, setProdutos] = React.useState([])
  const [error, setError] = React.useState([])

  let history = useHistory()

  const feiranteId = sessionStorage.getItem('feiranteId')

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/feirantes/${feiranteId}/produtos`)

        if (res.status === 200) {
          setProdutos(res.data)
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
    if (sessionStorage.getItem('tipo') === 'feirante') {
      fetchData()
    }
  }, [feiranteId, history])

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Voltar titulo="Produtos" pagina="home"/>
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
                  {produtos.map((produto) => {
                    const labelId = `checkbox-list-secondary-label-${produto.id}`;
                    return (
                      <ListItem key={produto.id} button>
                        <ListItemAvatar>
                          <Avatar
                            alt={produto.descricao}
                            src={produto.imagemUrl}
                          />
                        </ListItemAvatar>
                        <ListItemText 
                          id={labelId} 
                          primary={`${produto.descricao} - ${produto.valor}`} 
                          onClick={() => {
                          history.push('/cadastro-produto', {id: produto.id})
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
          history.push('/cadastro-produto')
          }} />
        </Fab>
      </div>
    </React.Fragment>
  );
}