import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.development.local' });

import { Module } from '@nestjs/common';
import { ChannelsModule } from './channels/channels.module';
import { ProvidersModule } from './providers/providers.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { Dialect } from 'sequelize/types';
import { AppGateway } from './app.gateway';
import { SchModule } from './channelSchedule/schedule.module';

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
    }),
    ChannelsModule,
    ProvidersModule,
    SchModule,
  ],
  providers: [AppGateway],
})
export class AppModule {}
