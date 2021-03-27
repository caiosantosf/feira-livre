import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import App        from './components/usuario/App'
import Login      from './components/usuario/Login'
import NovaSenha  from './components/usuario/NovaSenha'
import Cadastro   from './components/usuario/Cadastro'
import CadastroFeira   from './components/usuario/CadastroFeira'
import CadastroFeirante   from './components/usuario/CadastroFeirante'
import CadastroProduto   from './components/usuario/CadastroProduto'
import Home   from './components/usuario/Home'
import Feiras     from './components/cliente/feiras'
import Feirantes  from './components/cliente/feirantes'
import Feira      from './components/feira/feira'
import Feirante   from './components/feirante/feirante'
import FeiraGrid from './components/feira/feira-grid'
import FeiranteGrid from './components/feirante/feirante-grid'
import Produto from './components/produto/produto'
import Solicitacoes from './components/solicitacoes/solicitacoes-feirantes'

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/login" exact component={Login} />
        <Route path="/cadastro" exact component={Cadastro} />
        <Route path="/cadastro-feira" exact component={CadastroFeira} />
        <Route path="/cadastro-feirante" exact component={CadastroFeirante} />
        <Route path="/novasenha" exact component={NovaSenha} />
        <Route path="/home" exact component={Home} />
        <Route path="/feiras" exact component={Feiras} />
        <Route path="/feirantes/:feiraId" exact component={Feirantes} />
        <Route path="/feira" exact component={Feira} />
        <Route path="/feirante" exact component={Feirante} />
        <Route path="/feiragrid" exact component={FeiraGrid} />
        <Route path="/feirantegrid" exact component={FeiranteGrid} />
        <Route path="/cadastro-produto" exact component={Produto} />
        <Route path="/solicitacoes-feirantes" exact component={Solicitacoes} />
      </Switch>
    </BrowserRouter>
  )
}