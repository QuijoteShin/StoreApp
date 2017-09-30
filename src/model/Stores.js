'user strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const storeSchema = new Schema({
    storeNumber: String,
    storeName: String,
    constStart: String,
    constEnd: String,
    storeOpen: String,
    itComments: [ 
        {
            techName: String,
            submitDate: String,
            notes: String
        }
    ]
})

module.exports = mongoose.model('Store', storeSchema)