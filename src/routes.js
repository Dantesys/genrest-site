import React from 'react';
import { BrowserRouter, Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Paths from './paths';
function Routes(props) {
    let history = useHistory();
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Paths.Index} />
                <Route exact path="/dashboard" component={Paths.Dashboard} />
            </Switch>
        </BrowserRouter>
    );
};
export default Routes;