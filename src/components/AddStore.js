import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap'

import { connect } from 'react-redux'
//import { setStores } from '../actions'
import * as actions from '../actions'


class AddStore extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: false,
            storeNumber: null,
            storeName: null,
            constStart: null,
            constEnd: null,
            storeOpen: null
        }
        this.toggle = this.toggle.bind(this)
        this.saveStore = this.saveStore.bind(this)
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        })
    }

    saveStore() {
        const storeData = this.state
        this.toggle()
        this.props.saveStoreToServer(storeData)
    }

    render() {
        return(
            <div>
                <Button color="danger" onClick={this.toggle} className="addStoreBtn">Add Store</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>Add A New Store</ModalHeader>
                <ModalBody>
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
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.saveStore}>Save</Button>{' '}
                    <Button color="secondary" onClick={this.toggle}>Close</Button>
                </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default connect(null, actions)(AddStore)