import React, { Component } from 'react'
import { connect } from 'react-redux'

import ReadyForItLoader from './storeLoaders/ReadyForItLoader'
import UnderConstLoader from './storeLoaders/UnderConstLoader'
import UpcomingStoreLoader from './storeLoaders/UpcomingLoader'
import ArchivedLoader from './storeLoaders/ArchivedLoader'

import {Tabs, Tab} from 'material-ui/Tabs'
import FontIcon from 'material-ui/FontIcon'

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
                <Tabs>
                    <Tab
                    icon={<FontIcon className="material-icons">computer</FontIcon>}
                    label="IT Ready"
                    >
                        <ReadyForItLoader storeData={this.props.data}/>
                    </Tab>
                    <Tab
                    icon={<FontIcon className="material-icons">build</FontIcon>}
                    label="Construction"
                    >
                        <UnderConstLoader storeData={this.props.data}/>
                    </Tab>
                    <Tab
                    icon={<FontIcon className="material-icons">next_week</FontIcon>}
                    label="upcoming"
                    >
                        <UpcomingStoreLoader storeData={this.props.data} loaderStatus={this.props.StoreLoaderActive}/>
                    </Tab>
                    <Tab
                    icon={<FontIcon className="material-icons">archive</FontIcon>}
                    label="archived"
                    >
                        <ArchivedLoader storeData={this.props.data}  />
                    </Tab>
                </Tabs>
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