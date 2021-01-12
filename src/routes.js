import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Paths from './paths';
function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Paths.Index} />
                <Route exact path="/cardapio" component={Paths.Cad} />
                <Route exact path="/dashboard" component={Paths.Dashboard} />
                <Route exact path="/dashboard/cardapio" component={Paths.Cardapio} />
                <Route exact path="/dashboard/config" component={Paths.Config} />
                <Route exact path="/cliente" component={Paths.Cliente} />
                <Route exact path="/cliente/config" component={Paths.ClienteConfig} />
            </Switch>
        </BrowserRouter>
    );
};
export default Routes;