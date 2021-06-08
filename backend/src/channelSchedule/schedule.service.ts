import { HttpService, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/sequelize';
import { Channel } from 'db/models/channels.model';
import { format, differenceInMinutes } from 'date-fns';
import { InjectBot } from 'nestjs-telegraf';
import { WSService } from 'src/websocket/wschannels.service';
import { Provider } from 'db/models/provider.model';
import { Server } from 'db/models/servers.model';
import { AxiosResponse } from 'axios';
const ffprobe = require('ffprobe');
const ffprobeStatic = require('ffprobe-static');
const fs = require('fs');
const path = require('path');

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

  @Cron('*/2 * * * *')
  // @Cron('*/5 * * * *')
  async handleCron() {
    const chatId = this.telegramBot.context?.chatId;
    const channels = await this.channelModel.findAll({
      raw: true,
      include: [Provider, Server],
    });

    fs.readdir('src/TempVideoFile', (err: any, files: any) => {
      if (err) throw err;

      for (const file of files) {
        fs.unlink(path.join('src/TempVideoFile', file), (err: any) => {
          if (err) throw err;
        });
      }
    });

    const soundAnalyz = async (
      data: PromiseFulfilledResult<AxiosResponse<any>>,
    ) => {
      const lastVideoFragment = data.value.data.split('\n').reverse()[1];
      if (
        lastVideoFragment.split('.').length > 1 &&
        !data.value.config.url.includes('shum')
      ) {
        try {
          const url = data.value.config.url.split('/');
          url.splice(5, 1, lastVideoFragment);
          let videoFileRequest;
          try {
            videoFileRequest = await this.httpService
              .get(url.join('/'), { responseType: 'stream' })
              .toPromise();
          } catch (error) {
            console.log(url.join('/'));
            // console.log(error);
          }
          await videoFileRequest.data.pipe(
            fs.createWriteStream(`src/TempVideoFile/${lastVideoFragment}.mp4`),
          );

          const ffprobeResult = await ffprobe(
            `src/TempVideoFile/${lastVideoFragment}.mp4`,
            {
              path: ffprobeStatic.path,
            },
          );

          //Проверка одного канала
          // if (
          //   !ffprobeResult?.streams.find(
          //     (el) => el.codec_name === 'aac' || el.codec_name === 'mp2',
          //   )
          // ) {
          //   console.log(data.value.config.url);
          //   console.log(ffprobeResult);
          // }

          return !!ffprobeResult?.streams.find(
            (el) => el.codec_name === 'aac' || el.codec_name === 'mp2',
          );
        } catch (error) {
          // console.log(data.value.config.url);
        }
      }
    };

    function putDb(channelModel, resolved) {
      return new Promise(async (resolve, reject) => {
        try {
          for (const element of resolved) {
            if (element.status === 'fulfilled') {
              const channel = await channelModel.findOne({
                raw: true,
                where: { url: element.value.config.url },
              });
              const isSoundOn = await soundAnalyz(element);
              await channelModel.update(
                {
                  ...channel,
                  isSoundOn,
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
              const channel = await channelModel.findOne({
                raw: true,
                where: { url: element.reason.config.url },
              });

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
          resolve(true);
        } catch (error) {
          reject(error);
        }
      });
    }

    while (channels.length > 0) {
      const chArr = channels.splice(0, 20);
      const resolved = await Promise.allSettled(
        chArr.map((channel) => this.httpService.get(channel.url).toPromise()),
      );

      await putDb(this.channelModel, resolved);
    }

    ////////////////////////////////////////////////////////////////////
    // const resolved = await Promise.allSettled(
    //   channels.map((channel) => this.httpService.get(channel.url).toPromise()),
    // );

    // // Проверить конкретный канал
    // const temp: any = resolved.filter((el) => el.status === 'fulfilled');
    // console.log(
    //   await soundAnalyz(
    //     temp.find((el: any) => el.value.config.url.includes('pobeda')),
    //   ),
    // );
    ////////////////////////////////////////////////////////////////////////

    const editedChannel = await this.channelModel.findAll({
      include: [Provider, Server],
      order: [['id', 'ASC']],
    });

    const failedChannel = editedChannel
      .map((el) => el.toJSON())
      .filter((item: any) => !item.status && item.monitoring);

    const channelWithoutSound = editedChannel
      .map((el) => el.toJSON())
      .filter((item: any) => !item.isSoundOn && item.status && item.monitoring);

    if ((failedChannel.length || channelWithoutSound.length) && chatId) {
      this.telegramBot.telegram.sendMessage(
        chatId,
        `${
          failedChannel.length ? '<strong>Не работают каналы:</strong>\n' : ''
        }${failedChannel.map((el: any) => `❌ ${el.name}`).join('\n')}\n\n${
          channelWithoutSound.length
            ? '<strong>Отсутвует звук на каналах:</strong>'
            : ''
        }\n${channelWithoutSound.map((el: any) => `🔕 ${el.name}`).join('\n')}
        `,
        {
          parse_mode: 'Html',
        },
      );
    }

    this.ws.socket.emit('channels', editedChannel);
  }
}
