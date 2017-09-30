import React, { Component } from 'react'
import { connect } from 'react-redux'

import ReadyForItLoader from './storeLoaders/ReadyForItLoader'
import UnderConstLoader from './storeLoaders/UnderConstLoader'
import UpcomingStoreLoader from './storeLoaders/UpcomingLoader'

import * as actions from '../actions'


class StoreLoader extends Component {

    componentWillMount() {
        this.props.loadStoresFromServer()
    }

    openStoreDetailsView() {
        this.props.loaderStatus = false
    }

    render() {
        return(
                <div>
                    <div className="loaderContainer">
                        <h3 className="loaderTitle">Ready For IT
                        </h3>
                        <ReadyForItLoader storeData={this.props.data}/>
                    </div>

                    
                    <div className="loaderContainer">
                        <h3 className="loaderTitle">Under Construction</h3>
                        <UnderConstLoader storeData={this.props.data}/>
                    </div>

                    
                    <div className="loaderContainer">
                        <h3 className="loaderTitle">Upcoming Stores</h3>
                        <UpcomingStoreLoader storeData={this.props.data} loaderStatus={this.props.StoreLoaderActive}/>
                    </div>

                </div>

        )
    }
}

StoreLoader.defaultProps = {
    data: []
}

function mapStateToProps(state) {
    return { data: state.stores.data, componentState: state.stores.componentState }
}

export default connect(mapStateToProps, actions)(StoreLoader)