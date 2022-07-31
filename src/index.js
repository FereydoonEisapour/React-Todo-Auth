import React from 'react';
import reportWebVitals from './reportWebVitals';

import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
//import './assets/styles/CssReset.css'
import 'bootstrap/dist/css/bootstrap.min.css';
//import { ContextProvider } from './contexts/contextsProviser';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  // <React.StrictMode>
  // <ContextProvider>
  <Provider store={store}>
    <App />
  </Provider>
  // </ContextProvider>

  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
