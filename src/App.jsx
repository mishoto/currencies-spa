import React from 'react';
import ReactDOM from 'react-dom';
import { AppProvider } from './context';
import Home from './page/Home';

import './index.css';

const App = () => (
  <>
    <Home />
  </>
);
ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('app'),
);
