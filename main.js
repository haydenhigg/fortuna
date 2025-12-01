// load quotes CSV
const { parse } = require('csv-parse');
const fs = require('fs');

const parser = parse({
  columns: true,
  skip_empty_lines: true
});
const quotes = [];

parser
  .on('readable', () => {
    let record;
    while (record = parser.read()) {
      quotes.push(record);
    }
  })
  .on('error', (err) => {
    console.error(err);
  });

fs.createReadStream('./quotes.csv')
  .pipe(parser)
  .on('end', () => {
    console.log('loaded quotes.csv');
  })
  .on('error', (err) => {
    console.error(err);
  });

// start server
const fastify = require('fastify')({
  logger: true
});

fastify.register(require('@fastify/cookie'));
fastify.register(require('./session.js'));

const sessions = {};

fastify.get('/daily', function (request, reply) {
  if (!Object.hasOwn(sessions, request.token)) {
    let quote;
    do {
      quote = quotes[Math.floor(Math.random() * quotes.length)];
    } while (quote.keywords.includes('bible') || quote.keywords.includes('faith'));

    sessions[request.token] = {
      quote: `${quote.quote} - ${quote.author}`
    };
  }

  const requestDetails = {
    timestamp: new Date(),
    token: request.token
  };

  reply.send(Object.assign(requestDetails, sessions[request.token]));
});

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }

  console.log(`\nserver listening on ${address}`);
});
