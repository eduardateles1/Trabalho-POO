import { z } from 'zod';
import { prisma } from './lib/prisma';
import { FastifyRequest, FastifyInstance } from 'fastify';

export async function AppRoutes(server: FastifyInstance) {
  server.get('/mensagem', async () => {
    const mensagens = await prisma.mensagem.findMany();
    return mensagens;
  });

  server.get('/mensagem/:id', async (request: FastifyRequest) => {
    const idParam = z.object({
      id: z.string().uuid(),
    });
    const { id } = idParam.parse(request.params);
    const mensagem = await prisma.mensagem.findFirst({
      where: {
        id,
      },
    });
    return mensagem;
  });
  
  server.post('/mensagem', async (request) => {
    const mensagemBody = z.object({
      titulo: z.string(),
      conteudo: z.string(),
      publicado: z.boolean(),
      qtdLikes: z.number(),
    });
    const { titulo, conteudo, publicado, qtdLikes } = mensagemBody.parse(
      request.body
    );
    const novaMensagem = await prisma.mensagem.create({
      data: {
        titulo,
        conteudo,
        publicado,
        qtdLikes,
      },
    });
    return novaMensagem;
  });

  server.patch('/mensagem/:id', async (request) => {
    const idParam = z.object({
      id: z.string().uuid(),
    });
    const { id } = idParam.parse(request.params);
    const mensagemBody = z.object({
      titulo: z.string(),
      conteudo: z.string(),
      publicado: z.boolean(),
      qtdLikes: z.number(),
    });
    const { titulo, conteudo, publicado, qtdLikes } = mensagemBody.parse(
      request.body
    );
    const mensagemAtualizada = await prisma.mensagem.update({
      where: {
        id,
      },
      data: {
        titulo,
        conteudo,
        publicado,
        qtdLikes,
      },
    });
    return mensagemAtualizada;
  });

  server.delete('/mensagem/:id', async (request) => {
    const idParam = z.object({
      id: z.string().uuid(),
    });
    const { id } = idParam.parse(request.params);
    const mensagemRemovida = await prisma.mensagem.delete({
      where: {
        id,
      },
    });
    return mensagemRemovida;
  });
}
