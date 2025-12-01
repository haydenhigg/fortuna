// // load quotes CSV
// const { parse } = require('csv-parse');
// const fs = require('fs');

// const parser = parse({
//   columns: true,
//   skip_empty_lines: true
// });
// const quotes = [];

// parser
//   .on('readable', () => {
//     let record;
//     while (record = parser.read()) {
//       quotes.push(record);
//     }
//   })
//   .on('error', (err) => {
//     console.error(err);
//   });

// fs.createReadStream('./quotes.csv')
//   .pipe(parser)
//   .on('end', () => {
//     console.log('loaded quotes.csv');
//   })
//   .on('error', (err) => {
//     console.error(err);
//   });

// initialize AI client
const OpenAI = require('openai');

const aiClient = new OpenAI();
var quote;

async function newAIResponse() {
  const response = await aiClient.responses.create({
    model: 'gpt-5-mini',
    input: 'Write a short, pithy, vague prediction in the style of a fortune cookie. Don\'t use any semicolons or em dashes.'
  });

  quote = response.output_text;
}

newAIResponse();

// start server
const fastify = require('fastify')({
  logger: true
});
const prefix = '/fortuna'; // TODO: use plugin prefix

fastify.register(require('@fastify/cookie'));
fastify.register(require('./session.js'));

// const sessions = {};

fastify.get(`${prefix}/new`, async (request, reply) => {
  // if (!Object.hasOwn(sessions, request.token)) {
  //   sessions[request.token] = { quote };
  // }

  reply.send({
    timestamp: new Date(),
    token: request.token,
    quote // sessions[request.token]
  });

  newAIResponse();
});

fastify.listen({ port: 8012 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }

  console.log(`\nserver listening on ${address}`);
});
