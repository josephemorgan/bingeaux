import { Injectable } from '@nestjs/common';
import { range } from 'lodash';
import { BingoGameModel } from './bingo-game.model';

@Injectable()
export class BingoGameService {
  private _activeGames: BingoGameModel[];

  constructor() {
    this._activeGames = [];
  }

  public getCurrentGameState(gameId: string): BingoGameModel {
    return structuredClone(
      this._activeGames.find((game) => game.gameId === gameId),
    );
  }

  public getNextNumber(gameId: string): BingoGameModel {
    const indexToUpdate = this._activeGames.findIndex(
      (game) => game.gameId === gameId,
    );
    this._activeGames[indexToUpdate] = {
      gameId: this._activeGames[indexToUpdate].gameId,
      calledNumbers: [
        range(1, 76)
          .filter(
            (num) =>
              !this._activeGames[indexToUpdate].calledNumbers.includes(num),
          )
          .sort(() => Math.random() - 0.5)
          .at(0),
        ...this._activeGames[indexToUpdate].calledNumbers,
      ],
      gameStatus: 'in-progress',
    };
    return this._activeGames[indexToUpdate];
  }

  public setNextNumber(gameId: string, nextNumber: number): BingoGameModel {
    const indexToUpdate = this._activeGames.findIndex(
      (game) => game.gameId === gameId,
    );

    if (
      this._activeGames[indexToUpdate].calledNumbers.some(
        (number) => number === nextNumber,
      )
    ) {
      throw new Error('Number already exists in list of called numbers');
    }

    this._activeGames[indexToUpdate] = {
      gameId: this._activeGames[indexToUpdate].gameId,
      calledNumbers: [
        nextNumber,
        ...this._activeGames[indexToUpdate].calledNumbers,
      ],
      gameStatus: 'in-progress',
    };
    return this._activeGames[indexToUpdate];
  }

  public startNewGame(): BingoGameModel {
    const availableCharacters =
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const newGame: BingoGameModel = {
      gameId: availableCharacters
        .split('')
        .sort(() => Math.random() - 0.5)
        .slice(0, 4)
        .join(''),
      calledNumbers: [],
      gameStatus: 'in-progress',
    };
    this._activeGames.push(newGame);
    return newGame;
  }

  public getGameslist(): {
    gameId: string;
    gameStatus: 'in-progress' | 'complete';
    winner?: string;
  }[] {
    return this._activeGames.map((game) => {
      return {
        gameId: game.gameId,
        gameStatus: game.gameStatus,
        winner: game.gameWinner ?? undefined,
      };
    });
  }

  public completeGame(gameId: string, winner: string) {
    console.log(gameId);
    const indexToUpdate = this._activeGames.findIndex(
      (game) => game.gameId === gameId,
    );
    this._activeGames[indexToUpdate] = {
      gameId: this._activeGames[indexToUpdate].gameId,
      calledNumbers: this._activeGames[indexToUpdate].calledNumbers,
      gameStatus: 'complete',
      gameWinner: winner,
    };
    return this._activeGames[indexToUpdate];
  }
} 
