const request = require('supertest');

describe('/items tests', () => {
    const connectionString = 'mongodb://localhost/PetVetDb-test';
    let app = null;

    beforeEach(() => {
        return Promise.resolve()
            .then(() => require('../../db').init(connectionString))
            .then((db) => require('../../data').init(db))
            .then((data) => require('../../app').init(data))
            .then((_app) => {
                app = _app;
            });
    });

    describe('POST /animals', () => {
        it('expect to return 302 (Found)', (done) => {
            request(app)
                .post('/animals')
                .expect(302)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });

    describe('PUT /animals', () => {
        it('expect to return 302 (Found)', (done) => {
            request(app)
                .put('/animals')
                .expect(302)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });
});
