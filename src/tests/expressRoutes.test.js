const request = require('supertest');
const app = require('../../server');

test('GET - Receive a successful response', (done) => {
    request(app).get('/api/all-factories').then((response) => {
        expect(response.statusCode).toBe(200);
        done();
    });
});

test('POST - Create a factory with valid inputs', (done) => {
    const data = {
        name: 'Test Factory', 
        generateChildren: true,
        lowerBound: 0, 
        upperBound: 10, 
        numChildren: 15
    }
    request(app)
      .post('/api/create-factory')
      .send(data)
      .set('Accept', 'application/json')
      .expect(201)
      .end(function(err, res) {
        if (err){
            return done(err);
        }
        done();
      });
});

test('POST - Create a factory with invalid inputs - no children params', (done) => {
    const data = {
        name: 'Test Factory', 
        generateChildren: true,
        lowerBound: null, 
        upperBound: null, 
        numChildren: null
    }
    request(app)
      .post('/api/create-factory')
      .send(data)
      .set('Accept', 'application/json')
      .expect(501)
      .end(function(err, res) {
        if (err){
            return done(err);
        }
        done();
      });
});

test('POST - Create a factory with invalid inputs - too many children', (done) => {
    const data = {
        name: 'Test Factory', 
        generateChildren: true,
        lowerBound: 5, 
        upperBound: 7, 
        numChildren: 16
    }
    request(app)
      .post('/api/create-factory')
      .send(data)
      .set('Accept', 'application/json')
      .expect(501)
      .end(function(err, res) {
        if (err){
            return done(err);
        }
        done();
      });
});

test('POST - Create a factory with invalid inputs - invalid bounds', (done) => {
    const data = {
        name: 'Test Factory', 
        generateChildren: true,
        lowerBound: 10, 
        upperBound: 7, 
        numChildren: 10
    }
    request(app)
      .post('/api/create-factory')
      .send(data)
      .set('Accept', 'application/json')
      .expect(501)
      .end(function(err, res) {
        if (err){
            return done(err);
        }
        done();
      });
});