import { Team } from '@/domain/entities/team';
import type { TeamRepository } from '@/domain/repositories/team.repository';
import * as cheerio from 'cheerio';

export class TerraTeamRepository implements TeamRepository {
  async fetchAll(): Promise<Team[]> {
    const res = await fetch('https://www.terra.com.br/esportes/futebol/brasileiro-serie-a/tabela/');
    const data = await res.text();
    const $ = cheerio.load(data);

    const times: Team[] = [];
    $('table tbody tr').each((_, tr) => {
      const row = $(tr);
      const position = Number(row.find('td.position').text().trim());
      const teamName = row.find('td.team-name a').text().trim().replace(/>>/g, '').trim();
      const teamLogo = row.find('td.shield a img').attr('src') || '';
      const points = Number(row.find('td.points, td[title="Pontos"]').first().text().trim());
      const wins = Number(row.find('td[title="Vitórias"]').text().trim());
      const draws = Number(row.find('td[title="Empates"]').text().trim());
      const losses = Number(row.find('td[title="Derrotas"]').text().trim());
      const goalsFor = Number(row.find('td[title="Gols Pró"]').text().trim());
      const goalsAgainst = Number(row.find('td[title="Gols Contra"]').text().trim());
      const goalDifference = Number(row.find('td[title="Saldo de Gols"]').text().trim());
      const efficiency = Number(row.find('td[title="Aproveitamento"]').text().trim());

      times.push(
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

    return times;
  }
}