export interface BingoGameModel {
  readonly gameId: string;
  readonly calledNumbers: number[];
  readonly gameStatus: 'in-progress' | 'complete';
  readonly gameWinner?: string;
}
