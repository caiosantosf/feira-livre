import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { api } from '../../config/api';
import Voltar from '../nav/Voltar'
import { Place, Schedule } from '@material-ui/icons';
import { errorApi } from '../../config/handleErrors'
import Alert from '@material-ui/lab/Alert';
import { useHistory } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    width: '100%',
    justifyContent: "center",
    flexWrap: "wrap",
  },
  form: {
    width: '100%', 
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
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  card: {
    width: '100%',
  },
  cardLocais: {
    width: '100%',
    marginTop: "16px"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    display: "block"
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(13),
    color: theme.palette.text.secondary,
  },
  texto: {
    marginTop: theme.spacing(2),
  },
  diaSemana: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: "600",
    flexBasis: '33.33%',
    flexShrink: 0,
  }
}));

export default function Feirantes(props) {
  const classes = useStyles();

  const { state } = props.location
  let titulo = ''
  if (state) {
    titulo = props.location.state.titulo
  }

  let history = useHistory()

  const [locais, setLocais] = React.useState([])
  const [feirantes, setFeirante] = React.useState([])
  const [produtos, setProdutos] = React.useState([])
  const [error, setError] = React.useState([])

  let { feiraId } = props.match.params

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const resLocais = await api.get(`/feiras/${feiraId}/locais`)
        if (resLocais.status === 200) setLocais(resLocais.data)
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

      try{
        const resFeirantes = await api.get('/feirantes', 
        { headers :{
          'feiraId' : feiraId
        }})

        if (resFeirantes.status === 200) setFeirante(resFeirantes.data)
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

      try {
        const resProdutos = await api.get(`/feiras/${feiraId}/feirantes/produtos`)
        if (resProdutos.status === 200) setProdutos(resProdutos.data)
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
  }, [feiraId, history])

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
    <Voltar titulo={titulo} pagina="/feiras"/>
    <Container >
      <CssBaseline />

      <Alert severity="error" style={error.length ? { display: 'flex'} : { display : 'none' }}>
        {error.map((err, i) => {
          return (
            <React.Fragment> {i ? <br /> : ''} {err} </React.Fragment>
          )
        })}
      </Alert>

      <Card className={classes.cardLocais}>
        <CardActionArea>
        <CardContent>
            <Typography gutterBottom variant="h6" component="h5">
              Locais e horários
            </Typography>
   
            {locais.map((local, i) => {
              return (
                <Box key={i}>
                  <Typography gutterBottom className={classes.diaSemana}>
                    {local.diaSemana}
                  </Typography>
                  <Typography className={classes.heading} style={{
                    display: 'flex'}}>
                    <Place className="iconLocais" color="primary" />
                    <span>{`${local.logradouro}, ${local.numero}, ${local.bairro}${local.complemento ? `, ${local.complemento}` : ''}`}</span>
                  </Typography>
                  <Typography className={classes.heading} style={{
                    display: 'flex'}}>
                    <Schedule className="iconLocais" color="secondary" />
                    {`Início: ${local.horarioInicio.substr(0, 5)} Termino: ${local.horarioTermino.substr(0, 5)}`}
                  </Typography>
                  <br />
                </Box>
              )
            })}
        </CardContent>
        </CardActionArea>
      </Card>

      <div className={classes.texto}>
      {feirantes.map((feirante, i) => {
        return (
        <Accordion key={i} expanded={expanded === feirante.id} onChange={handleChange(feirante.id)}>
          <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          >
          <Typography className={classes.heading}>{feirante.nome + ' - ' + feirante.descricao}</Typography>
          </AccordionSummary>
          <AccordionDetails>
          <div className={classes.paper}>
              <Box display="flex" flexWrap="wrap" textAlign="center" bgcolor="background.paper">
                  {produtos.map((produto, i) => {
                      if (produto.feiranteId === feirante.id) {
                          return (
                            <Box key={i} m={1} textAlign="center" >
                              <Box css={{ maxWidth: 350 }}>
                                  <Card className={classes.card}>
                                  <CardActionArea>
                                  <CardMedia
                                      component="img"
                                      alt={produto.nome}
                                      height="200"
                                      image={produto.imagemUrl}
                                      title={produto.nome}
                                  />
                                  <CardContent>
                                      <Typography gutterBottom variant="h5" component="h2">
                                          {produto.nome}
                                      </Typography>
                                      <Typography variant="body2" color="textSecondary" component="p">
                                          {produto.descricao}
                                      </Typography>
                                      <Typography className={classes.heading} style={{marginTop: "10px"}}>
                                          {`R$ ${produto.valor.replace('.', ',')} / ${produto.unidadeMedida}`}
                                      </Typography>
                                  </CardContent>
                                  </CardActionArea>
                                  </Card>
                              </Box>
                             </Box>
                          )
                      } else {
                          return ''
                      }
                  })}
              </Box>
            </div>
          </AccordionDetails>
        </Accordion>
        )
      })}
      </div>
    </Container>
    <br />
    </div>
  );
}