import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap';

import { connect } from 'react-redux'

class StoreDetailsView extends Component {
    render(){
        console.log('storedetailview', this.props.store)
        return(
            <div className="storeDetailsHolder">
                <Container>
                    <Row>
                        <Col className="infoArea"> 
                            <h2> { this.props.store.storeNumber } </h2>
                            <h4> { this.props.store.storeName }  </h4>
                        </Col>
                        <Col className="statusArea"> 
                            <h4>Status Area </h4>
                        </Col>
                        <Col className="notesArea"> 
                            <h4>IT Notes</h4>
                        </Col>
                    </Row>
                </Container>
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