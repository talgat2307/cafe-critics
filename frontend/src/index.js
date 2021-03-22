import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import './index.css';
import App from './App';
import store, { history } from './store/congfigureStore';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@material-ui/core';
import theme from './theme';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App/>
      </ConnectedRouter>
    </Provider>
  </ThemeProvider>,
  document.getElementById('root'),
);

reportWebVitals();