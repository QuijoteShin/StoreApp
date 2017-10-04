import React, { Component } from 'react'
//import { Form, FormGroup, Label, Input } from 'reactstrap'

import { connect } from 'react-redux'
//import { setStores } from '../actions'
import * as actions from '../actions'


import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'
import {
    Step,
    Stepper,
    StepLabel,
  } from 'material-ui/Stepper'

const dateFormat = require('dateformat')


class AddStore extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            finished: false,
            stepIndex: 0,
            storeNumber: "",
            storeName: "",
            constStart: null,
            constEnd: null,
            storeOpen: null,
            oldNetworkInfo: {
                internet: "",
                phone: ""
            },
            newNetworkInfo: {
                internet: "",
                phone: ""
            }
        }
        this.handleDatechangeConstStart = this.handleDatechangeConstStart.bind(this)
        this.handleDatechangeConstEnd = this.handleDatechangeConstEnd.bind(this)
        this.handleDatechangeStoreOpen = this.handleDatechangeStoreOpen.bind(this)
        
    }

    handleOpen = () => {
        this.setState({open: true})
    }
    
    handleClose = () => {
        const storeData = this.state
        this.setState({open: false})
        this.props.saveStoreToServer(storeData)
        console.log(this.state)
    }

    handleCloseNoSave = () => {
        this.setState({
            open: false,
            finished: false,
            stepIndex: 0,
            storeNumber: "",
            storeName: "",
            constStart: null,
            constEnd: null,
            storeOpen: null,
            oldNetworkInfo: {
                internet: "",
                phone: ""
            },
            newNetworkInfo: {
                internet: "",
                phone: ""
            }
        })
    }

    handleNext = () => {
        const {stepIndex} = this.state;
        this.setState({
          stepIndex: stepIndex + 1,
          finished: stepIndex >= 2,
        })
    }
    
    handlePrev = () => {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
          this.setState({stepIndex: stepIndex - 1});
        }
    }

    handleDatechangeConstStart(event, date) {
        const newDate = dateFormat(date, "yyyy-mm-dd")
        this.setState({constStart: newDate})
    }
    handleDatechangeConstEnd(event, date) {
        const newDate = dateFormat(date, "yyyy-mm-dd")
        this.setState({constEnd: newDate})
    }
    handleDatechangeStoreOpen(event, date) {
        const newDate = dateFormat(date, "yyyy-mm-dd")
        this.setState({storeOpen: newDate})
    }


      getStepContent(stepIndex) {
        switch (stepIndex) {
          case 0:
            return (
                <div>
                    <TextField
                        floatingLabelText="Store Number"
                        value={this.state.storeNumber}
                        onChange={ event => this.setState({storeNumber: event.target.value})}
                    /><br/>
                    <TextField
                        floatingLabelText="Store Name"
                        value={this.state.storeName}
                        onChange={ event => this.setState({storeName: event.target.value})} 
                    /><br/>
                    <DatePicker 
                        floatingLabelText="Construction Start Date"
                        hintText="Construction Start Date"
                        autoOk={true}
                        onChange={ this.handleDatechangeConstStart }
                    />
                    <DatePicker 
                        floatingLabelText="Construction End Date"
                        hintText="Construction End Date"
                        autoOk={true}
                        onChange={ this.handleDatechangeConstEnd }
                    />
                    <DatePicker 
                        floatingLabelText="Store Open Date"
                        hintText="Store Open Date"
                        autoOk={true}
                        onChange={ this.handleDatechangeStoreOpen }
                    /><br/>
                </div>
            );
          case 1:
            return (
                <div>
                    <TextField
                        floatingLabelText="Old DSL Provider"
                        value={this.state.oldNetworkInfo.internet}
                        onChange={ event => this.setState( {oldNetworkInfo: Object.assign({}, this.state.oldNetworkInfo, { internet: event.target.value})} ) }
                    /><br/>
                    <TextField
                        floatingLabelText="Old Phone Provider"
                        value={this.state.oldNetworkInfo.phone}
                        onChange={ event => this.setState( {oldNetworkInfo: Object.assign({}, this.state.oldNetworkInfo, { phone: event.target.value})} ) }
                    /><br/>
                    <TextField
                        floatingLabelText="New DSL Provider"
                        value={this.state.newNetworkInfo.internet}
                        onChange={ event => this.setState( {newNetworkInfo: Object.assign({}, this.state.newNetworkInfo, { internet: event.target.value})} ) }
                    /><br/>
                    <TextField
                        floatingLabelText="New Phone Provider"
                        value={this.state.newNetworkInfo.phone}
                        onChange={ event => this.setState( {newNetworkInfo: Object.assign({}, this.state.newNetworkInfo, { phone: event.target.value})} ) }
                    /><br/>
                </div>
            );
          case 2:
            return (
                <div>
                    <h4>Confirm Information</h4>
                    Store Number: { this.state.storeNumber } 
                    <br />
                    Store Name: { this.state.storeName }
                    <br />
                    Store Opens: { this.state.storeOpen }
                    <br />
                </div>
            );
          default:
            return 'You\'re a long way from home sonny jim!';
        }
    }

    render() {
        const {finished, stepIndex} = this.state
        const contentStyle = {margin: '0 16px'}

        const actions = [
            <RaisedButton
              label="Close"
              secondary={true}
              onClick={this.handleCloseNoSave}
              className="cancelBtnModal"
            />,
            <RaisedButton
                label="Save"
                primary={true}
                disabled={ !this.state.finished }
                onClick={this.handleClose}
                className="cancelBtnModal"
            />
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
                onRequestClose={this.handleCloseNoSave}
                >

                    <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
                        <Stepper activeStep={stepIndex}>
                        <Step>
                            <StepLabel>Add Store Info</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Add IT Info</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Confirm</StepLabel>
                        </Step>
                        </Stepper>
                        <div style={contentStyle}>
                        {finished ? (
                            this.handleClose
                        ) : (
                            <div>
                                {this.getStepContent(stepIndex)}
                                <div style={{marginTop: 12}}>
                                    <FlatButton
                                    label="Back"
                                    disabled={stepIndex === 0}
                                    onClick={this.handlePrev}
                                    style={{marginRight: 12}}
                                    />
                                    <RaisedButton
                                    label={stepIndex === 2 ? 'Finish' : 'Next'}
                                    primary={true}
                                    onClick={this.handleNext}
                                    />
                                </div>
                            </div>
                        )}
                        </div>
                    </div>
                </Dialog>
            </div>
        )
    }
}

export default connect(null, actions)(AddStore)