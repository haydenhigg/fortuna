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

// start server
const OpenAI = require('openai');
const fastify = require('fastify')({
  logger: true
});
const prefix = '/fortuna'; // TODO: use fastify prefix with plugin

fastify.register(require('@fastify/cookie'));
fastify.register(require('./session.js'));

// const sessions = {};

const aiClient = new OpenAI();

fastify.get(`${prefix}/new`, async (_, reply) => {
  // if (!Object.hasOwn(sessions, request.token)) {
  //   let quote;
  //   do {
  //     quote = quotes[Math.floor(Math.random() * quotes.length)];
  //   } while (quote.keywords.includes('bible') || quote.keywords.includes('faith'));

  //   sessions[request.token] = {
  //     quote: `${quote.quote} - ${quote.author}`
  //   };
  // }

  // let quote;
  // do {
  //   quote = quotes[Math.floor(Math.random() * quotes.length)];
  // } while (!quote.keywords.includes('philosophy') || quote.keywords.includes('love') || quote.keywords.includes('bible') || quote.keywords.includes('faith'));

  // delete quote.keywords;

  const quoteResponse = await aiClient.responses.create({
    model: 'gpt-5-mini',
    input: 'Write a short, pithy, and profound sentence comment on philosophy or psychology in the style of a fortune cookie.',
  });
  const quote = quoteResponse.output_text;

  const requestDetails = {
    timestamp: new Date(),
    token: request.token
  };

  // reply.send(Object.assign(requestDetails, sessions[request.token]));
  reply.send(Object.assign(requestDetails, { quote }));
});

fastify.listen({ port: 8012 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }

  console.log(`\nserver listening on ${address}`);
});
