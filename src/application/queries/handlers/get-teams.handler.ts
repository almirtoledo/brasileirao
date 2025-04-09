import type { GetTeamsQuery } from "@/application/queries/get-teams.query";
import type { TeamRepository } from "@/domain/repositories/team.repository";

export class GetTeamsHandler {
  constructor(private readonly repository: TeamRepository) { }

  async execute(query: GetTeamsQuery) {
    return this.repository.fetchAll();
  }
}