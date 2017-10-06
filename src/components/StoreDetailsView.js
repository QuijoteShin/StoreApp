import React, { Component } from 'react'
//import { Container, Row, Col } from 'reactstrap';

import { connect } from 'react-redux'
import { updateComponentState } from '../actions/index'

import ITInfo from './detailViewInfoPages/itInfo'
import StoreInfo from './detailViewInfoPages/storeInfo'

import {Tabs, Tab} from 'material-ui/Tabs'
import FontIcon from 'material-ui/FontIcon'
import FloatingActionButton from 'material-ui/FloatingActionButton'

const styles = {
    headline: {
      fontSize: 24,
      paddingTop: 16,
      marginBottom: 12,
      fontWeight: 400,
    },
    container: {
        marginTop: '2.5%'
    },
    backIcon: {
        marginLeft: '10px',
        marginBottom: '10px'
    },
    saveIcon: {
        float: 'right',
        marginBottom: '10px',
        marginRight: '10px'
    }
  }


class StoreDetailsView extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    backtoStoreLoader() {
        this.props.dispatch(updateComponentState({StoreDetailsViewActive: false, AddStoreActive: true, StoreLoaderActive: true, loadedStore: null}))
    }

    saveStoreDetailView(detailViewData) {
        this.props.dispatch(updateComponentState({StoreDetailsViewActive: false, AddStoreActive: true, StoreLoaderActive: true, loadedStore: null}))
    }


    render(){
        return(
            <div style={styles.container}>
                <FloatingActionButton style={styles.backIcon} mini={true} secondary={true}>
                    <FontIcon className="material-icons" onClick={ () => this.backtoStoreLoader() }>arrow_back</FontIcon>
                </FloatingActionButton>
                <FloatingActionButton style={styles.saveIcon} mini={true} secondary={true}>
                    <FontIcon className="material-icons" onClick={ () => this.saveStoreDetailView() }>done</FontIcon>
                </FloatingActionButton>
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                    >
                    <Tab label="Store Info" value="a" icon={<FontIcon className="material-icons">store</FontIcon>}>
                        <div>
                            <StoreInfo storeInfo={this.props.store}/>
                        </div>
                    </Tab>
                    <Tab label="IT Info" value="b" icon={<FontIcon className="material-icons">computer</FontIcon>}>
                        <div>
                            <ITInfo storeInfo={this.props.store}/>
                        </div>
                    </Tab>
                </Tabs>
            </div>
        )
    }
}

StoreDetailsView.defaultProps = {
    componentState: [],
    data: []  
  }

function mapStateToProps(state) {
    return { store: state.stores.componentState.loadedStore }
}

export default connect(mapStateToProps)(StoreDetailsView)