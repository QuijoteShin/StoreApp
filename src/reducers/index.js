import { combineReducers } from 'redux'
import {  LOAD_STORES, SAVE_STORE, ADD_COMPONENT_STATE } from '../actions'


const rootReducer = combineReducers({ 
    stores
})


function stores(state = [], action) {
    
    switch(action.type) {
        case LOAD_STORES:
            //console.log('LOAD_STORES action.payload',action.payload)
            return {...state, data: action.payload}
        case SAVE_STORE:
            //console.log('SAVE_STORE action.payload', state.data, action.payload)
            return {...state, data: state.data.concat(action.payload)}
        case ADD_COMPONENT_STATE:
            return {...state, componentState: action.payload}
        default:
            return state
    }
}

export default rootReducer