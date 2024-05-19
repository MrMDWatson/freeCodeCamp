/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

let bookTest;

suite('Functional Tests', function() {

  /*
  * ----[EXAMPLE TEST]----
  * Each test should completely test the response of the API end-point including response status code!
  
  test('#example Test GET /api/books', function(done){
     chai.request(server)
      .get('/api/books')
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.isArray(res.body, 'response should be an array');
        assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
        assert.property(res.body[0], 'title', 'Books in array should contain title');
        assert.property(res.body[0], '_id', 'Books in array should contain _id');
        done();
      });
  });
  
  * ----[END of EXAMPLE TEST]----
  */

  suite('Routing tests', function() {


    suite('POST /api/books with title => create book object/expect book object', function() {
      
      test('Test POST /api/books with title', function(done) {
        chai.request(server)
          .post('/api/books')
          .send({title: "Test Book"})
          .end((err, res) => {
            bookTest = res.body;
            assert.equal(res.status, 200);
            assert.property(res.body, "_id");
            assert.equal(res.body.title, "Test Book");
            done();
          });
      });
      
      test('Test POST /api/books with no title given', function(done) {
        chai.request(server)
          .post('/api/books')
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body, "missing required field title");
            assert.isUndefined(res.body.title);
            done();
          });
      });
      
    });


    suite('GET /api/books => array of books', function(){
      
      test('Test GET /api/books',  function(done){
        chai.request(server)
          .get('/api/books')
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.isArray(res.body);
            assert.property(res.body[0], "title");
            done();
          });
      });      
      
    });


    suite('GET /api/books/[id] => book object with [id]', function(){
      
      test('Test GET /api/books/[id] with id not in db',  function(done){
        chai.request(server)
          .get(`/api/books/65cea492340a77c04cca7bbc`)
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body, "no book exists");
            assert.isUndefined(res.body.title);
            done();
          });
      });
      
      test('Test GET /api/books/[id] with valid id in db',  function(done){
        chai.request(server)
          .get(`/api/books/${bookTest._id}`)
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body._id, bookTest._id);
            assert.property(res.body, "title");
            done();
          });
      });
      
    });


    suite('POST /api/books/[id] => add comment/expect book object with id', function(){
      
      test('Test POST /api/books/[id] with comment', function(done){
        chai.request(server)
          .post(`/api/books/${bookTest._id}`)
          .send({comment: "Test comment"})
          .end((err, res) => {
            bookTest = res.body;
            assert.equal(res.status, 200);
            assert.property(res.body, "_id");
            assert.equal(res.body._id, bookTest._id);
            assert.equal(res.body.comments[0], "Test comment");
            done();
          });
      });

      test('Test POST /api/books/[id] without comment field', function(done){
        chai.request(server)
          .post(`/api/books/${bookTest._id}`)
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.isUndefined(res.body.title);
            assert.equal(res.body, "missing required field comment");
            done();
          });
      });

      test('Test POST /api/books/[id] with comment, id not in db', function(done){
        chai.request(server)
          .post(`/api/books/65cea492340a77c04cca8bbd`)
          .send({comment: "Test comment"})
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body, "no book exists");
            assert.isUndefined(res.body.title);
            done();
          });
      });
      
    });

    suite('DELETE /api/books/[id] => delete book object id', function() {

      test('Test DELETE /api/books/[id] with valid id in db', function(done){
        chai.request(server)
          .delete(`/api/books/${bookTest._id}`)
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body, "delete successful");
            done();
          });
      });

      test('Test DELETE /api/books/[id] with  id not in db', function(done){
        chai.request(server)
          .delete(`/api/books/65cea492340a77c04cca8bbd`)
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body, "no book exists");
            done();
          });
      });

    });

  });

});
