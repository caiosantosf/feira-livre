import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Voltar from '../../components/nav/voltar'

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
}));

export default function CadastroLocais() {
  const classes = useStyles();

  const [usertype, setUsertype] = React.useState('');

  const handleChange = (event) => {
    setUsertype(event.target.value);
  };

  return (
    <div className={classes.root}>
      <Voltar titulo="Cadastro da Feira"/>
      <Container maxWidth="sm">
        <CssBaseline />
        <div className={classes.paper}>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="nomeFeira"
                  label="Nome da Feira"
                  name="nomeFeira"
                  autoComplete="nomeFeira"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="cep"
                  label="CEP"
                  name="cep"
                  autoComplete="cep"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="logradouro"
                  name="logradouro"
                  required
                  fullWidth
                  id="logradouro"
                  label="Endereço"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="complemento"
                  name="complemento"
                  fullWidth
                  id="complemento"
                  label="Complemento"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="bairro"
                  label="Bairro"
                  name="bairro"
                  autoComplete="bairro"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                    id="horaInicial"
                    label="Hora Inicial"
                    type="time"
                    required
                    fullWidth
                    defaultValue="06:00"
                    InputLabelProps={{
                    shrink: true,
                    }}
                    inputProps={{
                    step: 300, // 5 min
                    }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField
                    id="horaFinal"
                    label="Hora Final"
                    type="time"
                    required
                    fullWidth
                    defaultValue="12:00"
                    InputLabelProps={{
                    shrink: true,
                    }}
                    inputProps={{
                    step: 300, // 5 min
                    }}
                />
              </Grid>
              <Grid item xs={12}>
              <FormControl className={classes.formControl}>
                <InputLabel id="select-day">Dia da Semana</InputLabel>
                <Select
                  required
                  fullWidth
                  labelId="select-day"
                  id="select-day"
                  value={usertype}
                  onChange={handleChange}
                >
                  <MenuItem value={1}>Domingo</MenuItem>
                  <MenuItem value={2}>Segunda-Feira</MenuItem>
                  <MenuItem value={3}>Terça-Feira</MenuItem>
                  <MenuItem value={4}>Quarta-Feira</MenuItem>
                  <MenuItem value={5}>Quinta-Feira</MenuItem>
                  <MenuItem value={6}>Sexta-Feira</MenuItem>
                  <MenuItem value={7}>Sábado</MenuItem>
                </Select>
              </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Cadastrar
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              Apagar
            </Button>
          </form>
        </div>
      </Container>
      
    </div>
  );
}