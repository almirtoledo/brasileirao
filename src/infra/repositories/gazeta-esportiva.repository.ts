import { Team } from '@/domain/entities/team';
import type { TeamRepository } from '@/domain/repositories/team.repository';
import * as cheerio from 'cheerio';

export class GazetaEsportivaTeamRepository implements TeamRepository {
  async fetchAll(): Promise<Team[]> {
    const res = await fetch('https://www.gazetaesportiva.com/campeonatos/brasileiro-serie-a/');
    const data = await res.text();
    const $ = cheerio.load(data);
    const teams: Team[] = [];
    const rows = $('table').first().find('tbody tr');
    rows.each((_, row) => {
      const position = Number($(row).find('th').first().text().trim());
      const tds = $(row).find('td');
      const teamLogo = tds.eq(0).find('img').attr('src') || undefined;
      const teamName = tds.eq(1).find('a').text().trim();
      const points = Number(tds.eq(2).text().trim());
      const wins = Number(tds.eq(4).text().trim());
      const draws = Number(tds.eq(5).text().trim());
      const losses = Number(tds.eq(6).text().trim());
      const goalsFor = Number(tds.eq(7).text().trim());
      const goalsAgainst = Number(tds.eq(8).text().trim());
      const goalDifference = Number(tds.eq(9).text().trim());
      const efficiency = Number(tds.eq(10).text().trim());
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
          efficiency
        })
      );
    });
    return teams;
  }
}