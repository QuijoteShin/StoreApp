import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateComponentState } from '../../actions/index'

const dateFormat = require('dateformat')


class ReadyForItLoader extends Component {

    openStoreDetailsView(store){
        this.props.dispatch(updateComponentState({StoreDetailsViewActive: true, AddStoreActive: false, StoreLoaderActive: false, loadedStore: store}))
    }


    renderStores() {
        const todaysDate = new Date()
        const readyForItStores = []
        //console.log('readyForItComponent', this.props)
        this.props.storeData.forEach( store => {
            const storeOpenDate = Date.parse(store.storeOpen)
            const constEndDate = Date.parse(store.constEnd)
            if(constEndDate < todaysDate && storeOpenDate > todaysDate) {
                readyForItStores.push(store)
            }
        })
        return (
            
            <div className="row loaderContainer">
                {
                    readyForItStores.map( store => {
                        return(
                            <div key={store._id} className="col-lg-3 col-md-3 col-sm-6 cardContainer">
                                <div className="card">
                                    <div className="card-block">
                                        <h3 className="card-title"> { store.storeNumber } </h3>
                                        <p className="card-text"> { store.storeName } </p>
                                        <p className="card-text"> Open Date: { dateFormat(store.storeOpen, "mmm dS, yyyy") } </p>
                                        <div className="cardStatus">
                                            Status
                                            <div className="statusCircle circleFill"/>
                                        </div>
                                        <a 
                                            className="btn btn-outline-secondary viewBtn"
                                            onClick={ () => this.openStoreDetailsView(store)}
                                        >View</a>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    render() {
        return(
            <div>
                { this.renderStores() }
            </div>
        )
    }
}

ReadyForItLoader.defaultProps = {
    storeData: []
}

function mapStateToProps(state) {
    return { componentState: state.stores.componentState }
}

export default connect(mapStateToProps)(ReadyForItLoader)