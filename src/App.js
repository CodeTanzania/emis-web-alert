import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './common/store/configureStore';
import AlertMap from './map';
import './App.css';

/* local constants */
const store = configureStore();

/**
 * Render the React application
 *
 * @function
 * @name App
 *
 * @version 0.1.0
 * @since 0.1.0
 */
function App() {
  return (
    <Provider store={store}>
     <AlertMap />
    </Provider>
  );
}

export default App;

