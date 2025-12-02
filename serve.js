// initialize AI client
const OpenAI = require('openai');
const { getHexagram } = require('./fortuna.js');

var data = {
  fortune: '',
  isLoading: false
};
const aiClient = new OpenAI();

async function refreshFortune() {
  if (data.isLoading) {
    return;
  }

  data.isLoading = true;

  const response = await aiClient.responses.create({
    model: 'gpt-5-mini',
    instructions: 'You write short, pithy comments in the style of a fortune cookie. Never use a semicolon or an em dash.',
    input: `This is a hexagram: ${getHexagram()}. Write a grounded one-line prediction or nugget of wisdom given this information.`,
    store: false
  });

  data.fortune = response.output_text;
  data.isLoading = false;
}

refreshFortune();

// start server
const fastify = require('fastify')({
  logger: true
});
const prefix = '/fortuna'; // TODO: use plugin prefix

fastify.get(`${prefix}/new`, async (request, reply) => {
  reply.send({
    timestamp: new Date(),
    quote: data.fortune
  });

  refreshFortune();
});

fastify.listen({ port: 8012 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }

  console.log(`\nserver listening on ${address}`);
});
