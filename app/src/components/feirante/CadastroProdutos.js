import React from 'react';
import { useHistory } from "react-router-dom"
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper'
import { api } from '../../config/api';
import Voltar from '../nav/Voltar'
import { errorApi } from '../../config/handleErrors'
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
    width: '100%', 
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
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
}));

export default function CadastroProdutos(props) {
  const classes = useStyles();

  const [image, setImage] = React.useState()
  const [produto, setProduto] = React.useState({})
  const [error, setError] = React.useState([])
	
  const { state } = props.location
  let id = ''
  if (state) {
    id = state.id
  }

  let history = useHistory()

  const feiranteId = sessionStorage.getItem('feiranteId')
  
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/feirantes/${feiranteId}/produtos/${id}`)

        if (res.status === 200) {
          setProduto(res.data)
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
    if (id) {
      fetchData()
    }
  }, [id, feiranteId, history])

  const handleDelete = async () => {
    try {
      setError([])

      const config = { headers :{
        'x-access-token' : sessionStorage.getItem('token'),
      }}

      const res = await api.delete(`/feirantes/${feiranteId}/produtos/${id}`, config)

      if (res.status === 200) {
        history.push('/produtos')
      }
    } catch (error) {
      const errorHandled = errorApi(error)
      if (errorHandled.general) {
        setError([errorHandled.error])
      } else {
        let errorMessage = []
        Object.keys(errorHandled.error).forEach(function(key, i) {
          errorMessage.push(errorHandled.error[key])
        })
        setError(errorMessage)
      }
    }
  }

  const handleSave = async () => {
    try {
      setError([])

      let { id, imagemUrl, ...produtoData } = produto

      const config = { headers :{
        'x-access-token' : sessionStorage.getItem('token'),
      }}

      produtoData.feiranteId = feiranteId

      const res = !id ? await api.post(`/feirantes/${feiranteId}/produtos`, produtoData, config)
                     : await api.put(`/feirantes/${feiranteId}/produtos/${id}`, produtoData, config)

      const { id: idCreated } = res.data

      if (image) {
        const data = new FormData()

        data.append("name", image[0].file.name)
        data.append("file", image[0].file)

        await api.patch(`/feirantes/${feiranteId}/produtos/${idCreated ? idCreated : id}`, data, config)
      }

      if (res.status === 201 || res.status === 200) {
        history.push('/produtos')
      }
    } catch (error) {
      const errorHandled = errorApi(error)
      if (errorHandled.general) {
        setError([errorHandled.error])
      } else {
        let errorMessage = []
        Object.keys(errorHandled.error).forEach(function(key, i) {
          errorMessage.push(errorHandled.error[key])
        })
        setError(errorMessage)
      }
    }
  }

  const onChangeImage = (imageList, addUpdateIndex) => {
    setImage(imageList);
  }

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Voltar titulo="Cadastro" pagina="/produtos"/>
        <Container component="main" maxWidth="false">
          <Paper className="paperApp" elevation={3}>
            <CssBaseline />
            <div className={classes.paper}>
            <form className={classes.form} noValidate>
              <Alert severity="error" style={error.length ? { display: 'flex'} : { display : 'none' }}>
                {error.map((err, i) => {
                  return (
                    <React.Fragment> {i ? <br /> : ''} {err} </React.Fragment>
                  )
                })}
              </Alert>
                
              <Grid container spacing={2}>
              <Grid item xs={12}>
                  <TextField
                    required
                    autoFocus
                    fullWidth
                    id="descricaoProduto"
                    label="Descrição do Produto"
                    name="descricaoProduto"
                    autoComplete="descricaoProduto"
                    value={produto.descricao || ''}
                    onChange={e => {
                      setProduto({ ...produto, descricao: e.target.value})
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <TextField
                    required
                    fullWidth
                    name="preco"
                    id="preco"
                    label="Preço"
                    type="number"
                    value={produto.valor || ''}
                    onChange={e => {
                      setProduto({ ...produto, valor: e.target.value})
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="select-unidade">Unidade de Medida</InputLabel>
                    <Select
                      required
                      fullWidth
                      labelId="select-unidade"
                      id="select-unidade"
                      value={produto.unidadeMedida || ''}
                      onChange={e => {
                        setProduto({ ...produto, unidadeMedida: e.target.value})
                      }}
                    >
                      <MenuItem value='Kilo'>Kilo</MenuItem>
                      <MenuItem value='100 Gramas'>100 Gramas</MenuItem>
                      <MenuItem value='Unidade'>Unidade</MenuItem>
                      <MenuItem value='Dúzia'>Dúzia</MenuItem>
                      <MenuItem value='Metro'>Metro</MenuItem>
                      <MenuItem value='Litro'>Litro</MenuItem>
                      <MenuItem value='ML'>ML</MenuItem>
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
                      <div className="upload__image-wrapper">
                        <Button
                          fullWidth
                          variant="contained"
                          color="secondary"
                          style={isDragging ? { color: 'red' } : undefined}
                          onClick={() => {
                              if (imageList.length) {
                                onImageUpdate(0)
                              } else {
                                onImageUpload()
                              }
                          }}
                          {...dragProps}
                        >
                          Selecione uma foto do produto
                        </Button>
                        &nbsp;
                        <div className="image-item" style={imageList.length || !produto.imagemUrl ? { display: 'none'} : { display : 'block' }}>
                          <img src={produto.imagemUrl} alt="" width="100" />
                          <div className="image-item__btn-wrapper">
                            <Button
                              variant="contained"
                              color="secondary" onClick={() => setProduto({...produto, imagemUrl:''})}>Remover</Button>
                          </div>
                        </div>
                        {imageList.map((image, index) => (
                          <div key={index} className="image-item">
                            <img src={ image['data_url']} alt="" width="100" />
                            <div className="image-item__btn-wrapper">
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
                onClick={() => handleSave()}
              >
                Salvar
              </Button>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
                onClick={() => handleDelete()}
                style={!id ? {display: 'none'} : {}}
              >
                Apagar
              </Button>
          </form>
          </div>
          </Paper>
        </Container>  
      </div>
    </React.Fragment>
  );
}
