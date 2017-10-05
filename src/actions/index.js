import axios from 'axios'

export const ADD_COMPONENT_STATE = 'ADD_COMPONENT_STATE'
export const LOAD_STORES = 'LOAD_STORES'
export const SAVE_STORE = 'SAVE_STORE'


export function updateComponentState(state) {
    return function(dispatch) {
        dispatch({
            type: ADD_COMPONENT_STATE,
            payload: state
        })
    }
}

export function loadStoresFromServer() {
    return function(dispatch) {
        const ROOT_URL = 'http://localhost:3001/api/stores'
        axios.get(ROOT_URL)
            .then( res => {
                //console.log(res.data)
                dispatch({
                    type: LOAD_STORES,
                    payload: res.data
                })
            })
    }
}


export function saveStoreToServer(storeInfo) {
    return function(dispatch) {
        const ROOT_URL = 'http://localhost:3001/api/stores'
        console.log('data structure', storeInfo)
        axios.post(ROOT_URL, {
            storeNumber: storeInfo.storeNumber,
            storeName: storeInfo.storeName,
            constStart: storeInfo.constStart,
            constEnd: storeInfo.constEnd,
            storeOpen: storeInfo.storeOpen,
            oldNetworkInfo: Object.assign({}, storeInfo.oldNetworkInfo, { internet: storeInfo.oldNetworkInfo.internet, phone: storeInfo.oldNetworkInfo.phone }),
            newNetworkInfo: Object.assign({}, storeInfo.newNetworkInfo, { internet: storeInfo.newNetworkInfo.internet, phone: storeInfo.newNetworkInfo.phone }),
            interface: storeInfo.interface
        })
        .then( response => {
            console.log(response)
            dispatch({
                type: SAVE_STORE,
                payload: response.data
            })
        })
        
        .catch( err => {
            console.log(err)
        })
    }
}
