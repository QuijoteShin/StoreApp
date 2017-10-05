'user strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const storeSchema = new Schema({
    storeNumber: String,
    storeName: String,
    constStart: String,
    constEnd: String,
    storeOpen: String,
    itComments: {
            techName: String,
            submitDate: String,
            notes: String
    },
    oldNetworkInfo: {
            internet: String,
            phone: String,
    },
    newNetworkInfo: {
            internet: String,
            phone: String,
    },
    interface: Boolean,
    posEquipmentFinished: Boolean,
    networkEquipmentFinished: Boolean,
    storeOnline: Boolean
})

module.exports = mongoose.model('Store', storeSchema)