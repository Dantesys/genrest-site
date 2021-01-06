import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Paths from './paths';
function Routes(props) {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Paths.Index} />
            </Switch>
        </BrowserRouter>
    );
};
export default Routes;