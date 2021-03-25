import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Footer from '../../components/nav/footer';
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

export default function SignUp() {
  const classes = useStyles();

  const [usertype, setUsertype] = React.useState('');

  const handleChange = (event) => {
    setUsertype(event.target.value);
  };

  return (
    <div className={classes.root}>
      <Voltar url="/feiragrid"/>
      <Container maxWidth="sm">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Cadastro da Produtos
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="nomeProduto"
                  label="Nome do Produto"
                  name="nomeProduto"
                  autoComplete="nomeProduto"
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  name="preco"
                  required
                  fullWidth
                  id="preco"
                  label="Preço"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl className={classes.formControl}>
                  <InputLabel id="select-unidade">Unidade de Medida</InputLabel>
                  <Select
                    required
                    fullWidth
                    labelId="select-unidade"
                    id="select-unidade"
                    value={usertype}
                    onChange={handleChange}
                  >
                    <MenuItem value={1}>Kilo</MenuItem>
                    <MenuItem value={2}>100 Gramas</MenuItem>
                    <MenuItem value={3}>Unidade</MenuItem>
                    <MenuItem value={4}>Dúzia</MenuItem>
                    <MenuItem value={5}>Metro</MenuItem>
                    <MenuItem value={6}>Litro</MenuItem>
                    <MenuItem value={7}>ML</MenuItem>
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
      
      <Footer/>
    </div>
  );
}