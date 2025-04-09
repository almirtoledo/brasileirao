export class Team {
  constructor(
    readonly position: number,
    readonly teamName: string,
    readonly teamLogo: string,
    readonly points: number,
    readonly wins: number,
    readonly draws: number,
    readonly losses: number,
    readonly goalsFor: number,
    readonly goalsAgainst: number,
    readonly goalDifference: number,
    readonly efficiency: number
  ) { }

  static create(props: {
    position: number;
    teamName: string;
    teamLogo: string;
    points: number;
    wins: number;
    draws: number;
    losses: number;
    goalsFor: number;
    goalsAgainst: number;
    goalDifference: number;
    efficiency: number;
  }): Team {
    return new Team(
      props.position,
      props.teamName,
      props.teamLogo,
      props.points,
      props.wins,
      props.draws,
      props.losses,
      props.goalsFor,
      props.goalsAgainst,
      props.goalDifference,
      props.efficiency
    );
  }
}