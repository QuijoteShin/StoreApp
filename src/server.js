'user strict'

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

const Store = require('./model/Stores.js')

const app = express()
const router = express.Router()

const port = process.env.API_PORT || 3001

mongoose.connect('mongodb://admin:password@ds033015.mlab.com:33015/storeapp')

//API to use bodyParser and look for json data in request body
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


//To prevent errors from Cross Origin Resource Sharing, we will set 
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Credentials', 'true');
 res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
 res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
//and remove cacheing so we get the most recent comments
 res.setHeader('Cache-Control', 'no-cache');
    next();
});
//now we can set the route path & initialize the API
router.get('/', function(req, res) {
    res.json({ message: 'API Initialized!'});
});
//Use our router configuration when we call /api
app.use('/api', router);


//Store API Routes
router.route('/stores')
    .get(function(req, res) {
        Store.find(function(err, stores) {
            if(err){
                res.send(err)
            }
            res.json(stores)
        })
    })
    .post(function(req, res) {
        var store = new Store()
        store.storeNumber = req.body.storeNumber
        store.storeName = req.body.storeName
        store.constStart = req.body.constStart
        store.constEnd = req.body.constEnd
        store.storeOpen = req.body.storeOpen
        store.oldNetworkInfo.internet = req.body.oldNetworkInfo.internet
        store.oldNetworkInfo.phone = req.body.oldNetworkInfo.phone
        store.newNetworkInfo.internet = req.body.newNetworkInfo.internet
        store.newNetworkInfo.phone = req.body.newNetworkInfo.phone
        store.interface = req.body.interface
        store.type = req.body.type


        store.save(function(err, store) {
            console.log(store)
            if(err){
                res.send(err)
            }
            res.json(store)
        }) 
    })
    .put(function(req, res) {
        //console.log('req', req.body)
        Store.findById(req.body._id, function(err, store) {
          if(err){
              console.log(err)
          }

          
            console.log('no error in put server request', store)  
            console.log(req.body)
            store.checkedNetwork = req.body.checkedNetwork
            store.checkedOnline = req.body.checkedOnline
            store.checkedPOS = req.body.checkedPOS
            store.checkedPhone = req.body.checkedPhone
            store.networkEquipmentFinished = req.body.networkEquipmentFinished
            store.phoneEquipmentFinished = req.body.phoneEquipmentFinished
            store.storeITReady = req.body.storeITReady
            store.storeOnline = req.body.storeOnline

            store.save(function(err) {
                if(err) {
                    res.send(err)
                }
                res.json(req.body)
            })
        })
    })





//starts the server and listens for requests
app.listen(port, function() {
 console.log(`api running on port ${port}`);
});
