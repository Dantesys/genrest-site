import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Paths from './paths';
function Routes(props) {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Paths.Index} />
                <Route exact path="/dashboard" component={Paths.Dashboard} />
                <Route exact path="/dashboard/mesas" component={Paths.Mesas} />
                <Route exact path="/dashboard/cardapio" component={Paths.Cardapio} />
                <Route exact path="/dashboard/config" component={Paths.Config} />
            </Switch>
        </BrowserRouter>
    );
};
export default Routes;