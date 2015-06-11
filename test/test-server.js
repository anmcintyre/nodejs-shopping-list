var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');

var should = chai.should();
var app = server.app;
var storage = server.storage;

chai.use(chaiHttp);

describe('Shopping List', function() {
    it('should list items on get', function(done){
      chai.request(app)
        .get('/items')
        .end(function(err, res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body.should.have.length(3);
            res.body[0].should.be.a('object');
            res.body[0].should.have.property('id');
            res.body[0].should.have.property('name');
            res.body[0].id.should.be.a('number');
            res.body[0].name.should.be.a('string');
            res.body[0].name.should.equal('Broad beans');
            res.body[1].name.should.equal('Tomatoes');
            res.body[2].name.should.equal('Peppers');
            done();
      });
    });
    it('should add an item on post', function(done){
        chai.request(app)
           .post('/items/')
           .send({name: 'Bananas'})
           .end(function(err, res){
               res.should.have.status(201);
               res.should.be.json;
               res.body.should.be.a('object');
               res.body.should.have.property('id');
               res.body.should.have.property('name');
               res.body.id.should.be.a('number');
               res.body.name.should.equal('Bananas');
               done();
        });
    });
    it('should edit an item on put', function(done){
        chai.request(app)
           .put('/items/0')
           .send({'name': 'Green Beans'})
           .end(function(err, res){
               res.should.have.status(201);
               res.should.be.json;
               res.body.should.be.a('object');
               res.body.should.have.property('id');
               res.body.should.have.property('name');
               res.body.id.should.be.a('number');
               res.body.id.should.be.equal(0);
               res.body.name.should.equal('Green Beans');
              done();
        });
    });
    it('should delete an item on delete');
    it('should responds correctly if trying to delete an item that does not exist');
    it('should respond correctly if trying to edit an item that does not exist');
});