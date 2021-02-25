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
    //marginTop: theme.spacing(4),
    display: 'flex',
    width: '100%',
    justifyContent: "center",
    flexWrap: "wrap",
  },
  card: {
    width: '100%',
  },
  texto: {
    marginTop: theme.spacing(1),
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
}));

export default function Feiras() {
  const [feiras, setFeiras] = React.useState([])

  const cidade = sessionStorage.getItem('cidade')
  const estado = sessionStorage.getItem('estado')

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/feiras/', { headers : {
          cidade,
          estado
        }})
        setFeiras(res.data)
      } catch (error) {
        alert(error)
      }
    }
    fetchData()
  }, [cidade, estado])

  const classes = useStyles();

  let history = useHistory()

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Voltar titulo="Feiras" />

        <Container maxWidth="false">
          <CssBaseline />
          <div className={classes.paper}>
            {feiras.map((feira, i) => {
              return (
                <Box key={i} display="flex" flexWrap="wrap" textAlign="center" p={1} m={1} >
                  <Box p={1} css={{ maxWidth: 400 }}>
                      <Card className={classes.card}>
                        <CardActionArea>
                        <CardMedia
                            component="img"
                            alt={feira.nome}
                            height="200"
                            image={`${apiUrl}uploads/${feira.image}`}
                            title={feira.nome}
                            onClick={() => {
                              history.push(`/feirantes/${feira.id}`, {titulo: feira.nome})
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
