const cheerio = require('cheerio');
const request = require('requestify');

module.exports.faqparse = (faqparsed) => {

  request.get('https://www.reddit.com/r/ReadyOrNotGame/wiki/faq').then(res => {
      const $ = cheerio.load(res.getBody());
      $('#wiki_general_information').nextUntil('#wiki_previous_editions').each((index, element) => {
          if (!$(element).is('p') && !$(element).next().is('blockquote')) return;
          faqparsed.push({ "title":$(element).text(), "entry":$(element).next().text()});
      });
    console.log('Data loaded');
  });
};

