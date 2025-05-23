import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  const config = new DocumentBuilder()
    .setTitle('Nest js docs')
    .setDescription('API Documentation nest js docs')
    .setVersion('1.0.0')
    .setContact('name', 'http://localhost:8080/url', 'someemail@test.com')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, document);

  app.enableCors({
    origin: configService.getOrThrow<string>('ALLOWED_ORIGINS').split(','),
    credentials: true,
    exposedHeaders: ['Set-Cookie', 'Content-Disposition'],
    allowedHeaders: '*',
  });

  await app.listen(process.env.PORT ?? 3070);
}
bootstrap();
