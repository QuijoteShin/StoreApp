import React, { Component } from 'react'

import { connect } from 'react-redux'

class StoreDetailsView extends Component {
    render(){
        console.log('storedetailview', this.props)
        return(
            <div>
                Store Details View
            </div>
        )
    }
}

StoreDetailsView.defaultProps = {
    componentState: [],
    data: []  
  }

function mapStateToProps(state) {
    return { componentState: state.stores.componentState, data: state.stores.data }
}

export default connect(mapStateToProps)(StoreDetailsView)