const objectToArray = (obj) => Object.entries(obj)
const swapArray = (array) => { return array.map((v, i, a) => { const n = []; n[0] = v[1]; n[1] = v[0]; return n }) }
const objectToArraySwap = (obj) => swapArray(objectToArray(obj))

const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

const americanTitles = Object.entries(americanToBritishTitles)
const americanWords = [...americanTitles, ...Object.entries({ ...americanOnly, ...americanToBritishSpelling })];

const britishToAmericanSpelling = objectToArraySwap(americanToBritishSpelling)
const britishTitles = objectToArraySwap(americanToBritishTitles)
const britishWords = [...britishTitles, ...Object.entries(britishOnly), ...britishToAmericanSpelling];

const SPAN_INIT = '<span class="highlight">'
const SPAN_END = '</span>'

class Translator {
  constructor(highlight = true) {
    this.highlight = highlight
  }

  spanText(word) {
    if (this.highlight) {
      return `${SPAN_INIT}${word}${SPAN_END}`
    }
    return word
  }
  translateSentence(sentence, locale) {
    if (sentence == '') { return { error: 'No text to translate' } }
    if (!locale || !sentence) { return { error: 'Required field(s) missing' } }
    if (!(locale == 'american-to-british' || locale == 'british-to-american')) { return { error: 'Invalid value for locale field' } }

    const lowerWord = sentence.toLowerCase();
    const isAmerican = locale == 'american-to-british'
    const localeWords = (isAmerican) ? americanWords : britishWords
    let translatedSentence = `${sentence}`;
    let auxSentence = `${translatedSentence}`
    localeWords.forEach((v, i, a) => {
      const searcher = v[0].replace('.', '\\.')
      const reg = (new RegExp("(?<=[^a-zé']|\\b)" + searcher.toLowerCase() + "(?=[^a-zé']|\\b)", 'gi'))
      const auxWord = auxSentence.replace(reg, '');
      if (auxWord != auxSentence) {
        translatedSentence = translatedSentence.replace(reg, ((v[1] + v[0]).includes('.')) ? this.spanText(v[1][0].toUpperCase() + v[1].substring(1)) : (this.spanText(v[1])))
        auxSentence = auxWord
      }
    })
    const regexTime = (new RegExp("([\\d]{1,2})(\\" + ((isAmerican) ? ':' : '.') + ")([\\d]{1,2})", 'gi'));
    const matchTime = regexTime.exec(translatedSentence)
    if (matchTime) {
      translatedSentence = translatedSentence.replace(regexTime, this.spanText(matchTime[1] + ((isAmerican) ? '.' : ':') + matchTime[3]))
    }
    if (translatedSentence == sentence) { return 'Everything looks good to me!' }
    return translatedSentence
  }
  translateWordC(word, locale) {
    if (!(locale == 'american-to-british' || locale == 'british-to-american')) { return { error: 'Locale' } }
    if (!word) { return '' }
    const regexWord = /^([a-z\'é]+(?:\-?[a-z\'é]+)?)([^a-z]+)?$/g
    const regexTitle = /^([a-z]+\.?)([^a-z]+)?$/g
    const regexTitleWithoutDot = /^([a-z]+)([^a-z]+)?$/g
    const regexTime = /^(.*?)([\d]{1,2})(\:|\.)([\d]{1,2})(.*?)$/g

    const lowerWord = word.toLowerCase();

    const matchesWord = regexWord.exec(lowerWord);
    const matchesTitle = regexTitle.exec(lowerWord);
    const matchesTitleWithoutDot = regexTitleWithoutDot.exec(lowerWord);
    const matchesTime = regexTime.exec(lowerWord);

    const isAmerican = locale == 'american-to-british'

    const localeWords = (isAmerican) ? americanWords : britishWords
    const localeTitles = (isAmerican) ? americanTitles : britishTitles
    const localeTime = (isAmerican) ? [':', '.'] : ['.', ':']
    const matchTitle = (isAmerican) ? matchesTitle : matchesTitleWithoutDot;
    if (matchesWord) {
      {
        let result = localeWords.find(v => matchesWord[1].toLowerCase() === v[0]);
        if (result) { return this.spanText(result[1]) + ((matchesWord[2]) ? matchesWord[2] : '') }
      }
    }

    if (matchTitle) {
      let result = localeTitles.find(v => matchesTitle[1].toLowerCase() === v[0]);
      if (result) { return this.spanText(result[1][0].toUpperCase() + result[1].substring(1)) + ((matchesTitle[2]) ? matchesTitle[2] : '') }
    }
    if (matchesTime) {
      if (matchesTime[2] && matchesTime[3] && matchesTime[4]) {
        if (matchesTime[3] == localeTime[0]) {
          return ((matchesTime[1]) ? matchesTime[1] : '') + this.spanText(matchesTime[2] + localeTime[1] + matchesTime[4]) + ((matchesTime[5]) ? matchesTime[5] : '')
        }
      }
    }
    return word
  }

  translateSentenceC(sentence, locale) {
    if (!(locale == 'american-to-british' || locale == 'british-to-american')) { return { error: 'Locale' } }

    const words = sentence.split(' ')
    let skipWords = []
    const translationWords = words.map((v, i, a) => {
      let wordTranslated = this.translateWord(v, locale)
      let differentWord = false;
      if (!(wordTranslated == a[i])) { differentWord = true }

      if (i == 0 && !differentWord) { wordTranslated = wordTranslated[0].toUpperCase() + wordTranslated.substring(1); }

      return wordTranslated
    })

    let translationSentence = translationWords.join(' ')

    if (translationSentence == sentence) { return 'Everything looks good to me!' }

    return translationSentence
  }
}

module.exports = Translator;