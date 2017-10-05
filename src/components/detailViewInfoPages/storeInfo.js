import React, { Component } from 'react'

import Paper from 'material-ui/Paper'


const style = {
    paper:{
        height: '75vh',
        width: '100%',
        display: 'block',
    }
  }

class StoreInfo extends Component {
    render() {
        return(
            <div style={style.paperContainer}>
                <Paper style={style.paper} zDepth={3}>
                    <h2>{this.props.storeInfo.storeNumber}</h2>
                    <h4>{this.props.storeInfo.storeName}</h4>
                </Paper>
            </div>
        )
    }
}

StoreInfo.defaultProps = {
    componentState: [],
    data: []  
  }

export default StoreInfo