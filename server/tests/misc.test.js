const request = require('supertest-as-promised');
const httpStatus = require('http-status');
const chai = require('chai');
const expect = chai.expect;
const app = require('../../index');

chai.config.includeStack = true;

describe('## Misc', () => {
  describe('# GET /api/health-check', () => {
    it('should return OK', (done) => {
      request(app)
        .get('/api/health-check')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.message).to.equal("OK");
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/404', () => {
    it('should return 404 status', (done) => {
      request(app)
        .get('/api/404')
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.message).to.equal('Not Found');
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/search?q=error OR !success', () => {
    it('should return formatted json', (done) => {
      request(app)
        .get('/api/search')
        .query({q: 'error OR !success'})
        .expect(httpStatus.OK)
        .then((res) => {
          let out = {
              '$or': [
                  'error',
                  {
                      '$not': 'success'
                  }
              ]
          }
          expect(res.body).to.eql(out);
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/search?q=>400 <500', () => {
    it('should return formatted json', (done) => {
      request(app)
        .get('/api/search')
        .query({q: '>400 <500'})
        .expect(httpStatus.OK)
        .then((res) => {
          let out = { "$and": [
                { "$gt": "400" }
              , { "$lt": "500" }
            ]}
          expect(res.body).to.eql(out);
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/search?q=="TEST DATA" OR >len(9)', () => {
    it('should return formatted json', (done) => {
      request(app)
        .get('/api/search')
        .query({q: '="TEST DATA" OR >len(9)'})
        .expect(httpStatus.OK)
        .then((res) => {
          let out = { "$or": [
              {
                  "$eq": {
                      "$quoted": "TEST DATA"
                  }
              }, {
                  "$gt": {
                      "$len": 9
                  }
              }
          ]}
          expect(res.body).to.eql(out);
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/search?q=!false', () => {
    it('should return formatted json', (done) => {
      request(app)
        .get('/api/search')
        .query({q: '!false'})
        .expect(httpStatus.OK)
        .then((res) => {
          let out = { "$not": false }
          expect(res.body).to.eql(out);
          done();
        })
        .catch(done);
    });
  });

  //add more test cases here

});
