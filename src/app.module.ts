import { Module } from '@nestjs/common';
import { EnvFilePathModule } from '../common/providers/env-file-path.module';
import { BotModule } from './bot/bot.module';

@Module({
  imports: [EnvFilePathModule, BotModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
