import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/login';
import Home from './pages/home';
import CreateUser from './pages/usuarios/create';
import ListUsers from './pages/usuarios/list';
import Servicos from './pages/servicos';
import Reparos from './pages/reparos';
import Patrimonios from './pages/patrimonios';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/home" component={Home}/>
                <Route path="/createUser" component={CreateUser}/>
                <Route path="/listUsers" component={ListUsers}/>
                <Route path="/services" component={Servicos}/>
                <Route path="/repair" component={Reparos}/>
                <Route path="/patrimony" component={Patrimonios}/>
                
            </Switch>
        </BrowserRouter>
    )
    
}