import helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const logger = new Logger('Main', { timestamp: true });
  try {
    const app = await NestFactory.create(AppModule, { cors: true });
    const configService = app.get<ConfigService>(ConfigService);
    const port = configService.get('PORT');
    app.use(helmet());
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
      }),
    );

    await app.listen(port, '0.0.0.0', async () => {
      logger.log(`Server listening on ${await app.getUrl()}`);
    });
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
}
bootstrap();
