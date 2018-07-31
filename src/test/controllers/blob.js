import should from 'should';
import request from 'supertest';
import server from '../../index';
import Blob from '../../models/blob';


describe('controllers', () => {
  describe('Blob', () => {
    var blobId;

    before(done => {
      Blob.remove({}, done);
    });

    after(done => {
      Blob.remove({}, done);
    })

    describe('POST /api/blob', () => {
      it('should be able to store blob', done => {
        request(server)
          .post('/api/blob')
          .send({
            wow: 'such wow doge'
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(201)
          .end((err, res) => {
            should.not.exists(err);
            blobId = res.body.id;
            assert.isString(blobId);
            done();
          });
      });
    });

    describe('GET /api/blob/{id}', () => {
      it('it should return 404', done => {
        request(server)
          .get('/api/blob/123')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(404)
          .end(() => {
            done();
          });
      });

      it('should get correct blob by id', done => {
        request(server)
          .get(`/api/blob/${blobId}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            should.not.exists(err);
            assert.isObject(res.body);
            assert.equal(res.body.wow, 'such wow doge');
            done();
          });
      });
    });
  });
});
