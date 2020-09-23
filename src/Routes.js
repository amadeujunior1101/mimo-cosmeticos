import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard/Dashboard'
import Category from './pages/Register/Category';
import Client from './pages/Register/Client';
import Product from './pages/Register/Product';
import Seller from './pages/Register/Seller';
import UpdateCategory from './pages/Register/UpdateCategory'
import Page404 from './pages/NotFound/Page404'
import NewDashBoard from './pages/NewDashBoard/NewDashBoard'

//Criar o componentes com as rotas
// const history = createMemoryHistory(location)
function Routes() {
    return (
        <BrowserRouter >
            <Switch>
                <Route path="/" exact component={NewDashBoard} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/categorias" component={Category} />
                <Route path="/categoria/update_category/:id" component={UpdateCategory} />
                <Route path="/clientes" component={Client} />
                <Route path="/produtos" component={Product} />
                <Route path="/vendedores" component={Seller} />
                <Route path="*" component={Page404} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;