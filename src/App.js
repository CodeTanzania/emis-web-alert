import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './common/store/configureStore';
import Alerts from './Alerts';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'antd/dist/antd.css';
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
      <BrowserRouter>
        <Alerts />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
