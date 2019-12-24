/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
// import { createBrowserHistory } from "history";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/store';
// core components
import Admin from "layouts/Admin.js";
// import RTL from "layouts/RTL.js";
import DataLoader from './components/DataLoader';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import {SnackbarProvider} from './components/GlobalSnackbar';

import "assets/css/material-dashboard-react.css?v=1.8.0";

// const hist = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <SnackbarProvider>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <DataLoader />
        <BrowserRouter basename="/admin" /*history={hist}*/>
          <Switch>
            <Route path="/" component={Admin} />
            <Redirect from="/" to="/dashboard" />
          </Switch>
        </BrowserRouter>
      </MuiPickersUtilsProvider>
    </SnackbarProvider>
  </Provider>,
  document.getElementById("root")
);
