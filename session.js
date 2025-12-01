const makeCookieFrom = (token) => {
  const expiresAt = new Date();
  expiresAt.setHours(0, 0, 0, 0);
  expiresAt.setDate(expiresAt.getDate() + 1);

  return `token=${token}; expires=${expiresAt.toUTCString()}`;
}

const initialize = async (request, reply) => {
  request.token = crypto.randomUUID();
  reply.header('set-cookie', makeCookieFrom(request.token));
};

module.exports = (fastify, _, done) => {
  fastify.addHook('preHandler', async (request, reply) => {
    if (!Object.hasOwn(request.cookies, 'token')) {
      await initialize(request, reply);
    } else {
      request.token = request.cookies.token;
    }
  });

  fastify.get('/session', async (request, reply) => {
    reply.send({ token: request.token });
  });

  fastify.post('/session', async (request, reply) => {
    await initialize(request, reply);

    reply.statusCode = 201;
    reply.send({ token: request.token });
  });

  done();
};
