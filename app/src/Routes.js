import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import App        from './components/usuario/app'
import Login      from './components/usuario/login'
import NovaSenha  from './components/usuario/novaSenha'
import Cadastro   from './components/usuario/cadastro'
import CadastroFeira   from './components/usuario/cadastroFeira'
import CadastroFeirante   from './components/usuario/cadastroFeirante'
import CadastroProduto   from './components/feirante/cadastroProdutos'
import Produtos   from './components/feirante/produtos'
import CadastroLocais   from './components/feira/cadastroLocais'
import Locais   from './components/feira/locais'
import Home   from './components/usuario/home'
import Solicitacoes   from './components/usuario/solicitacoes'
import Feiras     from './components/cliente/feiras'
import Feirantes  from './components/cliente/feirantes'

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