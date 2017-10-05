import React, { Component } from 'react'

import CircularProgress from 'material-ui/CircularProgress'
import Checkbox from 'material-ui/Checkbox'
import Divider from 'material-ui/Divider'


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
    }
}

class ITStatusIT extends Component {
    constructor(props) {
        super(props)
        this.state = {
            completed: 0,
            checkedPOS: false,
            checkedNetwork: false,
            checkedOnline: false,
            posEquipmentFinished: false,
            networkEquipmentFinished: false,
            storeOnline: false
        }
    }

    updateCheckPOS() {
        if(this.state.checkedPOS) {
            this.setState( (oldState) => {
                return {
                    completed: oldState.completed - 33
                }
            })
        } else if (!this.state.checkedPOS) {
            this.setState( (oldState) => {
                return {
                    completed: oldState.completed + 33
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
                    completed: oldState.completed - 33
                }
            })
        } else if (!this.state.checkedNetwork) {
            this.setState( (oldState) => {
                return {
                    completed: oldState.completed + 33
                }
            })
        }
        this.setState((oldState) => {
            return {
                checkedNetwork: !oldState.checkedNetwork,
            };
        });
    }
    updateCheckOnline() {
        if(this.state.checkedOnline) {
            this.setState( (oldState) => {
                return {
                    completed: oldState.completed - 33
                }
            })
        } else if (!this.state.checkedOnline) {
            this.setState( (oldState) => {
                return {
                    completed: oldState.completed + 33
                }
            })
        }
        this.setState((oldState) => {
            return {
                checkedOnline: !oldState.checkedOnline,
            };
        });
    }


    render() {
        return(
            <div style={styles.statusHeader}>
                <h4>Store Status</h4>
                <Divider style={styles.divider} />
                <br/>
                <CircularProgress
                    mode="determinate"
                    value={this.state.completed}
                    size={80}
                    thickness={5}
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
                />
                <Checkbox
                    label="Network Equipment"
                    checked={this.state.checkedNetwork}
                    onCheck={this.updateCheckNet.bind(this)}
                    style={styles.checkbox}
                />
                <Checkbox
                    label="Store Connection"
                    checked={this.state.checkedOnline}
                    onCheck={this.updateCheckOnline.bind(this)}
                    style={styles.checkbox}
                />
            </div>
        )
    }
}

export default ITStatusIT