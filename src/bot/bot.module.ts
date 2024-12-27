import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { TelegramModule } from 'common/providers/telegram.module';
import { BotController } from './bot.controller';

@Module({
  imports: [TelegramModule],
  controllers: [BotController],
  providers: [BotService],
  exports: [BotService],
})
export class BotModule {}
