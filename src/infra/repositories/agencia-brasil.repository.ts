import { Team } from '@/domain/entities/team';
import type { TeamRepository } from '@/domain/repositories/team.repository';
import * as cheerio from 'cheerio';

export class AgenciaBrasilTeamRepository implements TeamRepository {
  private readonly BASE_URL = 'https://agenciabrasil.ebc.com.br/esportes/tabelas/'

  async fetchAll(): Promise<Team[]> {
    const res = await fetch(this.BASE_URL);
    const data = await res.text();
    const $ = cheerio.load(data);
    const teams: Team[] = [];

    const rows = $('table').first().find('tbody tr');
    rows.each((_, row) => {
      const tds = $(row).find('td');

      const positionText = $(tds[0]).find('span').first().text().trim();
      const position = Number(positionText);

      const teamCell = $(tds[1]);
      const teamLogo = teamCell.find('img').attr('src') && this.BASE_URL + teamCell.find('img').attr('src')?.replace("./", "") || undefined;
      const teamName = teamCell.find('span').eq(0).text().trim();

      const points = Number($(tds[2]).text().trim());
      const wins = Number($(tds[4]).text().trim());
      const draws = Number($(tds[5]).text().trim());
      const losses = Number($(tds[6]).text().trim());
      const goalsFor = Number($(tds[7]).text().trim());
      const goalsAgainst = Number($(tds[8]).text().trim());
      const goalDifference = Number($(tds[9]).text().trim());

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