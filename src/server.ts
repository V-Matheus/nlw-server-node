import fastify from 'fastify';
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import { generateSlug } from './utils/generate-slug';

const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

const prisma = new PrismaClient({
  log: ['query'],
});

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

app.withTypeProvider<ZodTypeProvider>().post(
  '/events',
  {
    schema: {
      body: z.object({
        title: z.string().min(4),
        details: z.string().nullable(),
        maximumAttendees: z.number().int().positive().nullable(),
      }),
      response: { 201: z.object({ eventId: z.string().uuid() }) },
    },
  },
  async (request, reply) => {
    const { title, details, maximumAttendees } = request.body;
    const slug = generateSlug(title);

    const eventWithSameSlug = await prisma.event.findUnique({
      where: { slug },
    });

    if (eventWithSameSlug !== null) {
      throw new Error('Another event with same title alredy exists.');
    }
    const event = await prisma.event.create({
      data: {
        title,
        details,
        maximumAttendees,
        slug,
      },
    });

    return reply.status(201).send({ eventId: event.id });
  },
);

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP Server Running');
});
