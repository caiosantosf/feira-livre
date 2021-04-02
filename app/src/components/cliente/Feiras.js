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
import { api } from '../../config/api';
import Voltar from '../nav/Voltar'
import { errorApi } from '../../config/handleErrors'
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  paper: {
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
  const [error, setError] = React.useState([])

  const cidade = sessionStorage.getItem('cidade')
  const estado = sessionStorage.getItem('estado')

  let history = useHistory()

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/feiras/', { headers : {
          cidade,
          estado
        }})
        if (res.status === 200) {
          setFeiras(res.data)
        }
      } catch (error) {
        const errorHandled = errorApi(error)
        if (errorHandled.forbidden) {
          history.push('/')
        } else {
          if (errorHandled.general) {
            setError([errorHandled.error])
          }
        }
      }
    }
    fetchData()
  }, [cidade, estado, history])

  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Voltar titulo="Feiras" pagina="/"/>

        <Container maxWidth="false">
          <CssBaseline />
          <div className={classes.paper}>
            <Alert severity="error" style={error.length ? { display: 'flex'} : { display : 'none' }}>
              {error.map((err, i) => {
                return (
                  <React.Fragment> {i ? <br /> : ''} {err} </React.Fragment>
                )
              })}
            </Alert>
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
                            image={feira.imagemUrl}
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

      </div>
    </React.Fragment>
  );
}
