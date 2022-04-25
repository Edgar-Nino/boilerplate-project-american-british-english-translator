const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');

const highlightTranslator = new Translator(true)
const translator = new Translator(false)

suite('Unit Tests', () => {
  test("Mangoes are my favorite fruit.", function() {
    assert.equal(translator.translateSentence("Mangoes are my favorite fruit.", "american-to-british"), "Mangoes are my favourite fruit.")
  })
  test("I ate yogurt for breakfast.", function() {
    assert.equal(translator.translateSentence("I ate yogurt for breakfast.", "american-to-british"), "I ate yoghurt for breakfast.")
  })
  test("We had a party at my friend's condo.", function() {
    assert.equal(translator.translateSentence("We had a party at my friend's condo.", "american-to-british"), "We had a party at my friend's flat.")
  })
  test("Can you toss this in the trashcan for me?", function() {
    assert.equal(translator.translateSentence("Can you toss this in the trashcan for me?", "american-to-british"), "Can you toss this in the bin for me?")
  })
  test("The parking lot was full", function() {
    assert.equal(translator.translateSentence("The parking lot was full", "american-to-british"), "The car park was full")
  })
  test("Like a high tech Rube Goldberg machine", function() {
    assert.equal(translator.translateSentence("Like a high tech Rube Goldberg machine", "american-to-british"), "Like a high tech Heath Robinson device")
  })
  test("To play hooky means to skip class or work", function() {
    assert.equal(translator.translateSentence("To play hooky means to skip class or work", "american-to-british"), "To bunk off means to skip class or work")
  })
  test("No Mr. Bond, I expect you to die", function() {
    assert.equal(translator.translateSentence("No Mr. Bond, I expect you to die", "american-to-british"), "No Mr Bond, I expect you to die")
  })
  test("Dr. Grosh will see you now", function() {
    assert.equal(translator.translateSentence("Dr. Grosh will see you now", "american-to-british"), "Dr Grosh will see you now")
  })
  test("Lunch is at 12:15 today", function() {
    assert.equal(translator.translateSentence("Lunch is at 12:15 today", "american-to-british"), "Lunch is at 12.15 today")
  })
  test("We watched the footie match for a while.", function() {
    assert.equal(translator.translateSentence("We watched the footie match for a while.", "british-to-american"), "We watched the soccer match for a while.")
  })
  test("Paracetamol takes up to an hour to work.", function() {
    assert.equal(translator.translateSentence("Paracetamol takes up to an hour to work.", "british-to-american"), "Tylenol takes up to an hour to work.")
  })
  test("First, caramelise the onions.", function() {
    assert.equal(translator.translateSentence("First, caramelise the onions.", "british-to-american"), "First, caramelize the onions.")
  })
  test("I spent the bank holiday at the funfair.", function() {
    assert.equal(translator.translateSentence("I spent the bank holiday at the funfair.", "british-to-american"), "I spent the public holiday at the carnival.")
  })
  test("I had a bicky then went to the chippy.", function() {
    assert.equal(translator.translateSentence("I had a bicky then went to the chippy.", "british-to-american"), "I had a cookie then went to the fish-and-chip shop.")
  })
  test("I've just got bits and bobs in my bum bag. ", function() {
    assert.equal(translator.translateSentence("I've just got bits and bobs in my bum bag.", "british-to-american"), "I've just got odds and ends in my fanny pack.")
  })
  test("The car boot sale at Boxted Airfield was called off.", function() {
    assert.equal(translator.translateSentence("The car boot sale at Boxted Airfield was called off.", "british-to-american"), "The swap meet at Boxted Airfield was called off.")
  })
  test("Have you met Mrs Kalyani?", function() {
    assert.equal(translator.translateSentence("Have you met Mrs Kalyani?", "british-to-american"), "Have you met Mrs. Kalyani?")
  })
  test("Prof Joyner of King's College, London.", function() {
    assert.equal(translator.translateSentence("Prof Joyner of King's College, London.", "british-to-american"), "Prof. Joyner of King's College, London.")
  })
  test("Tea time is usually around 4 or 4.30.", function() {
    assert.equal(translator.translateSentence("Tea time is usually around 4 or 4.30.", "british-to-american"), "Tea time is usually around 4 or 4:30.")
  })

  test("Highlight Mangoes are my favorite fruit.", function() {
    assert.equal(highlightTranslator.translateSentence("Mangoes are my favorite fruit.", "american-to-british"), 'Mangoes are my <span class="highlight">favourite</span> fruit.')
  })

  test("Highlight I ate yogurt for breakfast.", function() {
    assert.equal(highlightTranslator.translateSentence("I ate yogurt for breakfast.", "american-to-british"), 'I ate <span class="highlight">yoghurt</span> for breakfast.')
  })

  test("Highlight We watched the footie match for a while.", function() {
    assert.equal(highlightTranslator.translateSentence("We watched the footie match for a while.", "british-to-american"), 'We watched the <span class="highlight">soccer</span> match for a while.')
  })

  test("Highlight Paracetamol takes up to an hour to work.", function() {
    assert.equal(highlightTranslator.translateSentence("Paracetamol takes up to an hour to work.", "british-to-american"), '<span class="highlight">Tylenol</span> takes up to an hour to work.')
  })
});
