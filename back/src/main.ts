import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

interface ValidationErrors {
  [key: string]: string[];
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', '..', 'public'));

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => {
        const validationErrors: ValidationErrors = {};

        errors.forEach((error) => {
          const constraints = error.constraints;

          if (constraints) {
            validationErrors[error.property] = Object.keys(constraints).map((key) => constraints[key]);
          }
        });

        return new BadRequestException(validationErrors);
      },
    }),
  );

  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3010', 'http://95.85.52.10'],
  });

  await app.listen(process.env.PORT || 8000);
  console.log('living on port: ', process.env.PORT);
  console.log(process.env.MESSAGE);
}
bootstrap();
