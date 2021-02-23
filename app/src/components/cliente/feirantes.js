import React from 'react';
import { useHistory } from "react-router-dom"
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
import Footer from '../../components/nav/footer';
import Voltar from '../../components/nav/voltar'

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    width: '100%',
    justifyContent: "center",
    flexWrap: "wrap",
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
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  card: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  texto: {
    marginTop: theme.spacing(4),
  },
}));

export default function ImgMediaCard(props) {
  const classes = useStyles();

  let history = useHistory()

  const [feirantes, setFeirante] = React.useState([])

  let { feira_id } = props.match.params

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/feiras/${feira_id}/feirantes`)
        setFeirante(res.data)
      } catch (error) {
        alert(error)
      }
    }
    fetchData()
  }, [feira_id])

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
    <Voltar url="/feiras"/>
    <Container >
      <CssBaseline />
        <Typography component="h1" variant="h6" className={classes.texto}>
          <Box textAlign="center" m={1}>
            Aqui você encontra tudo o que procura!
          </Box>
        </Typography>
        <div className={classes.texto}>
        {feirantes.map((feirante, i) => {
          return (
          <Accordion key={i} expanded={expanded === feirante.id} onChange={handleChange(feirante.id)}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            >
            <Typography className={classes.heading}>{feirante.nome}</Typography>
            <Typography className={classes.secondaryHeading}>{feirante.descricao}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <div className={classes.paper}>
                <Box display="flex" flexWrap="wrap" textAlign="center" p={1} m={1} bgcolor="background.paper">
                    <Box p={1} css={{ maxWidth: 200 }}>
                        <Card className={classes.card}>
                        <CardActionArea>
                        <CardMedia
                            component="img"
                            alt="Feira Livre 2"
                            height="140"
                            image="/images/banca-feira.png"
                            title="Feira Livre em Major Nicacio"
                            onClick={() => {
                            history.push('/')
                            }}  
                        />
                        <CardContent
                        onClick={() => {
                            history.push('/')
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
                    <Box p={1} css={{ maxWidth: 200 }}>
                        <Card className={classes.card}>
                        <CardActionArea>
                        <CardMedia
                            component="img"
                            alt="Feira Livre 2"
                            height="140"
                            image="/images/banca-feira.png"
                            title="Feira Livre em Major Nicacio"
                            onClick={() => {
                            history.push('/')
                            }}  
                        />
                        <CardContent
                        onClick={() => {
                            history.push('/')
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
                    <Box p={1} css={{ maxWidth: 200 }}>
                        <Card className={classes.card}>
                        <CardActionArea>
                        <CardMedia
                            component="img"
                            alt="Feira Livre 2"
                            height="140"
                            image="/images/banca-feira.png"
                            title="Feira Livre em Major Nicacio"
                            onClick={() => {
                            history.push('/')
                            }}  
                        />
                        <CardContent
                        onClick={() => {
                            history.push('/')
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
                    <Box p={1} css={{ maxWidth: 200 }}>
                        <Card className={classes.card}>
                        <CardActionArea>
                        <CardMedia
                            component="img"
                            alt="Feira Livre 2"
                            height="140"
                            image="/images/banca-feira.png"
                            title="Feira Livre em Major Nicacio"
                            onClick={() => {
                            history.push('/')
                            }}  
                        />
                        <CardContent
                        onClick={() => {
                            history.push('/')
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
                    <Box p={1} css={{ maxWidth: 200 }}>
                        <Card className={classes.card}>
                        <CardActionArea>
                        <CardMedia
                            component="img"
                            alt="Feira Livre 2"
                            height="140"
                            image="/images/banca-feira.png"
                            title="Feira Livre em Major Nicacio"
                            onClick={() => {
                            history.push('/')
                            }}  
                        />
                        <CardContent
                        onClick={() => {
                            history.push('/')
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
            </AccordionDetails>
          </Accordion>
          )
        })}
        </div>
    </Container>

    <Footer/>
    </div>
  );
}
