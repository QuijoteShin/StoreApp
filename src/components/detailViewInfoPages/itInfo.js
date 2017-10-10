import React, { Component } from 'react'

import StatusIT from './ITStatus'
import NotesIT from './ITNotes'

import Paper from 'material-ui/Paper'
//import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'

import { Container, Row, Col } from 'reactstrap'


const styles = {
    paper:{
        height: '75vh',
        width: '100%',
        display: 'block',
    },
    oldNetworkContainer: {
        padding: '5%',
        paddingTop: '10%'
    },
    newNetworkContainer: {
        padding: '5%'  
    },
    h4: {
        fontSize: '1.3em'
    },
    divider: {
        width: '70%',
        paddingLeft: '30%'
    },
    selectField: {
        height: '70px',
        fontSize: '.9em',
        width: '75%',
    }, 
    lowerSelectField: {
        height: '70px',
        fontSize: '.9em',
        width: '75%',
        marginTop: '-20px'
    }  
  }


class ITInfo extends Component {


    render() {
        return(
            <div>
                <Paper style={styles.paper} zDepth={3}>
                    <Container>
                        <Row>
                            <Col>
                                <div style={styles.oldNetworkContainer}>
                                    <h4 style={styles.h4}>Old Network Info</h4>
                                    <Divider style={styles.divider} />
                                    <SelectField
                                        floatingLabelText="Network Provider"
                                        value={this.props.storeInfo.oldNetworkInfo.internet}
                                        onChange={this.newNetUpdate}
                                        style={styles.selectField}
                                    >
                                        <MenuItem value={"Granite"} primaryText="Granite" />
                                        <MenuItem value={"GTT"} primaryText="GTT" />
                                        <MenuItem value={"AirCard"} primaryText="AirCard" />
                                        <MenuItem value={"Local DSL Provider"} primaryText="Local DSL Provider" />
                                    </SelectField>
                                    <SelectField 
                                        floatingLabelText="Phone Provider"
                                        value={this.props.storeInfo.oldNetworkInfo.phone}
                                        onChange={this.newNetUpdate}
                                        style={styles.lowerSelectField}
                                    >
                                        <MenuItem value={"MetTel"} primaryText="MetTel" />
                                        <MenuItem value={"Verizon Wireless"} primaryText="Verizon Wireless" />
                                        <MenuItem value={"Sprint"} primaryText="Sprint" />
                                        <MenuItem value={"ATT"} primaryText="ATT" />
                                        <MenuItem value={"Local Carrier"} primaryText="Local Carrier" />
                                    </SelectField>
                                </div>
                                <div style={styles.newNetworkContainer}>
                                    <h4 style={styles.h4}>New Network Info</h4>
                                    <Divider style={styles.divider} />
                                    <SelectField
                                        floatingLabelText="Network Provider"
                                        value={this.props.storeInfo.newNetworkInfo.internet}
                                        onChange={this.newNetUpdate}
                                        style={styles.selectField}
                                    >
                                        <MenuItem value={"Granite"} primaryText="Granite" />
                                        <MenuItem value={"GTT"} primaryText="GTT" />
                                        <MenuItem value={"AirCard"} primaryText="AirCard" />
                                        <MenuItem value={"Local DSL Provider"} primaryText="Local DSL Provider" />
                                    </SelectField>
                                    <SelectField
                                        floatingLabelText="Phone Provider"
                                        value={this.props.storeInfo.newNetworkInfo.phone}
                                        onChange={this.newNetUpdate}
                                        style={styles.lowerSelectField}
                                        autoWidth={false}
                                    >
                                        <MenuItem value={"MetTel"} primaryText="MetTel" />
                                        <MenuItem value={"Verizon Wireless"} primaryText="Verizon Wireless" />
                                        <MenuItem value={"Sprint"} primaryText="Sprint" />
                                        <MenuItem value={"ATT"} primaryText="ATT" />
                                        <MenuItem value={"Local Carrier"} primaryText="Local Carrier" />
                                    </SelectField>
                                </div>
                            </Col>
                            <Col>
                                <StatusIT storeInfo={this.props.storeInfo}/>
                            </Col>
                            <Col>
                                <NotesIT />
                            </Col>
                        </Row>
                    </Container>
                </Paper>
            </div>
        )
    }
}

export default ITInfo