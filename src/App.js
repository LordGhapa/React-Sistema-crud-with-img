import React from 'react';
import { Router } from 'react-router-dom';
// import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import GlobalStyles from './styles/GlobalStyles';
import Header from './components/header';
import Routes from './routes';
import history from './services/history';

import store, { persistor } from './store';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router navigator={history} location={history.location} history={history}>
          <GlobalStyles />
          <ToastContainer autoClose={3000} className='toast-container' />
          <Header />
          <Routes />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
