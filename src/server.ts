import fastify from 'fastify';
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';
import { createEvent } from './routes/create-events';
import { registerForEvent } from './routes/register-for-event';

const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

// Métodos HTTP: GET, POST, PUT, DELETE, PATCH, HEAD,OPTIONS, ...

// Corpo de requisiçã (request body)
// Parâmetros de busca (Search Params / Query Params)
// Parâmetros de rotas
// Cabeçalhos

// SOAP, REST

// 20x => Sucess
// 30x => Redirecionamento
// 40x => Error do cliente (Error em alguma informação enviada por quem está fazendo a chamada para a API)
// 500x => Error do servidor (Um Error que está acontecendo independente do que está sendo enviado para o servidor)

app.register(createEvent);
app.register(registerForEvent);

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP Server Running');
});
