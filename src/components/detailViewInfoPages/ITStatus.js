import React, { Component } from 'react'

import { updateItStatusState } from '../../actions'
import { connect } from 'react-redux'

import Checkbox from 'material-ui/Checkbox'
import Divider from 'material-ui/Divider'
import { Circle } from 'rc-progress'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'


const styles = {
    statusHeader: {
        paddingTop: '10%',
        textAlign: 'center',
    },
    checkbox: {
        width: '90%',
        paddingLeft: '10%',
        contentAlign: 'center',
    },
    divider: {
        width: '70%',
        paddingLeft: '30%'
    },
    progress: { 
        width: '125px',
        height: '125px'
    },
    raisedAlertButton: {
        marginRight: '15px'
    },
    alertBox: {
        width: '40%',
        maxWidth: 'none',
    }
}



class ITStatusIT extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: true,
            percentCompleted: 1,
            ranCompleted: false,
            checkedPOS: false,
            checkedNetwork: false,
            checkedOnline: false,
            checkedPhone: false,
            posEquipmentFinished: false,
            networkEquipmentFinished: false,
            phoneEquipmentFinished: false,
            storeOnline: false,
            storeITReady: false,
            checkedFinishedBoxDisabled: false
        }
        this.handleCloseCancel = this.handleCloseCancel.bind(this)
        this.handleCloseConfirm = this.handleCloseConfirm.bind(this)
    }

    componentDidUpdate() {


    }

    handleCloseConfirm() {
        //console.log("handelcloseConfirm", this.state)
        this.setState({
            storeITReady: true,
            storeOnline: true, 
            open: false, 
            ranCompleted: false, 
            checkedFinishedBoxDisabled: true
        
        })
        this.props.dispatch(updateItStatusState({
            checkedPOS: this.state.checkedPOS,
            checkedNetwork: this.state.checkedNetwork,
            checkedOnline: this.state.checkedOnline,
            checkedPhone: this.state.checkedPhone,
            posEquipmentFinished: this.state.posEquipmentFinished,
            networkEquipmentFinished: this.state.networkEquipmentFinished,
            phoneEquipmentFinished: this.state.phoneEquipmentFinished,
            storeOnline: this.state.storeOnline,
            storeITReady: this.state.storeITReady,
            percentCompleted: this.state.percentCompleted
        }))
    }

    handleCloseCancel() {
        //console.log("handelcloseCancel")
        this.setState({
            open: true,
            percentCompleted: 1,
            ranCompleted: false,
            checkedPOS: false,
            checkedNetwork: false,
            checkedOnline: false,
            checkedPhone: false,
            posEquipmentFinished: false,
            networkEquipmentFinished: false,
            phoneEquipmentFinished: false,
            storeOnline: false,
            storeITReady: false,
            checkedFinishedBoxDisabled: false
        })
    }

    completedCheck() {
        const alertActions = [
            <RaisedButton
              label="Cancel"
              primary={true}
              onClick={this.handleCloseCancel}
              style={styles.raisedAlertButton}
            />,
            <RaisedButton
              label="Confirm"
              primary={true}
              onClick={this.handleCloseConfirm}
            />,
        ]

        if(this.state.percentCompleted > 99 && !this.state.ranCompleted) {
            return(
                <div>
                    <Dialog
                        actions={alertActions}
                        modal={false}
                        open={this.state.open}
                        onRequestClose={this.handleCloseCancel}
                        contentStyle={styles.alertBox}
                        >
                        Confirm the store is 100% IT Ready.
                    </Dialog>
                </div>
                )
        }
    }

    updateCheckPOS() {
        if(this.props.store.checkedPOS) {
            this.props.dispatch(updateItStatusState({
                percentCompleted: this.props.store.percentCompleted - 25,
                checkedPOS: false

            }))
        } else if (!this.props.store.checkedPOS) {
            this.props.dispatch(updateItStatusState({
                percentCompleted: this.props.store.percentCompleted + 25,
                checkedPOS: true
            }))
        }
        console.log(this.props.store.checkedPOS)
    }

    updateCheckNet() {
        if(this.state.checkedNetwork) {
            this.setState( (oldState) => {
                return {
                    percentCompleted: oldState.percentCompleted - 25
                }
            })
        } else if (!this.state.checkedNetwork) {
            this.setState( (oldState) => {
                return {
                    percentCompleted: oldState.percentCompleted + 25
                }
            })
        }
        this.setState((oldState) => {
            return {
                checkedNetwork: !oldState.checkedNetwork,
            };
        });
    }
    updateCheckOnline( ) {
        if(this.state.checkedOnline) {
            this.setState( (oldState) => {
                return {
                    percentCompleted: oldState.percentCompleted - 25
                }
            })
        } else if (!this.state.checkedOnline) {
            this.setState( (oldState) => {
                return {
                    percentCompleted: oldState.percentCompleted + 25
                }
            })
        }
        this.setState((oldState) => {
            return {
                checkedOnline: !oldState.checkedOnline,
            };
        });
    }
    updateCheckPhone() {
        if(this.state.checkedPhone) {
            this.setState( (oldState) => {
                return {
                    percentCompleted: oldState.percentCompleted - 25
                }
            })
        } else if (!this.state.checkedPhone) {
            this.setState( (oldState) => {
                return {
                    percentCompleted: oldState.percentCompleted + 25
                }
            })
        }
        this.setState((oldState) => {
            return {
                checkedPhone: !oldState.checkedPhone,
            };
        });
    }

    renderResetButton() {
        if(this.state.storeITReady){
            return(
                <div>
                    <RaisedButton label="Reset IT" secondary={true}  onClick={ this.handleCloseCancel }/>
                </div>
            )
        }
    }


    render() {
        console.log('IT Status this.props.store', this.props.store)
        return(
            <div style={styles.statusHeader}>
                <h4>Store Status</h4>
                <Divider style={styles.divider} />
                <br/>
                <Circle 
                    percent={this.props.store.percentCompleted}
                    strokeWidth="4" 
                    strokeColor="#00bcd4" 
                    style={styles.progress}
                />
                <br/><br/><br />
                <h4>IT Check List</h4>
                <Divider style={styles.divider} />
                <br/>
                <Checkbox
                    label="POS Equipment"
                    checked={this.props.store.checkedPOS}
                    onCheck={this.updateCheckPOS.bind(this)}
                    style={styles.checkbox}
                    disabled={this.state.checkedFinishedBoxDisabled}
                />
                <Checkbox
                    label="Network Equipment"
                    checked={this.state.checkedNetwork}
                    onCheck={this.updateCheckNet.bind(this)}
                    style={styles.checkbox}
                    disabled={this.state.checkedFinishedBoxDisabled}
                />
                <Checkbox
                    label="Phone Setup"
                    checked={this.state.checkedPhone}
                    onCheck={this.updateCheckPhone.bind(this)}
                    style={styles.checkbox}
                    disabled={this.state.checkedFinishedBoxDisabled}
                />
                <Checkbox
                    label="Store Connection"
                    checked={this.state.checkedOnline}
                    onCheck={this.updateCheckOnline.bind(this)}
                    style={styles.checkbox}
                    disabled={this.state.checkedFinishedBoxDisabled}
                />
                { this.renderResetButton() }
                { this.completedCheck() }
            </div>
        )
    }
}

ITStatusIT.defaultProps = {
    componentState: [],
    data: [],
    itStatus: [],
    loadedStore: []  
  }

function mapStateToProps(state) {
    return { store: state.stores.componentState.loadedStore, itStatus: state.stores.itStatus }
}


export default connect(mapStateToProps)(ITStatusIT)