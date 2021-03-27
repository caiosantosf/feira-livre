import React from 'react';
import { useHistory } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Footer from '../../components/nav/footer';
import Voltar from '../../components/nav/voltar'


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%', 
    //marginTop: theme.spacing(1),
    padding: '50px',
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
    position: 'absolute',                                          
    bottom: 10,                                                    
    right: 10, 
  },
}));

export default function SignUp() {
  const classes = useStyles();

  let history = useHistory()

  return (
    <div className={classes.root}>
      <Voltar />
      <Container maxWidth="sm">
        <CssBaseline />
        <div className={classes.selectEmpty}>
          <Typography component="h1" variant="h5">
            Cadastro da Feira
          </Typography>
        </div>
      
      <List dense className={classes.rootList}>
        {[0, 1, 2, 3].map((value) => {
          const labelId = `checkbox-list-secondary-label-${value}`;
          return (
            <ListItem key={value} button>
              <ListItemAvatar>
                <Avatar
                  alt={`Avatar n°${value + 1}`}
                  src={`/static/images/avatar/${value + 1}.jpg`}
                />
              </ListItemAvatar>
              <ListItemText 
                id={labelId} 
                primary={`Line item ${value + 1}`} 
                onClick={() => {
                  history.push('/feira')
                }}/>
            </ListItem>
          );
        })}
      </List>
    <div className={classes.rootFab}>
      <Fab color="primary" aria-label="add">
        <AddIcon onClick={() => {
                history.push('/feira')
              }} />
      </Fab>
    </div>
      </Container>
      <Footer/>
    </div>
  );
}