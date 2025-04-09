import type { Team } from "@/domain/entities/team";

export interface TeamRepository {
  fetchAll(): Promise<Team[]>;
}