'use strict';

require('assert');
var chai = require('chai');
var chaiHttp = require('chai-http');
var start = require('../lib/app');
var mainApp = start();
chai.use(chaiHttp);
if (!global.Promise) {
  // Checks to see if there is a global promise
  var q = require('q');
  chai.request.addPromises(q.Promise);
}
var expect = chai.expect;

describe('Test passport authentication', function () {

  // Used for running crud need the values of what I created in the database
  var server;
  var chaiRequest;
  var app;

  before(function (done) {
    server = mainApp.start(done);
    app = mainApp.app;
    chaiRequest = chai.request(app);
  });

  it('should render the not authorized page with a message saying you cannot log in until you have signed in or up', function (done) {
    chaiRequest.get('/home')
      .then(function (response) {
        var notAuthorized = response.text.search('Not Authorized')
        expect(notAuthorized).to.not.equal(-1); // would equal negative 1 if the word was not found
        expect(response).to.have.status(200);
        done();
      })
      .catch(done);
  });

  it('should register a new user named john with password abc and redirect you to login page', function (done) {
    chai.request.agent(app).post('/register')
      .send({"username": "john", "newpassword": "abc", "password":"abc"})
      .then(function (response) {
        expect(response).to.have.status(200);
        console.log(response.text);
        var notAuthorized = response.text.search('Not Authorized')
        expect(notAuthorized).to.deep.equal(-1); // this wont exist if the login passes
        return chai.request.agent(app).get('/logout');
      })
      .then(function(response){
        done();
      })
      .catch(done);
  });

  it('should sign you into the home page allowing you access', function (done) {
    chai.request.agent(app).post('/login')
      .send({"username": "john", "password": "abc"})
      .then(function (response) {
        expect(response).to.have.status(200);
        var notAuthorized = response.text.search('Not Authorized')
        expect(notAuthorized).to.deep.equal(-1); // this wont exist if the login passes
        done();
      })
      .catch(done);
  });

  after(function (done) {
    server.close(done);
  });
});
