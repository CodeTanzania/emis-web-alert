import { createStore } from 'redux';
/* local dependencies */
import rootReducer from './rootReducer';



/**
 * Configure Redux store
 * Enable redux dev tools
 *
 * @function
 * @name configureStore
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const configureStore = () => createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default configureStore;