import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: "auto"
  },
  box: {
    display: "flex",
    justifyContent: "center",
  },
}));

export default function Voltar({titulo}) {
    const classes = useStyles();
    let history = useHistory()
  
    return (
    <div className={classes.root}>
        <AppBar position="static">
            <Toolbar variant="dense" className={classes.box}>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <ArrowBackIcon onClick={() => history.goBack()} />
                </IconButton>
                  <Typography variant="h6" color="inherit">
                      {titulo}
                  </Typography>
            </Toolbar>
        </AppBar>
    </div>
  );
}
