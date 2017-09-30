import React, { Component } from 'react'
//import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'

import StoreLoader from './StoreLoader'
import AddStore from './AddStore'
import StoreDetailsView from './StoreDetailsView'

import * as actions from '../actions'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      StoreDetailsViewActive: false,
      AddStoreActive: true,
      StoreLoaderActive: true,
    }
  }

  componentDidMount() {
    this.props.updateComponentState(this.state)
  }

  displayHandler(){
    //console.log(this.props.componentState)
    if(this.props.componentState.AddStoreActive && this.props.componentState.StoreLoaderActive){
      return(
        <div>
          <AddStore />
          <StoreLoader url='http://localhost:3001/api/stores' pollInterval={2000} loaderStatus={this.state.StoreLoaderActive}/>
        </div>
      )
    } else if(this.props.componentState.StoreDetailsViewActive){
      return(
          <StoreDetailsView />
      )
    }
  } 

  render() {
    return (
      <div className="App">
        {
          this.displayHandler()
        }
      </div>
    )
  }

}

App.defaultProps = {
  componentState: []  
}

function mapStateToProps(state) {
  return { componentState: state.stores.componentState }
}

export default connect(mapStateToProps, actions)(App);
