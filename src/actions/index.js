import axios from 'axios'

export const ADD_COMPONENT_STATE = 'ADD_COMPONENT_STATE'
export const LOAD_STORES = 'LOAD_STORES'
export const SAVE_STORE = 'SAVE_STORE'
export const UPDATE_IT_STATUS = 'UPDATE_IT_STATUS'
export const SAVE_IT_STATUS_TO_SERVER = 'SAVE_IT_STATUS_TO_SERVER'



export function updateItStatusState(state) {
    console.log('IT STATUS ACTION', state)
    return function(dispatch) {
        dispatch({
            type: UPDATE_IT_STATUS,
            payload: state
        })
    }
}

export function saveITStatusToServer(storeUpdateData) {
    return function(dispatch) {
        const ROOT_URL = 'http://localhost:3001/api/stores'
        //console.log('storeUpdateData', storeUpdateData)
        axios.put(ROOT_URL, {
            _id: storeUpdateData._id,
            checkedNetwork: storeUpdateData.checkedNetwork,
            checkedOnline: storeUpdateData.checkedOnline,
            checkedPOS: storeUpdateData.checkedPOS,
            checkedPhone: storeUpdateData.checkedPhone,
            networkEquipmentFinished: storeUpdateData.networkEquipmentFinished,
            phoneEquipmentFinished: storeUpdateData.phoneEquipmentFinished,
            posEquipmentFinished: storeUpdateData.posEquipmentFinished,
            storeITReady: storeUpdateData.storeITReady,
            storeOnline: storeUpdateData.storeOnline,
            percentCompleted: storeUpdateData.percentCompleted
        })
        .then( response => {
            //console.log(response)
            dispatch({
                type:SAVE_IT_STATUS_TO_SERVER,
                payload: response
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

}

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
            .catch(err =>{
                console.log(err)
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
            interface: storeInfo.interface,
            type: storeInfo.type
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

