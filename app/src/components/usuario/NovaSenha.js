import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper'
import Voltar from '../nav/Voltar'

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
}));

export default function NovaSenha() {
  const classes = useStyles();

  const nodemailer = require('nodemailer');

  const transporter = nodemailer.createTransport({
    service: 'SendGrid',
    auth: {
      user: "apikey",
      pass: "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"
    },
  });

  const mailOptions = {
    from: 'no-reply@diegopinho.com',
    to: 'luismar_pavani@hotmail.com',
    subject: 'E-mail enviado usando Node!',
    text: 'Bem fácil, não? ;)'
  };

  const handleEmail = async () => {
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email enviado: ' + info.response);
        }
      });

    try {
      //setError({})
      
    } catch (error) {
      //setError(error)
    }
  }

  return (
    <React.Fragment>
      <Voltar titulo="Recuperar Senha" pagina="login" />
        <Container component="main" maxWidth="false">
          <Paper className="paperApp" elevation={3}>
          <CssBaseline />
          <div className={classes.paper}>
          
          <Typography component="h1" variant="h5">
            Informe seu email
          </Typography>

          <form className={classes.form} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Endereço de Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleEmail}
            >
              Enviar
            </Button>
          </form>
        </div>
        </Paper>
      </Container>  
    </React.Fragment>
  );
}