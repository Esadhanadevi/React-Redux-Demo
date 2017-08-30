'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './src/AppRoutes.js';

window.onload = () => {
  console.log('===============onload=================');
  ReactDOM.render(<AppRoutes />, document.getElementById('main'));
};
