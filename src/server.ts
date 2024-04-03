import fastify from 'fastify';

import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';

import {
  serializerCompiler,
  validatorCompiler,
  jsonSchemaTransform,
} from 'fastify-type-provider-zod';
import { createEvent } from './routes/create-events';
import { registerForEvent } from './routes/register-for-event';
import { getEvent } from './routes/get-event';
import { getAttendeeBadge } from './routes/get-attendees-badge';
import { chekcIn } from './routes/check-in';
import { getEventAttendees } from './routes/get-event-attendees';

const app = fastify();

app.register(fastifySwagger, {
  swagger: {
    consumes: ['application/json'],
    produces: ['application/json'],
    info: {
      title: 'pass.in',
      description:
        'Especificações da API para o back-end da aplicação pass.in construída durante o NLW Unite da Rocketseat.',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, { routePrefix: '/docs' });

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
app.register(getEvent);
app.register(getAttendeeBadge);
app.register(chekcIn);
app.register(getEventAttendees);

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP Server Running');
});
