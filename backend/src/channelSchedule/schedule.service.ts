import { HttpService, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/sequelize';
import { Channel } from 'db/models/channels.model';
import { format, differenceInMinutes } from 'date-fns';
import { InjectBot } from 'nestjs-telegraf';
import { WSService } from 'src/websocket/wschannels.service';
import { Provider } from 'db/models/provider.model';
@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @InjectModel(Channel)
    private channelModel: typeof Channel,

    private httpService: HttpService,

    private readonly ws: WSService,

    @InjectBot() private telegramBot,
  ) {}

  @Cron('*/5 * * * *')
  async handleCron() {
    const chatId = this.telegramBot.context?.chatId;
    const channels = await this.channelModel.findAll({
      raw: true,
      include: [Provider],
    });

    const resolved = await Promise.allSettled(
      channels.map((channel) => this.httpService.get(channel.url).toPromise()),
    );


    (async function putDb(channelModel) {
      for (const element of resolved) {
        if (element.status === 'fulfilled') {
          const channel = channels.find(
            (channel) => channel.url === element.value.config.url,
          );
          await channelModel.update(
            {
              ...channel,
              status:
                differenceInMinutes(
                  new Date(element.value.headers['last-modified']),
                  new Date(),
                ) < -5
                  ? false
                  : true,
              lastDate: format(
                new Date(element.value.headers['last-modified']),
                'dd.MM.yyyy HH:mm:ss',
              ),
              updatedAt: new Date(),
            },
            { where: { id: channel.id } },
          );
        } else {
          const channel = channels.find(
            (channel) => channel.url === element.reason.config.url,
          );
          await channelModel.update(
            {
              ...channel,
              status: false,
              lastDate: null,
              updatedAt: new Date(),
            },
            { where: { id: channel.id } },
          );
        }
      }
    })(this.channelModel);
    
    const editedChannel = await this.channelModel.findAll({
      include: [Provider],
      order: [['id', 'ASC']],
    });
    
    const failedChannel = editedChannel
      .map((el) => el.toJSON())
      .filter((item: any) => !item.status && item.monitoring);

    if (failedChannel.length && chatId) {
      this.telegramBot.telegram.sendMessage(
        chatId,
        `<strong>Не работают каналы:</strong>
        ${failedChannel.map((el: any) => `❌ ${el.name}`).join('\n')}
        `,
        {
          parse_mode: 'Html',
        },
      );
    }
    this.ws.socket.emit('channels', editedChannel);
  }
}
