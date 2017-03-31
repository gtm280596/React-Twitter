const request = require('supertest');

const should = require('should');

const app = require('../app');

const data ={
  userdata : {
    user_id :11,
    username: 'abc',
    mobilenumber: 1234567890,
    email: 'abc@imp.com',
    password: 'password',
    unfollowId: '',
  }
}

describe('POST/registration',  () => {
  it('it should response registration page', (done) => {
    request(app)
    .post('/registration')
    .send(data)
    .expect(201)
    .end((err, res) => {
      if (err) {
        done(err);
      } else {
        res.status.should.be.equal(201);
        done();
      }
    });
  });
});

describe('POST/login',  () => {
  it('it should response login page', (done) => {
    request(app)
    .post('/login')
    .send(data)
    .expect(201)
    .end((err, res) => {
      (res.status.should.be.equal(201));
      done();
      });
    });
  });

describe('GET/logout', () => {
  it('it should response index', (done) => {
    request(app)
    .get('/logout')
    .expect(200, done);
  });
});

