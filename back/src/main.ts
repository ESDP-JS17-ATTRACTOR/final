import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors = []) => {
        // TODO: "need types"
        const errors = {}; // TODO: "need types"

        validationErrors.forEach((error) => {
          const constraints = error.constraints;

          if (constraints) {
            errors[error.property] = Object.keys(constraints).map(
              (key) => constraints[key],
            );
          }
        });

        return new BadRequestException(errors);
      },
    }),
  );

  app.enableCors({
    origin: 'http://localhost:3000',
  });

  await app.listen(8000);
}
bootstrap();
