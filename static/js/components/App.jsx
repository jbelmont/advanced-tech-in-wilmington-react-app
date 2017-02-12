import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';

import store, { history } from '../store';

import AdvancedTech from './AdvancedTech';
import Main from './Main';
import UserDetails from './UserDetails';

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Main}>
        <IndexRoute component={AdvancedTech}></IndexRoute>
      </Route>
      <Route path="/user/:id" component={UserDetails}></Route>
    </Router>
  </Provider>
);

render(router, document.getElementById('advancedTechContainer'));
