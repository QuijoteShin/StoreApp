import React, { Component } from 'react'
//import { Container, Row, Col } from 'reactstrap';

import { connect } from 'react-redux'



class StoreDetailsView extends Component {
    render(){
        console.log('storedetailview', this.props.store)
        return(
            <div>
                Coming Soon...
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