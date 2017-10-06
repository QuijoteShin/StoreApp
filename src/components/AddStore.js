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
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'
import {
    Step,
    Stepper,
    StepLabel,
  } from 'material-ui/Stepper'

const dateFormat = require('dateformat')

const styles = {
    leftPadding: {
        marginLeft: '20px'
    },
    displayInline: {
        width: '40%',
        display: 'inline'
    },
    divider: {
        width: '40%',
        float: 'left'
    }
}

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
            },
            interface: null,
            posCount: null,
            type: "",
        }
        this.handleDatechangeConstStart = this.handleDatechangeConstStart.bind(this)
        this.handleDatechangeConstEnd = this.handleDatechangeConstEnd.bind(this)
        this.handleDatechangeStoreOpen = this.handleDatechangeStoreOpen.bind(this)
        this.oldNetUpdate = this.oldNetUpdate.bind(this)
        this.oldPhoneUpdate = this.oldPhoneUpdate.bind(this)
        this.newNetUpdate = this.newNetUpdate.bind(this)
        this.newPhoneUpdate = this.newPhoneUpdate.bind(this)
    }

    handleOpen = () => {
        this.setState({open: true})
    }
    
    handleClose = () => {
        const storeData = this.state
        this.setState({open: false})
        this.props.saveStoreToServer(storeData)
        this.handleCloseNoSave()
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
            },
            interface: null,
            posCount: null,
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

    oldNetUpdate(event, index, value) {
        this.setState( {oldNetworkInfo: Object.assign({}, this.state.oldNetworkInfo, { internet: value})} )
    }
    oldPhoneUpdate(event, index, value) {
        this.setState( {oldNetworkInfo: Object.assign({}, this.state.oldNetworkInfo, { phone: value})} )
    }
    newNetUpdate(event, index, value) {
        this.setState( {newNetworkInfo: Object.assign({}, this.state.newNetworkInfo, { internet: value})} )
    }
    newPhoneUpdate(event, index, value) {
        this.setState( {newNetworkInfo: Object.assign({}, this.state.newNetworkInfo, { phone: value})} )
    }

      getStepContent(stepIndex) {
        switch (stepIndex) {
          case 0:
            return (
                <div>
                    <h4>Store Info</h4>
                    <Divider style={styles.divider} />
                    <TextField
                        floatingLabelText="Store Number"
                        value={this.state.storeNumber}
                        onChange={ event => this.setState({storeNumber: event.target.value})}
                    />
                    <TextField
                        floatingLabelText="Store Name"
                        value={this.state.storeName}
                        onChange={ event => this.setState({storeName: event.target.value})} 
                        style={styles.leftPadding}
                    />
                    <SelectField
                        floatingLabelText="Store Remodel Type"
                        value={this.state.type}
                        onChange={ (event, index, value) => { this.setState({type: value})}}
                    >
                        <MenuItem value={"New"} primaryText="New" />
                        <MenuItem value={"Relocation"} primaryText="Relocation" />
                        <MenuItem value={"Major Remodel"} primaryText="Major Remodel" />
                        <MenuItem value={"Minor Remodel"} primaryText="Minor Remodel" />
                    </SelectField>
                    <br/> <br/>
                    <h4>Important Dates</h4>
                    <Divider style={styles.divider} />
                    <table>
                    <tbody>
                        <tr>
                            <td>
                                <DatePicker 
                                    floatingLabelText="Construction Start Date"
                                    hintText="Construction Start Date"
                                    autoOk={true}
                                    onChange={ this.handleDatechangeConstStart }
                                />
                            </td>
                            <td>
                                <DatePicker 
                                    floatingLabelText="Construction End Date"
                                    hintText="Construction End Date"
                                    autoOk={true}
                                    onChange={ this.handleDatechangeConstEnd }
                                    style={styles.leftPadding}
                                />
                            </td>
                        </tr>
                    </tbody>
                    </table>
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
                    <h4>Network Info</h4>
                    <Divider style={styles.divider} />
                    <SelectField
                        floatingLabelText="Old Network Provider"
                        value={this.state.oldNetworkInfo.internet}
                        onChange={ this.oldNetUpdate }
                    >
                        <MenuItem value={"Granite"} primaryText="Granite" />
                        <MenuItem value={"GTT"} primaryText="GTT" />
                        <MenuItem value={"AirCard"} primaryText="AirCard" />
                        <MenuItem value={"Local DSL Provider"} primaryText="Local DSL Provider" />
                    </SelectField>
                    <SelectField
                        floatingLabelText="Old Phone Carrier"
                        value={this.state.oldNetworkInfo.phone}
                        onChange={ this.oldPhoneUpdate }
                        style={styles.leftPadding}
                    >
                        <MenuItem value={"MetTel"} primaryText="MetTel" />
                        <MenuItem value={"Verizon Wireless"} primaryText="Verizon Wireless" />
                        <MenuItem value={"Sprint"} primaryText="Sprint" />
                        <MenuItem value={"ATT"} primaryText="ATT" />
                        <MenuItem value={"Local Carrier"} primaryText="Local Carrier" />
                    </SelectField>
                    <br />
                    <SelectField
                        floatingLabelText="New Network Provider"
                        value={this.state.newNetworkInfo.internet}
                        onChange={ this.newNetUpdate }
                    >
                        <MenuItem value={"Granite"} primaryText="Granite" />
                        <MenuItem value={"GTT"} primaryText="GTT" />
                        <MenuItem value={"AirCard"} primaryText="AirCard" />
                        <MenuItem value={"Local DSL Provider"} primaryText="Local DSL Provider" />
                    </SelectField>
                    <SelectField
                        floatingLabelText="New Phone Carrier"
                        value={this.state.newNetworkInfo.phone}
                        onChange={ this.newPhoneUpdate }
                        style={styles.leftPadding}
                    >
                        <MenuItem value={"MetTel"} primaryText="MetTel" />
                        <MenuItem value={"Verizon Wireless"} primaryText="Verizon Wireless" />
                        <MenuItem value={"Sprint"} primaryText="Sprint" />
                        <MenuItem value={"ATT"} primaryText="ATT" />
                        <MenuItem value={"Local Carrier"} primaryText="Local Carrier" />
                    </SelectField>
                    <br />
                    <SelectField
                        floatingLabelText="Interface Store?"
                        value={this.state.interface}
                        onChange={(event, index, value) => this.setState({interface: value})}
                        autoWidth={true}
                        >
                        <MenuItem value={false} primaryText="No" />
                        <MenuItem value={true} primaryText="Yes" />
                    </SelectField>
                    <br />
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
        const contentStyle = {margin: '0 14px'}
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