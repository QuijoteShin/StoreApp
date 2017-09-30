import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App'
import './index.css'


import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
  applyMiddleware(thunk)
));


/*
const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
)
*/


//store.subscribe( () => console.log('store', store.getState()))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
)