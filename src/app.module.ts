import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BingoGameService } from './bingo-game/bingo-game.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, BingoGameService],
})
export class AppModule {}
