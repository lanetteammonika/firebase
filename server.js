var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');


var MongoClient = require('mongodb').MongoClient;
var db;
var mongo = require('mongodb-wrapper');
//Establish Connection
MongoClient.connect('mongodb://127.0.0.1:27017/empdb', function (err, database) {
    if (err)
        throw err
    else
    {
        db = database;
        console.log('Connected to MongoDB');
        //Start app only after connection is ready
        app.listen(4000);

    }
});


app.use(bodyParser.json());
app.use(cors());

app.get('/', function(req, res) {
    db.collection("Users").find({}).toArray(function(err, result) {
        if (err) throw err;
        //console.log(result);

        res.send(result);

    });
});

app.post('/insert', function(req, res) {

    db.collection("Users").insert(req.body, function (err) {
        if (err)
            res.send('Error');
        else
            res.send('Success');

    });
});

app.delete('/delete/:_id', function(req, res){
    // console.log(req.params._id);
    var id = new mongo.ObjectID(req.params._id);
    //console.log(id);
    db.collection("Users").remove({_id:id},function(err){

        if (err)
            res.send('err');
        else
            res.send('Success');
    });
});

app.post('/update/:_id', function(req, res) {

    //console.log(req.body);
    //console.log(req.params._id);
    var id = new mongo.ObjectID(req.params._id);
    db.collection("Users").update({_id:id},req.body, function (err) {
        if (err)
            res.send('Error');
        else
            res.send('Success');

    });
});