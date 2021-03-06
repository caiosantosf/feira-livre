import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  box: {
    display: "flex",
    justifyContent: "space-between",
    position: "relative",
  },
  middle: {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)"
  }
}));

export default function Voltar({titulo, pagina}) {
    const classes = useStyles();
    let history = useHistory()
  
    return (
    <div className={classes.root}>
        <AppBar position="static">
            <Toolbar variant="dense" className={classes.box}>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <ArrowBackIcon onClick={() => {
                      if (!pagina || pagina === undefined) {
                        history.goBack()
                      } else {
                        history.push(pagina)
                      }
                    }}/>
                </IconButton>
                  <Typography className={classes.middle} variant="h6" color="inherit">
                      {titulo}
                  </Typography>
            </Toolbar>
        </AppBar>
    </div>
  );
}
