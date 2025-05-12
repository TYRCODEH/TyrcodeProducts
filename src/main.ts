import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      logger: ['error', 'warn', 'log', 'debug', 'verbose'],

      transport: Transport.NATS,
      options: { servers: ['nats://localhost:4222'] },
    },
  );

  await app.listen();
}
bootstrap();
