import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateChannelDto, EditChannelDto } from 'db/models/channels.dto';
import { Channel } from 'db/models/channels.model';
import { Provider } from 'db/models/provider.model';

@Injectable()
export class ChannelsService {
  constructor(
    @InjectModel(Channel)
    private channelModel: typeof Channel,
  ) {}

  async getChannels(): Promise<Channel[]> {
    try {
      const channels = await this.channelModel.findAll({ include: [Provider] });
      return channels;
    } catch (error) {
      return error;
    }
  }

  async getChannelById(id: string): Promise<Channel> {
    try {
      const channel = await this.channelModel.findOne({
        where: {
          id,
        },
        include: [Provider],
      });
      return channel;
    } catch (error) {
      return error;
    }
  }

  async addChannel(dto: CreateChannelDto): Promise<Channel> {
    try {
      const channel = await this.channelModel.create(dto);
      return channel;
    } catch (error) {
      return error;
    }
  }

  async deleteChannel(id: number): Promise<string> {
    try {
      const channel = await this.channelModel.findOne({
        where: {
          id,
        },
      });

      if (!channel) {
        return 'Канал не найден';
      }
      const response = await this.channelModel.destroy({ where: { id } });
      if (response === 1) {
        return 'Канал удален.';
      } else {
        return 'Неизвестная ошибка при удалении';
      }
    } catch (error) {
      return error;
    }
  }

  async editChannel(dto: EditChannelDto): Promise<Channel | string> {
    try {
      const channel = await this.channelModel.findOne({
        where: {
          id: dto.id,
        },
      });

      if (!channel) {
        return 'Канал не найден';
      }
      await this.channelModel.update(dto, { where: { id: dto.id } });
      const response = await this.channelModel.findOne({
        where: {
          id: dto.id,
        },
      });

      return response;
    } catch (error) {
      return error;
    }
  }
}
