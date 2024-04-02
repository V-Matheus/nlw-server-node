import fastify from 'fastify';

const app = fastify();

// Métodos HTTP: GET, POST, PUT, DELETE, PATCH, HEAD,OPTIONS, ...

// Corpo de requisiçã (request body)
// Parâmetros de busca (Search Params / Query Params)
// Parâmetros de rotas
// Cabeçalhos

// SOAP, REST

app.get('/', () => {
  return 'Hello NLW Unite';
});

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP Server Running');
});
