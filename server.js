var express = require('express');
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

var Storage = function() {
    this.items = [];
    this.id = 0;
};

Storage.prototype.add = function(name) {
    var item = {name: name, id: this.id};
    this.items.push(item);
    this.id += 1;
    return item;
};

var storage = new Storage();
storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');

var app = express();
app.use(express.static('public'));

app.get('/items', function(req, res) {
    res.json(storage.items);
});

app.post('/items', jsonParser, function(req, res) {
    if (!req.body) {
        return res.sendStatus(400);
    }
    var name = req.body.name;
    if (name === null){
      res.status(404).end();
    }      
    var item = storage.add(req.body.name);
    res.status(201).json(item);    
});

app.put('/items/:id', jsonParser, function(req, res){
    var id = req.params.id;
    var item = null;
    for (var i=0; i<storage.items.length; i++){
        if (storage.items[i].id === parseInt(id)){                      
            storage.items[i].name=req.body.name
            item = storage.items[i];
            break;
        }
    }
    if (item === null){
      res.status(404).end();
      return;
    }
    res.status(200).json(item);
})

app.delete('/items/:id', jsonParser, function(req, res){
    var id = req.params.id;
    var delItem = null;
    for (var i=0; i<storage.items.length; i++){
        if (storage.items[i].id === parseInt(id)){
            delItem = storage.items[i];
            storage.items.splice(i, 1);
            break;
        }
    }
    if (delItem === null){
       res.status(404).end();
       return;
    }
    res.status(200).json(delItem);
});



app.listen(process.env.PORT || 8080);

exports.app = app;
exports.storage = storage;