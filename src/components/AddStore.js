import React, { Component } from 'react'
import { Form, FormGroup, Label, Input } from 'reactstrap'

import { connect } from 'react-redux'
//import { setStores } from '../actions'
import * as actions from '../actions'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

class AddStore extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            storeNumber: null,
            storeName: null,
            constStart: null,
            constEnd: null,
            storeOpen: null
        }
    }

    handleOpen = () => {
        this.setState({open: true})
    };
    
    handleClose = () => {
        const storeData = this.state
        this.setState({open: false})
        this.props.saveStoreToServer(storeData)
    };

    render() {

        const actions = [
            <FlatButton
              label="Cancel"
              primary={true}
              onClick={this.handleClose}
            />,
            <FlatButton
              label="Submit"
              primary={true}
              keyboardFocused={true}
              onClick={this.handleClose}
            />,
            ]

        return(
            <div>
                <FloatingActionButton mini={true} secondary={true} className="addStore" onClick={this.handleOpen} >
                    <ContentAdd />
                </FloatingActionButton>

                <Dialog
                title="Add A New Store"
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
                >
                    <Form>
                        <FormGroup>
                            <Label for="Store Number">Store Number</Label>
                            <Input 
                                type="text" 
                                name="StoreNumber" 
                                id="StoreNumber" 
                                placeholder="Store Number"
                                onChange={ event => this.setState({storeNumber: event.target.value})} 
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="Store Number">Store Name</Label>
                            <Input 
                                type="text" 
                                name="StoreNumber" 
                                id="StoreNumber" 
                                placeholder="Store Name"
                                onChange={ event => this.setState({storeName: event.target.value})} 
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleDate">Construction Start Date</Label>
                            <Input 
                                type="date" 
                                name="date" 
                                id="exampleDate" 
                                placeholder="date placeholder"
                                onChange={ event => this.setState({constStart: event.target.value})}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleDate">Construction End Date</Label>
                            <Input 
                                type="date" 
                                name="date" 
                                id="exampleDate" 
                                placeholder="date placeholder" 
                                onChange={ event => this.setState({constEnd: event.target.value})}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleDate">Store Open Date</Label>
                            <Input 
                                type="date" 
                                name="date" 
                                id="exampleDate" 
                                placeholder="date placeholder" 
                                onChange={ event => this.setState({storeOpen: event.target.value})}
                            />
                        </FormGroup>
                    </Form>       
                </Dialog>
            </div>
        )
    }
}

export default connect(null, actions)(AddStore)