import * as chai from 'chai';
import { expect, should } from 'chai';
import { server } from './../app/app';
import { getCheckinCount, remove } from './../app/user';

chai.use(require('chai-http'));

const PATH = '/api/v1/users';
const user = {'email': 'david.p.dimaria@gmail.com', 'firstName': 'David', 'lastName': 'DiMaria', 'phone': '999-999-9999'};

describe('routes: users', () => {

  beforeEach(() => {
    // return remove(user.phone);
  });

  after(() => {
    return remove(user.phone);
  });

  describe(`GET /`, () => {
    it('should not error on the default route', done => {
      chai
        .request(server)
        .get(`/`)
        .end((err, res) => {
          isOk(err, res, 200, 'text/plain');
          done();
        });
    });
  });

  describe(`GET /healthcheck`, () => {
    it('should healthcheck', done => {
      chai
        .request(server)
        .get(`/healthcheck`)
        .end((err, res) => {
          isOk(err, res, 200, 'text/plain');
          done();
        });
    });
  });

  describe(`POST ${PATH}`, () => {
    remove(user.phone);

    it('should create a user', done => {
      chai
        .request(server)
        .post(`${PATH}`)
        .send(user)
        .end((err, res) => {
          isOk(err, res, 200);
          done();
        });
    });

    it('should have the correct checkins', done => {
      const count = getCheckinCount(user.phone);
      expect(count).to.eql(1);
      done();
    });

    it('should error with incomplete information', done => {
      const incomplete = { ...user, phone: '' };
      chai
        .request(server)
        .post(`${PATH}`)
        .send(incomplete)
        .end((err, res) => {
          res.status.should.eql(422);
          done();
        });
    });
  });

  describe(`GET ${PATH}/${user.phone}`, () => {
    it('should return a single user', done => {
      chai
        .request(server)
        .get(`${PATH}/${user.phone}`)
        .end((err, res) => {
          isOk(err, res);
          res.body.should.include.keys('phone', 'firstName', 'lastName', 'email');
          done();
        });
    });
  });

  describe(`POST ${PATH}`, () => {
    it('should return a 422 when creating a duplicate user', done => {
      chai
        .request(server)
        .post(`${PATH}`)
        .send(user)
        .end((err, res) => {
          res.status.should.eql(422);
          done();
        });
    });
  });

});

const isOk = (err: any, res: any, status: number = 200, type: string = 'application/json') => {
  should().not.exist(err);
  res.status.should.eql(status);
  res.type.should.eql(type);
};