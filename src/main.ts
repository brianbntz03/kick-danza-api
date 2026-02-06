import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar parsing de JSON globalmente
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Ejemplo de API')
    .setDescription('La descripción de la API')
    .setVersion('1.0')
    .addTag('alumnos')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
