const OpenAI = require('openai');

const aiClient = new OpenAI();

(async () => {
  const response = await aiClient.responses.create({
    model: 'gpt-5-mini',
    input: 'Write a short, pithy, grounded comment on philosophy or psychology in the style of a daily horoscope. Don\'t use any semicolons or em dashes.'
  });

  console.log(response.output_text);
})();
