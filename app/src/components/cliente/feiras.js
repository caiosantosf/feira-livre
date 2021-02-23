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
import Container from '@material-ui/core/Container';
import { api, apiUrl } from '../../config/api';
import Footer from '../../components/nav/footer';
import Voltar from '../../components/nav/voltar'

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
}));

export default function ImgMediaCard() {
  const [feiras, setFeiras] = React.useState([])

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/feiras/', { headers : {
          cidade : sessionStorage.getItem('cidade'),
          estado : sessionStorage.getItem('estado')
        }})
        setFeiras(res.data)
      } catch (error) {
        alert(error)
      }
    }
    fetchData()
  }, [])

  const classes = useStyles();

  let history = useHistory()

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Voltar url="/"/>

        <Container maxWidth="false">
          <CssBaseline />
          <Typography component="h1" variant="h6" className={classes.texto}>
            <Box textAlign="center" m={1}>
              Escolha a Feira-Livre que deseja visitar!
            </Box>
          </Typography>
          <div className={classes.paper}>
            {feiras.map((feira, i) => {
              return (
                <Box key={i} display="flex" flexWrap="wrap" textAlign="center" p={1} m={1} bgcolor="background.paper">
                  <Box p={1} css={{ maxWidth: 250 }}>
                      <Card className={classes.card}>
                      <CardActionArea>
                      <CardMedia
                          component="img"
                          alt={feira.nome}
                          height="200"
                          image={`${apiUrl}uploads/${feira.image}`}
                          title={feira.nome}
                          onClick={() => {
                            history.push(`/feirantes/${feira.id}`)
                          }}  
                      />
                      <CardContent
                      onClick={() => {
                        history.push(`/feirantes/${feira.id}`)
                      }}
                      >
                          <Typography gutterBottom variant="h6" component="h5">
                            {feira.nome}
                          </Typography>
                          <Typography variant="body2" color="textSecondary" component="p">
                            {feira.descricao}
                          </Typography>
                      </CardContent>
                      </CardActionArea>
                      </Card>
                  </Box>
                </Box>
              )
            })}
          </div>
        </Container>

        <Footer/>

      </div>
    </React.Fragment>
  );
}
