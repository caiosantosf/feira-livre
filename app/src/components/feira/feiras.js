import React from 'react';
import { useHistory } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';

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
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    maxWidth: 345,
  },
}));

export default function ImgMediaCard() {
  const classes = useStyles();

  let history = useHistory()

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Feira Livre"
            height="140"
            image="/images/banca-feira.png"
            title="Feira Livre em Franca"
            onClick={() => {
              history.push('/feirantes')
            }}  
          />
          <CardContent
          onClick={() => {
            history.push('/feirantes')
          }}
          >
            <Typography gutterBottom variant="h5" component="h2">
              Feira Livre na Av. Major Nicário
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Tradicional Feira Livre na Av. Major Nicário ao domingos na cidade de Franca
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Feira Livre 2"
            height="140"
            image="/images/banca-feira.png"
            title="Feira Livre em Major Nicacio"
            onClick={() => {
              history.push('/feirantes')
            }}  
          />
          <CardContent
          onClick={() => {
            history.push('/feirantes')
          }}
          >
            <Typography gutterBottom variant="h5" component="h2">
              Feira Livre na Av. Major Nicário
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Tradicional Feira Livre na Av. Major Nicário ao domingos na cidade de Franca
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      </div>

      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}






/*
import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { useHistory } from "react-router-dom"
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

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
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  
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

  
export default function DataGridDemo() {
    const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className={classes.paper}>
      <Typography component="h1" variant="h6">
        Produtos da Feira-Livre
      </Typography>
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
      { /*DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection * / }
    </div>
      </div>

      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

*/