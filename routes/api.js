'use strict';

const Translator = require('../components/translator.js');

module.exports = function(app) {

  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      try {
        const { text, locale } = req.body
        
        const translation = translator.translateSentence(text, locale)
        if (translation.error) { res.json(translation); return }
        res.json({ translation, text })
      }
      catch (err) {
        res.json({ error: err.message })
      }
    });
};
