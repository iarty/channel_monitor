import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateServerDto, EditServerDto } from 'db/models/servers.dto';
import { Server } from 'db/models/servers.model';

@Injectable()
export class ServersService {
  constructor(
    @InjectModel(Server)
    private serverModel: typeof Server,
  ) {}

  async getServers(): Promise<Server[]> {
    try {
      const servers = await this.serverModel.findAll({});
      return servers;
    } catch (error) {
      return error;
    }
  }

  async getServerById(id: string): Promise<Server> {
    try {
      const server = await this.serverModel.findOne({
        where: {
          id,
        },
      });
      return server;
    } catch (error) {
      return error;
    }
  }

  async addServer(dto: CreateServerDto): Promise<Server> {
    try {
      const server = await this.serverModel.create(dto);
      return server;
    } catch (error) {
      return error;
    }
  }

  async deleteServer(id: string): Promise<string> {
    try {
      const server = await this.serverModel.findOne({
        where: {
          id,
        },
      });

      if (!server) {
        return 'Сервер не найден';
      }
      const response = await this.serverModel.destroy({ where: { id } });

      if (response === 1) {
        return 'Сервер удален.';
      } else {
        return 'Неизвестная ошибка при удалении';
      }
    } catch (error) {
      return error;
    }
  }

  async editServer(dto: EditServerDto): Promise<Server | string> {
    try {
      const server = await this.serverModel.findOne({
        where: {
          id: dto.id,
        },
      });

      if (!server) {
        return 'Сервер не найден';
      }

      await this.serverModel.update(dto, { where: { id: dto.id } });
      const response = await this.serverModel.findOne({
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
