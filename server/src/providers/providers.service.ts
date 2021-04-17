import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Provider } from 'db/models/provider.model';
import { CreateProviderDto, EditProviderDto } from 'db/models/providers.dto';

@Injectable()
export class ProvidersService {
  constructor(
    @InjectModel(Provider)
    private providerModel: typeof Provider,
  ) {}

  async getProviders(): Promise<Provider[]> {
    try {
      const providers = await this.providerModel.findAll({});
      return providers;
    } catch (error) {
      return error;
    }
  }

  async getProviderById(id: string): Promise<Provider> {
    try {
      const provider = await this.providerModel.findOne({
        where: {
          id,
        },
      });
      return provider;
    } catch (error) {
      return error;
    }
  }

  async addProvider(dto: CreateProviderDto): Promise<Provider> {
    try {
      const provider = await this.providerModel.create(dto);
      return provider;
    } catch (error) {
      return error;
    }
  }

  async deleteProvider(id: number): Promise<string> {
    try {
      const provider = await this.providerModel.findOne({
        where: {
          id,
        },
      });

      if (!provider) {
        return 'Провайдер не найден';
      }
      const response = await this.providerModel.destroy({ where: { id } });

      if (response === 1) {
        return 'Провайдер удален.';
      } else {
        return 'Неизвестная ошибка при удалении';
      }
    } catch (error) {
      return error;
    }
  }

  async editProvider(dto: EditProviderDto): Promise<Provider | string> {
    try {
      const provider = await this.providerModel.findOne({
        where: {
          id: dto.id,
        },
      });

      if (!provider) {
        return 'Провайдер не найден';
      }

      await this.providerModel.update(dto, { where: { id: dto.id } });
      const response = await this.providerModel.findOne({
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
