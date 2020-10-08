import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home/Home'
import NewClient from './pages/Client/NewClient';
import NewProduct from './pages/Product/NewProduct';
import Seller from './pages/Seller/Seller';
import NewUpdateCategory from './pages/Category/NewUpdateCategory'
import Page404 from './pages/NotFound/Page404'
import NewCategory from './pages/Category/NewCategory';

//Criar o componentes com as rotas
// const history = createMemoryHistory(location)
function Routes() {
    return (
        <BrowserRouter >
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/home" component={Home} />
                <Route path="/categorias" component={NewCategory} />
                <Route path="/categoria/update_category/:id" component={NewUpdateCategory} />
                <Route path="/clientes" component={NewClient} />
                <Route path="/produtos" component={NewProduct} />
                <Route path="/vendedores" component={Seller} />
                <Route path="*" component={Page404} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
