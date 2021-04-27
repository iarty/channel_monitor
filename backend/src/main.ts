import { NestFactory } from '@nestjs/core';
import { logger } from '../utils/logger';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { setupSwagger } from './swagger';
import * as morgan from 'morgan';
import { getBotToken } from 'nestjs-telegraf';

const start = async () => {
  try {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(),
    );
    const bot = app.get(getBotToken());
    app.use(bot.webhookCallback('/start'));
    app.setGlobalPrefix('api');
    app.use(morgan('combine'));
    app.enableCors();
    setupSwagger(app);
    await app.listen(PORT, () =>
      logger('initialize-app').info(
        `Server has been started on port ${PORT}...`,
      ),
    );
  } catch (error) {
    console.log(error);
    logger('initialize-app').error(error);
  }
};

start();
