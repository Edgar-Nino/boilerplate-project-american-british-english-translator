const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');



suite('Functional Tests', () => {
  test('Translation with text and locale fields: POST request to /api/translate', function(done) {
    chai.request(server)
      .post('/api/translate')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({ text: "favorite", locale: "american-to-british" })
      .end((error, res) => {
        assert.equal(res.status, 200)
        assert.propertyVal(res.body, 'translation', '<span class="highlight">favourite</span>')
        assert.propertyVal(res.body, 'text', 'favorite')
        
        done()
      })
  })

  test('Translation with text and invalid locale field: POST request to /api/translate', function(done) {
    chai.request(server)
      .post('/api/translate')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({ text: "favorite", locale: "spanish-to-american" })
      .end((err, res) => {
        const { error } = res.body
        assert.equal(res.status, 200)
        assert.propertyVal(res.body, 'error', 'Invalid value for locale field')
        done()
      })
  });

  test('Translation with missing text field: POST request to /api/translate', function(done) {
    chai.request(server)
      .post('/api/translate')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({ locale: "american-to-british" })
      .end((err, res) => {
        
        const { error } = res.body
        assert.equal(res.status, 200)
        assert.propertyVal(res.body, 'error', 'Required field(s) missing')
        done()
      })
  });

  test('Translation with missing locale field: POST request to /api/translate', function(done) {
    chai.request(server)
      .post('/api/translate')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({ text: "hi" })
      .end((err, res) => {
        const { error } = res.body
        assert.equal(res.status, 200)
        assert.propertyVal(res.body, 'error', 'Required field(s) missing')
        done()
      })
  });

  test('Translation with empty text: POST request to /api/translate', function(done) {
    chai.request(server)
      .post('/api/translate')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({ text: "", locale: "american-to-british" })
      .end((err, res) => {
        const { error } = res.body
        assert.equal(res.status, 200)
        assert.propertyVal(res.body, 'error', 'No text to translate')
        done()
      })
  });

  test('Translation with text that needs no translation: POST request to /api/translate', function(done) {
    chai.request(server)
      .post('/api/translate')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({ text: "Hello", locale: "american-to-british" })
      .end((error, res) => {
        assert.equal(res.status, 200)
        assert.propertyVal(res.body, 'translation', 'Everything looks good to me!')
        assert.propertyVal(res.body, 'text', 'Hello')
        done()
      })
  })
})
