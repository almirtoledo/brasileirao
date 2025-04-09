import { Team } from '@/domain/entities/team';
import type { TeamRepository } from '@/domain/repositories/team.repository';
import * as cheerio from 'cheerio';

export class CnnTeamRepository implements TeamRepository {
  async fetchAll(): Promise<Team[]> {
    const res = await fetch('https://www.cnnbrasil.com.br/esportes/futebol/tabela-do-brasileirao/');
    const data = await res.text();
    const $ = cheerio.load(data);
    const teams: Team[] = [];
    const table = $('div').find('table').first();
    const rows = table.find('tbody tr');

    rows.each((_, row) => {
      const tds = $(row).find('td');
      const teamCell = tds.eq(0);
      const position = Number(teamCell.find('span').first().text().trim());
      const teamLogo = teamCell.find('img').attr('src') || undefined;
      const teamName = teamCell.find('p').first().find('span').first().text().trim();
      const points = Number(tds.eq(1).text().trim());
      const wins = Number(tds.eq(3).text().trim());
      const draws = Number(tds.eq(4).text().trim());
      const losses = Number(tds.eq(5).text().trim());
      const goalsFor = Number(tds.eq(6).text().trim());
      const goalsAgainst = Number(tds.eq(7).text().trim());
      const goalDifference = Number(tds.eq(8).text().trim());

      teams.push(
        Team.create({
          position,
          teamName,
          teamLogo,
          points,
          wins,
          draws,
          losses,
          goalsFor,
          goalsAgainst,
          goalDifference,
          efficiency: 0
        })
      );
    });
    return teams;
  }
}