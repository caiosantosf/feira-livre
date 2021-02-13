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

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
    <Container >
      <CssBaseline />
        <Typography component="h1" variant="h6" className={classes.texto}>
          <Box textAlign="center" m={1}>
            Aqui você encontra tudo o que procura!
          </Box>
        </Typography>
        <div className={classes.texto}>
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            >
            <Typography className={classes.heading}>General settings</Typography>
            <Typography className={classes.secondaryHeading}>I am an accordion</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Box display="flex" flexWrap="wrap" p={1} m={1} bgcolor="background.paper">
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
            </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
            >
            <Typography className={classes.heading}>Users</Typography>
            <Typography className={classes.secondaryHeading}>
                You are currently not an owner
            </Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
                Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar
                diam eros in elit. Pellentesque convallis laoreet laoreet.
            </Typography>
            </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
            >
            <Typography className={classes.heading}>Advanced settings</Typography>
            <Typography className={classes.secondaryHeading}>
                Filtering has been entirely disabled for whole web server
            </Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
                Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
                vitae egestas augue. Duis vel est augue.
            </Typography>
            </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
            >
            <Typography className={classes.heading}>Personal data</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
                Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
                vitae egestas augue. Duis vel est augue.
            </Typography>
            </AccordionDetails>
            </Accordion>
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
