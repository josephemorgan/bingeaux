import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { BingoGameModel } from './bingo-game/bingo-game.model';
import { BingoGameService } from './bingo-game/bingo-game.service';

interface BingoError {
  errorMessage: string;
}

@Controller()
export class AppController {
  constructor(private readonly bingoGameService: BingoGameService) {}

  @Get('startGame')
  startBingoGame(): BingoGameModel | BingoError {
    try {
      return this.bingoGameService.startNewGame();
    } catch (e) {
      return {
        errorMessage: e.message,
      };
    }
  }

  @Get('getGameState')
  getBingoGame(@Param() params: any): BingoGameModel | BingoError {
    try {
      return this.bingoGameService.getCurrentGameState(params.gameId);
    } catch (e) {
      return {
        errorMessage: e.message,
      };
    }
  }

  @Get('getNextNumber')
  getNextNumber(@Param() params: any): BingoGameModel | BingoError {
    try {
      return this.bingoGameService.getNextNumber(params.gameId);
    } catch (e) {
      console.log(e);
      return {
        errorMessage: e.message,
      };
    }
  }

  @Get('setNextNumber')
  setNextNumber(@Param() params: any): BingoGameModel | BingoError {
    try {
      return this.bingoGameService.setNextNumber(
        params.gameId,
        params.nextNumber,
      );
    } catch (e) {
      console.log(e);
    }
    try {
      this.getBingoGame(params.gameId);
    } catch (e) {
      return {
        errorMessage: e.message,
      };
    }
  }

  @Post('completeGame')
  completeGame(@Body() body: any) {
    try {
      this.bingoGameService.completeGame(body.gameId, body.winner);
    } catch (e) {
      console.log(e);
    }
  }

  @Get('getGamesList')
  getGamesList(): {
    gameId: string;
    gameStatus: 'in-progress' | 'complete';
    winner?: string;
  }[] {
    return this.bingoGameService.getGameslist();
  }
}
