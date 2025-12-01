const OpenAI = require('openai');

const aiClient = new OpenAI();

(async () => {
  const response = await aiClient.responses.create({
    model: 'gpt-5-mini',
    input: 'Write a short, pithy, vague prediction in the style of a fortune cookie. Don\'t use any semicolons or em dashes.'
  });

  console.log(response.output_text);
})();
