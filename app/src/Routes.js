import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import App        from './components/usuario/App'
import Login      from './components/usuario/Login'
import NovaSenha  from './components/usuario/NovaSenha'
import Cadastro   from './components/usuario/Cadastro'
import Cliente    from './components/cliente/cliente'


export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/login" exact component={Login} />
        <Route path="/cadastro" exact component={Cadastro} />
        <Route path="/novasenha" exact component={NovaSenha} />
        <Route path="/cliente" exact component={Cliente} />
      </Switch>
    </BrowserRouter>
  )
}