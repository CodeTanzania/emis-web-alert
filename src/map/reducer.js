/* eslint no-underscore-dangle: "off" */
import {
TEST
  } from './actions';
 
  
  const initialState = {};



  /**
   * Alert reducer function
   * @param {Object=} state - Redux store state
   * @param {Object} action - Redux action
   */
  export default function alerts(state = initialState, action) {
    switch (action.type) {
     
      case TEST: {
     
        return state;
      }
      default:
        return state;
    }
  }