'use strict';

import React from 'react';
import { render } from 'react-dom';
// Import routing components
import {Router, Route} from 'react-router';
import Layout from './layout.js';
import Home from './home.js';
import About from './about.js';
import Contact from './contact.js';

const routes = (
  <Router>
      <Route path = "/" component = {Layout} />
      <Route path = "/home" component = {Home} />
      <Route path = "/about" component = {About} />
      <Route path = "/contact" component = {Contact} />
  </Router>
);

export default routes;
