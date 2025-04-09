import { Team } from '@/domain/entities/team';
import type { TeamRepository } from '@/domain/repositories/team.repository';
import * as cheerio from 'cheerio';

export class LanceTeamRepository implements TeamRepository {
  async fetchAll(): Promise<Team[]> {
    const res = await fetch('https://www.lance.com.br/tabela/brasileirao');
    const data = await res.text();
    const $ = cheerio.load(data);

    const teams: Team[] = [];
    const seenPositions = new Set<number>();

    $('div[class*="_tr_"]').each((_, row) => {
      const rowEl = $(row);
      const posElem = rowEl.find('span[class*="_teamClassification_"] p').first();
      const posRaw = posElem.text().trim();
      if (!posRaw) return;
      const posNumber = Number(posRaw.replace(/[^0-9]/g, ""));
      if (isNaN(posNumber) || seenPositions.has(posNumber)) return;
      seenPositions.add(posNumber);
      const logoImg = rowEl.find('img').eq(1);
      const teamLogo = logoImg.attr('src') || '';
      const teamName = logoImg.attr('alt') || '';
      const gridCells = rowEl
        .find('div[class*="_td_"]')
        .toArray()
        .map((cell): number => {
          const text = $(cell).text().trim();
          const num = Number(text);
          return isNaN(num) ? NaN : num;
        })
        .filter((val): val is number => !isNaN(val));

      if (gridCells.length >= 9) {
        teams.push(
          Team.create({
            position: posNumber,
            teamName,
            points: gridCells[0]!,
            wins: gridCells[1]!,
            draws: gridCells[2]!,
            losses: gridCells[3]!,
            goalsFor: gridCells[4]!,
            goalsAgainst: gridCells[5]!,
            goalDifference: gridCells[6]!,
            efficiency: gridCells[8]!,
            teamLogo,
          })
        );
      }
    });

    return teams;
  }
}