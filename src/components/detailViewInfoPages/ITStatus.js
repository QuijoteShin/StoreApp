import React, { Component } from 'react'

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
            completed: 1,
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


    handleCloseConfirm() {
        console.log("handelcloseConfirm", this.state)
        this.setState({storeITReady: true, open: false, ranCompleted: false, checkedFinishedBoxDisabled: true})
    }

    handleCloseCancel() {
        console.log("handelcloseCancel")
        this.setState({
            open: true,
            completed: 1,
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

        if(this.state.completed > 99 && !this.state.ranCompleted) {
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
        if(this.state.checkedPOS) {
            this.setState( (oldState) => {
                return {
                    completed: oldState.completed - 25
                }
            })
        } else if (!this.state.checkedPOS) {
            this.setState( (oldState) => {
                return {
                    completed: oldState.completed + 25
                }
            })
        }
        this.setState((oldState) => {
            return {
                checkedPOS: !oldState.checkedPOS,
            };
        });
    }
    updateCheckNet() {
        if(this.state.checkedNetwork) {
            this.setState( (oldState) => {
                return {
                    completed: oldState.completed - 25
                }
            })
        } else if (!this.state.checkedNetwork) {
            this.setState( (oldState) => {
                return {
                    completed: oldState.completed + 25
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
                    completed: oldState.completed - 25
                }
            })
        } else if (!this.state.checkedOnline) {
            this.setState( (oldState) => {
                return {
                    completed: oldState.completed + 25
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
                    completed: oldState.completed - 25
                }
            })
        } else if (!this.state.checkedPhone) {
            this.setState( (oldState) => {
                return {
                    completed: oldState.completed + 25
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
        console.log('IT Status Props Store Info', this.props.storeInfo)
        return(
            <div style={styles.statusHeader}>
                <h4>Store Status</h4>
                <Divider style={styles.divider} />
                <br/>
                <Circle 
                    percent={this.state.completed}
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
                    checked={this.state.checkedPOS}
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


export default ITStatusIT