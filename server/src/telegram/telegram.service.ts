import e from 'express';
import {
  Update,
  Ctx,
  Start,
  Help,
  On,
  Hears,
  InjectBot,
  Command,
} from 'nestjs-telegraf';

@Update()
export class TelegramService {
  constructor(@InjectBot() private telegramBot) {}

  // @Start()
  // async start(@Ctx() ctx) {
  //   this.telegramBot.context = ctx;
  //   await ctx.reply('start');
  // }

  @On('message')
  async on(@Ctx() ctx) {
    console.log(ctx.message.text);
    if (ctx.message.text === '/stop') {
      this.telegramBot.context = {};
      await ctx.reply('stop');
    } else if (ctx.message.text === '/start') {
      this.telegramBot.context.chatId = ctx.message.chat.id;
      await ctx.reply(
        `
        🧙<strong>Бот запустился</strong>🧙
        `,
        { parse_mode: 'Html' },
      );
    }
  }

  @Help()
  async help(@Ctx() ctx) {
    await ctx.reply('Send me a sticker');
  }

  // @On('sticker')
  // async on(@Ctx() ctx) {
  //   await ctx.reply('👍');
  // }
}
