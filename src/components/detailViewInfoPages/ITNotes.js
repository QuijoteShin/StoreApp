import React, { Component } from 'react'


import Divider from 'material-ui/Divider'

const styles = {
    notescontainer: {
        padding: '5%',
        paddingTop: '10%',
        textAlign: 'center'
    },
    divider: {
        width: '70%',
        paddingLeft: '30%'
    }
}

class NotesIT extends Component {

    render() {
        return(
            <div style={styles.notescontainer}>
                <h4>IT Notes Component</h4>
                <Divider style={styles.divider} />
            </div>
        )
    }
}

export default NotesIT 