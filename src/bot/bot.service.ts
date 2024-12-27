import { Injectable } from '@nestjs/common';
import { Ctx, Start, Update } from 'nestjs-telegraf';
import { Context, Markup } from 'telegraf';

import * as path from 'path';
import * as fs from 'fs';
import escapeMessage from 'common/utils/escape-message';
import WelcomeMessage from './assets/welcome-message';

@Update()
@Injectable()
export class BotService {
  constructor() {}
  @Start()
  async start(@Ctx() ctx: Context) {
    await this.sendWelcomeVideo(ctx);
    await this.sendWelcomeMessage(ctx);
  }

  // --- 3. Вспомогательные методы ---
  private sendWelcomeMessage(ctx: Context) {
    return ctx.reply(escapeMessage(WelcomeMessage), {
      parse_mode: 'MarkdownV2',
      ...Markup.inlineKeyboard([
        [
          Markup.button.webApp(
            'Открыть визитку 🌐',
            'https://yound-studio-webapp.vercel.app/',
          ),
        ],
      ]),
    });
  }

  private sendWelcomeVideo(ctx: Context) {
    const videoPath = path.join(
      __dirname,
      '../../src/bot/assets/welcome-video.mp4',
    );
    const videoBuffer = fs.readFileSync(videoPath);

    return ctx.telegram.sendVideoNote(ctx.chat.id, {
      source: videoBuffer,
    } as any);
  }
}
