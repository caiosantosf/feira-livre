import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import App        from './components/usuario/App'
import Login      from './components/usuario/Login'
import NovaSenha  from './components/usuario/NovaSenha'
import Cadastro   from './components/usuario/Cadastro'
import Feiras     from './components/cliente/feiras'
import Feirantes  from './components/cliente/feirantes'
import Feira      from './components/feira/feira'
import Feirante   from './components/feirante/feirante'

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/login" exact component={Login} />
        <Route path="/cadastro" exact component={Cadastro} />
        <Route path="/novasenha" exact component={NovaSenha} />
        <Route path="/feiras" exact component={Feiras} />
        <Route path="/feirantes" exact component={Feirantes} />
        <Route path="/feira" exact component={Feira} />
        <Route path="/feirante" exact component={Feirante} />
      </Switch>
    </BrowserRouter>
  )
}