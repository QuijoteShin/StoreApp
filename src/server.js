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

        store.save(function(err, store) {
            console.log(store)
            if(err){
                res.send(err)
            }
            res.json(store)
        }) 
    })




//starts the server and listens for requests
app.listen(port, function() {
 console.log(`api running on port ${port}`);
});
