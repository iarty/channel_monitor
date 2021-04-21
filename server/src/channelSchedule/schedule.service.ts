import { HttpService, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/sequelize';
import { Channel } from 'db/models/channels.model';
import { format, differenceInMinutes } from 'date-fns';
import { InjectBot } from 'nestjs-telegraf';
@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @InjectModel(Channel)
    private channelModel: typeof Channel,
    private httpService: HttpService,
    @InjectBot() private telegramBot,
  ) {}

  @Cron('20 * * * * *')
  async handleCron() {
    const chatId = this.telegramBot.context?.chatId;
    const channels = await this.channelModel.findAll({ raw: true });
    const promises = [];
    channels.forEach((el) => {
      promises.push(this.httpService.get(el.url).toPromise());
    });

    const resolved = await Promise.allSettled(promises);

    resolved.forEach(async (el) => {
      if (el.status !== 'fulfilled') {
      }
    });
    const data = resolved.map((el, i) =>
      el.status === 'fulfilled'
        ? {
            id: channels[i].id,
            name: channels[i].name,
            link: el.value.config.url,
            monitoring: channels[i].monitoring,
            status:
              differenceInMinutes(
                new Date(el.value.headers['last-modified']),
                new Date(),
              ) < -5
                ? false
                : true,
            datetime: format(
              new Date(el.value.headers['last-modified']),
              'dd.MM.yyyy HH:mm:ss',
            ),
            providerId: channels[i].providerId,
          }
        : {
            id: channels[i].id,
            name: channels[i].name,
            url: el.reason.config.url,
            status: false,
            monitoring: channels[i].monitoring,
            providerId: channels[i].providerId,
          },
    );
    data.forEach(async (el) => {
      try {
        await this.channelModel.update(
          {
            ...el,
            updatedAt: new Date(),
          },
          { where: { id: el.id } },
        );
      } catch (error) {
        this.logger.debug(error);
      }
    });

    const failedChannel = data.filter((el) => !el.status && el.monitoring);

    if (failedChannel.length && chatId) {
      this.telegramBot.telegram.sendMessage(
        chatId,
        `<strong>Не работают каналы:</strong>
        ${failedChannel.map((el) => `❌ ${el.name}`).join('\n')}
        `,
        {
          parse_mode: 'Html',
        },
      );
    }
  }
}
