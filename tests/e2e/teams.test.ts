import { teamsController } from '@/infra/http/teams.controller';
import { describe, expect, it } from 'bun:test';
import { Elysia } from 'elysia';

const app = new Elysia().use(teamsController).handle;

describe('GET /teams', () => {
  it('should return a list of teams with expected structure', async () => {
    const res = await app(
      new Request('http://localhost/teams', {
        method: 'GET',
      })
    );

    expect(res.status).toBe(200);

    const data = await res.json() as any
    expect(Array.isArray(data)).toBe(true);

    const sample = data[0];

    expect(sample).toHaveProperty('position');
    expect(sample).toHaveProperty('teamName');
    expect(sample).toHaveProperty('teamLogo');
    expect(sample).toHaveProperty('points');
    expect(sample).toHaveProperty('wins');
    expect(sample).toHaveProperty('draws');
    expect(sample).toHaveProperty('losses');
    expect(sample).toHaveProperty('goalsFor');
    expect(sample).toHaveProperty('goalsAgainst');
    expect(sample).toHaveProperty('goalDifference');
    expect(sample).toHaveProperty('efficiency');
  }, 30_000);
});
