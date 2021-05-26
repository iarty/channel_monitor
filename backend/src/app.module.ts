import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.development.local' });

import { Module } from '@nestjs/common';
import { ChannelsModule } from './channels/channels.module';
import { ProvidersModule } from './providers/providers.module';
import { ServersModule } from './servers/servers.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { Dialect } from 'sequelize/types';
import { SchModule } from './channelSchedule/schedule.module';
import { TelegramModule } from './telegram/telegram.module';
import { WSChannelsModule } from './websocket/wschannels.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRoot({
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      port: +process.env.DB_PORT,
      host: process.env.DB_HOST,
      dialect: 'postgres' as Dialect,
      dialectOptions: {
        timezone: process.env.DB_TIMEZONE,
      },
      autoLoadModels: true,
      synchronize: true,
      logging: false,
    }),
    ChannelsModule,
    ProvidersModule,
    ServersModule,
    TelegramModule,
    SchModule,
    WSChannelsModule,
  ],
})
export class AppModule {}
