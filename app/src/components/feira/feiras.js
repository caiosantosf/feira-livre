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
    marginTop: theme.spacing(4),
    display: 'flex',
    width: '100%',
    justifyContent: "center",
    flexWrap: "wrap",
  },
  card: {
    width: '100%',
  },
  texto: {
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

export default function ImgMediaCard() {
  const classes = useStyles();

  let history = useHistory()

  return (
    <React.Fragment>
      <div className={classes.root}>
      <Container maxWidth="false">
        <CssBaseline />
        <Typography component="h1" variant="h6" className={classes.texto}>
          <Box textAlign="center" m={1}>
            Escolha a Feira-Livre que deseja visitar!
          </Box>
        </Typography>
        <div className={classes.paper}>
          <Box display="flex" flexWrap="wrap" textAlign="center" p={1} m={1} bgcolor="background.paper">
              <Box p={1} css={{ maxWidth: 250 }}>
                  <Card className={classes.card}>
                  <CardActionArea>
                  <CardMedia
                      component="img"
                      alt="Feira Livre 2"
                      height="200"
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
              </Box>
              <Box p={1} css={{ maxWidth: 250 }}>
                  <Card className={classes.card}>
                  <CardActionArea>
                  <CardMedia
                      component="img"
                      alt="Feira Livre 2"
                      height="200"
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
              </Box>
              <Box p={1} css={{ maxWidth: 250 }}>
                  <Card className={classes.card}>
                  <CardActionArea>
                  <CardMedia
                      component="img"
                      alt="Feira Livre 2"
                      height="200"
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
              </Box>
          </Box>
        </div>
      </Container>

      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Copyright />
        </Container>
    </footer>
    </div>
    </React.Fragment>
  );
}
