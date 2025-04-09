import { Team } from '@/domain/entities/team';
import type { TeamRepository } from '@/domain/repositories/team.repository';
import * as cheerio from 'cheerio';

export class UolTeamRepository implements TeamRepository {
  async fetchAll(): Promise<Team[]> {
    const res = await fetch('https://www.uol.com.br/esporte/futebol/campeonatos/brasileirao/');
    const data = await res.text();
    const $ = cheerio.load(data);

    const teamTable = $("table").filter((i, el) => {
      return $(el).find("h2").text().trim().toLowerCase() === "classificação";
    }).first();
    const statsTable = $("table").filter((i, el) => {
      return $(el).find("h2").length === 0;
    }).first();

    const teams: Team[] = [];
    const teamRows = teamTable.find("tbody tr");
    const statsRows = statsTable.find("tbody tr");
    const count = Math.min(teamRows.length, statsRows.length);

    for (let i = 0; i < count; i++) {
      const teamRow = teamRows.eq(i);
      const statsRow = statsRows.eq(i);

      const teamInfoCell = teamRow.find("td").first();
      const posTextRaw = teamInfoCell.children("span").first().text().trim();
      const position = Number(posTextRaw.replace(/\D/g, ""));
      const logoElement = teamInfoCell.children("span").eq(1).find("img");
      const teamLogo = logoElement.attr("src") || undefined;
      const teamName = teamRow.find("span.name div div").first().text().trim()

      const statsTds = statsRow.find("td");
      const points = Number(statsTds.eq(0).text().trim());
      const wins = Number(statsTds.eq(2).text().trim());
      const draws = Number(statsTds.eq(3).text().trim());
      const losses = Number(statsTds.eq(4).text().trim());
      const goalsFor = Number(statsTds.eq(5).text().trim());
      const goalsAgainst = Number(statsTds.eq(6).text().trim());
      const goalDifference = Number(statsTds.eq(7).text().trim());
      const efficiency = Number(statsTds.eq(8).text().trim());

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
    }
    return teams;
  }
}