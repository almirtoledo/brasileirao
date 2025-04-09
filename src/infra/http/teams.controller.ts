import { GetTeamsQuery } from '@/application/queries/get-teams.query';
import { GetTeamsHandler } from '@/application/queries/handlers/get-teams.handler';
import { LanceTeamRepository } from '@/infra/repositories/lance.repository';
import { Elysia } from 'elysia';


const repo = new LanceTeamRepository();
const handler = new GetTeamsHandler(repo);

export const teamsController = new Elysia().get('/teams', async () => {
  const teams = await handler.execute(new GetTeamsQuery());
  return teams;
});