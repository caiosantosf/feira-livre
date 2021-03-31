import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import App        from './components/usuario/App'
import Login      from './components/usuario/Login'
import NovaSenha  from './components/usuario/NovaSenha'
import Cadastro   from './components/usuario/Cadastro'
import CadastroFeira   from './components/usuario/CadastroFeira'
import CadastroFeirante   from './components/usuario/CadastroFeirante'
import CadastroProduto   from './components/feirante/CadastroProdutos'
import Produtos   from './components/feirante/Produtos'
import CadastroLocais   from './components/feira/CadastroLocais'
import Locais   from './components/feira/Locais'
import Home   from './components/usuario/Home'
import Solicitacoes   from './components/usuario/Solicitacoes'
import Feiras     from './components/cliente/Feiras'
import Feirantes  from './components/cliente/Feirantes'

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
        <Route path="/solicitacoes" exact component={Solicitacoes} />
        <Route path="/feiras" exact component={Feiras} />
        <Route path="/feirantes/:feiraId" exact component={Feirantes} />
        <Route path="/locais" exact component={Locais} />
        <Route path="/cadastro-locais" exact component={CadastroLocais} /> 
        <Route path="/produtos" exact component={Produtos} />
        <Route path="/cadastro-produto" exact component={CadastroProduto} /> 
      </Switch>
    </BrowserRouter>
  )
}