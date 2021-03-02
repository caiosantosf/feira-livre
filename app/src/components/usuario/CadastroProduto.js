import React from 'react';
import { useHistory } from "react-router-dom"
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box';
import Copyright from '../../components/nav/copyright'
import { api, apiCidades } from '../../config/api';
import ImageUploading from 'react-images-uploading'

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
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
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
}));

export default function CadastroProduto(props) {
  const classes = useStyles();

  const { user_id } = props.location.state

  const [image, setImage] = React.useState()
  const [cidades, setCidades] = React.useState([])
  const [feira, setFeira] = React.useState({})
  const [error, setError] = React.useState({})

  let history = useHistory()

  const handleSave = async () => {
    try {
      setError({})

      let { id, ...feiraData } = feira
      feiraData = { ...feiraData, user_id }

      const config = { headers :{
        'x-access-token' : sessionStorage.getItem('token'),
      }}

      const res = id ? await api.put(`/feiras/${id}`, feiraData, config)
                     : await api.post('/feiras/', feiraData)

      const { id: idCreated } = res.data

      if (image) {
        try {
          const data = new FormData()

          data.append("name", image[0].file.name)
          data.append("file", image[0].file)

          await api.patch(`/feiras/image/${idCreated}`, data, config)
        } catch (error) {
          console.log(error)
        }
      }

    } catch (error) {

    }
  }

  const handleGetCidades = async (estado) => {
    try {
      const res = await apiCidades(estado)
      const { data } = res
      if (data) {

        const cidadesAux = []
        for (const cidade of data) {
          cidadesAux.push(cidade.nome)
        }
        setCidades(cidadesAux)
      }
    } catch (error) {
      setError({estado: "Estado Inválido!"})
    }
  }

  const onChangeImage = (imageList, addUpdateIndex) => {
    setImage(imageList);
  }

  return (
    <React.Fragment>
      <div id="container-imagem"></div>
      <Container component="main" maxWidth="false">
        <Paper className="paperApp" elevation={3}>
          <CssBaseline />
          <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Dados da sua feira
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="fname"
                  name="nome"
                  required
                  fullWidth
                  id="nome"
                  label="Nome"
                  autoFocus
                  onChange={e => {
                    setFeira({ ...feira,
                      nome: e.target.value
                    })
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="descricao"
                  label="Descrição"
                  name="descricao"
                  autoComplete="descricao"
                  onChange={e => {
                    setFeira({ ...feira,
                      descricao: e.target.value
                    })
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl className={classes.formControl}>
                  <InputLabel id="select-estado">Estado</InputLabel>
                  <Select
                    required
                    fullWidth
                    labelId="select-estado"
                    onChange={e => {
                      handleGetCidades(e.target.value)
                      setFeira({ ...feira,
                        estado: e.target.value
                      })
                    }}
                  >
                    <MenuItem value="AC">Acre</MenuItem>
                    <MenuItem value="AL">Alagoas</MenuItem>
                    <MenuItem value="AP">Amapá</MenuItem>
                    <MenuItem value="AM">Amazonas</MenuItem>
                    <MenuItem value="BA">Bahia</MenuItem>
                    <MenuItem value="CE">Ceará</MenuItem>
                    <MenuItem value="DF">Distrito Federal</MenuItem>
                    <MenuItem value="ES">Espírito Santo</MenuItem>
                    <MenuItem value="GO">Goiás</MenuItem>
                    <MenuItem value="MA">Maranhão</MenuItem>
                    <MenuItem value="MT">Mato Grosso</MenuItem>
                    <MenuItem value="MS">Mato Grosso do Sul</MenuItem>
                    <MenuItem value="MG">Minas Gerais</MenuItem>
                    <MenuItem value="PA">Pará</MenuItem>
                    <MenuItem value="PB">Paraíba</MenuItem>
                    <MenuItem value="PR">Paraná</MenuItem>
                    <MenuItem value="PE">Pernambuco</MenuItem>
                    <MenuItem value="PI">Piauí</MenuItem>
                    <MenuItem value="RJ">Rio de Janeiro</MenuItem>
                    <MenuItem value="RN">Rio Grande do Norte</MenuItem>
                    <MenuItem value="RS">Rio Grande do Sul</MenuItem>
                    <MenuItem value="RO">Rondônia</MenuItem>
                    <MenuItem value="RR">Roraima</MenuItem>
                    <MenuItem value="SC">Santa Catarina</MenuItem>
                    <MenuItem value="SP">São Paulo</MenuItem>
                    <MenuItem value="SE">Sergipe</MenuItem>
                    <MenuItem value="TO">Tocantins</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl className={classes.formControl}>
                  <InputLabel id="select-cidade">Cidade</InputLabel>
                  <Select
                    required
                    fullWidth
                    labelId="select-cidade"
                    onChange={e => {
                      setFeira({ ...feira,
                        cidade: e.target.value
                      })
                    }}
                  >
                    {cidades.map((cidade, i) => {
                      return (<MenuItem key={i} value={cidade}>{cidade}</MenuItem>)
                    })}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <ImageUploading
                  multiple
                  value={image}
                  onChange={onChangeImage}
                  maxNumber={1}
                  dataURLKey="data_url"
                >
                  {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                  }) => (
                    // write your building UI
                    <div className="upload__image-wrapper">
                      <Button
                        fullWidth
                        variant="contained"
                        color="secondary"
                        style={isDragging ? { color: 'red' } : undefined}
                        onClick={onImageUpload}
                        {...dragProps}
                      >
                        Selecione uma foto da feira
                      </Button>
                      &nbsp;
                      {imageList.map((image, index) => (
                        <div key={index} className="image-item">
                          <img src={image['data_url']} alt="" width="100" />
                          <div className="image-item__btn-wrapper">
                            <Button
                              variant="contained"
                              color="secondary" onClick={() => onImageUpdate(index)}>Trocar</Button>
                            {' '}
                            <Button
                              variant="contained"
                              color="secondary" onClick={() => onImageRemove(index)}>Remover</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </ImageUploading>
              </Grid>

            </Grid>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSave}
            >
              Cadastrar
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link 
                component="button"
                variant="body2"
                onClick={() => {
                  history.push('/login')
                }}>
                  Já possui uma conta? Acessar
                </Link>
              </Grid>
            </Grid>
          </form>
          <Box mt={8}>
            <Copyright />
          </Box>
        </div>
        </Paper>
      </Container>  
    </React.Fragment>
  );
}