export class Team {
  constructor(
    readonly position: number,
    readonly teamName: string,
    readonly points: number,
    readonly wins: number,
    readonly draws: number,
    readonly losses: number,
    readonly goalsFor: number,
    readonly goalsAgainst: number,
    readonly goalDifference: number,
    readonly efficiency: number,
    readonly teamLogo?: string,
  ) { }

  static create(props: {
    position: number;
    teamName: string;
    points: number;
    wins: number;
    draws: number;
    losses: number;
    goalsFor: number;
    goalsAgainst: number;
    goalDifference: number;
    efficiency: number;
    teamLogo?: string;
  }): Team {
    return new Team(
      props.position,
      props.teamName,
      props.points,
      props.wins,
      props.draws,
      props.losses,
      props.goalsFor,
      props.goalsAgainst,
      props.goalDifference,
      props.efficiency,
      props.teamLogo,
    );
  }
}