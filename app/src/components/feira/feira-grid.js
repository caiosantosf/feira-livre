import React from 'react';
import { useHistory } from "react-router-dom"
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { DataGrid } from '@material-ui/data-grid';

function Copyright() {
  let history = useHistory()
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" 
      component="button"
      variant="body2"
      onClick={() => {
        history.push('/')
      }}>
        Feira-Livre App
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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
    width: '100%', // Fix IE 11 issue.
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
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  },
}));

export default function SignUp() {
  const classes = useStyles();

  let history = useHistory()

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
    },
    {
      field: 'open',
      headerName: 'Visualizar',
      width: 160,
      renderCell: (params) => (
        <strong>
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ marginLeft: 16 }}
            onClick={() => {
              history.push('/feira')
            }}
          >
            Visualizar
          </Button>
        </strong>
      ),
    },
  ];
  
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];

  return (
    <div className={classes.root}>
      <Container maxWidth="sm">
        <CssBaseline />
        <div className={classes.selectEmpty}>
          <Typography component="h1" variant="h5">
            Cadastro da Feira
          </Typography>
        </div>
      </Container>
        
      <form className={classes.form}>
        <div style={{ height: 400}}>
          <DataGrid rows={rows} columns={columns} pageSize={5} />
        </div>
      </form>

      <Container maxWidth="sm">
        <CssBaseline />
        <div className={classes.paper}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => {
                history.push('/')
              }}
            >
              Voltar
            </Button>
        </div>
      </Container>
      
      <footer className={classes.footer}>
          <Container maxWidth="sm">
            <Copyright />
          </Container>
      </footer>
    </div>
  );
}