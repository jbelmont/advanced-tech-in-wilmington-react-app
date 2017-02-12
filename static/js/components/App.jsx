import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';

import store, { history } from '../store/store';

import AdvancedTech from './AdvancedTech.jsx';
import Main from './Main.jsx';
import UserDetails from './UserDetails.jsx';

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
