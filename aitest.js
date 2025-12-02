const OpenAI = require('openai');
const { getRokuyo } = require('./fortuna.js');

const aiClient = new OpenAI();

(async () => {
  const rokuyo = getRokuyo();

  console.log(rokuyoToday);

  const response = await aiClient.responses.create({
    model: 'gpt-5-mini',
    instructions: 'You write very short, pithy comments in the style of a fortune cookie. Never use a semicolon or an em dash.',
    input: `This is today's Rokuyō: ${rokuyo}. Write a grounded prediction about the day given this information.`,
    store: false
  });

  console.log(response.output_text);
})();
