import React, { Component } from 'react'


class ReadyForItLoader extends Component {

    renderStores() {
        const todaysDate = new Date()
        const readyForItStores = []
        this.props.storeData.forEach( store => {
            const storeOpenDate = Date.parse(store.storeOpen)
            const constEndDate = Date.parse(store.constEnd)
            if(constEndDate < todaysDate && storeOpenDate > todaysDate) {
                readyForItStores.push(store)
            }
        })
        return (
            <div className="row loaderContainer">
                {
                    readyForItStores.map( store => {
                        return(
                            <div key={store.storeNumber} className="col-lg-3 col-md-3 col-sm-6 cardContainer">
                                <div className="card">
                                    <div className="card-block">
                                        <h3 className="card-title"> { store.storeNumber } </h3>
                                        <p className="card-text"> { store.storeName } </p>
                                        <p className="card-text"> Open Date: { store.storeOpen } </p>
                                        <div className="cardStatus">
                                            Status
                                            <div className="statusCircle circleFill"/>
                                        </div>
                                        <a className="btn btn-outline-secondary viewBtn">View</a>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    render() {
        return(
            <div>
                { this.renderStores() }
            </div>
        )
    }
}

ReadyForItLoader.defaultProps = {
    storeData: []
}

export default ReadyForItLoader