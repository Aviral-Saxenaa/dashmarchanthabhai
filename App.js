import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store/store';
import MainContainer from './MainContainer';
// import './localStoragePolyfill';

const App = () => {
 

  return (
    <Provider store={store}>
      <MainContainer />
      </Provider>
  );
};

export default App;
