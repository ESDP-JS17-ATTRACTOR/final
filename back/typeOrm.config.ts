// import { NestFactory } from '@nestjs/core';
// import { DataSource } from 'typeorm';
// import { DatabaseModule } from './src/database/database.module';
//
// async function createDataSource(): Promise<DataSource> {
//   const app = await NestFactory.create(DatabaseModule);
//   const dataSource = app.select(DatabaseModule).get(DataSource);
//   await dataSource.destroy();
//
//   return dataSource;
// }
//
// export default createDataSource(); // Tsyganov migration logic

import { DataSource } from 'typeorm';
import { config } from 'dotenv';
config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['*/**/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

export default AppDataSource;

// import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// import { ConfigService } from '@nestjs/config';
// import { DataSource } from 'typeorm';
//
// export default async function typeOrmConfig(): Promise<DataSource> {
//   const configService = new ConfigService();
//
//   return {
//     type: 'postgres',
//     host: process.env.DB_HOST,
//     port: configService.get('DB_PORT'),
//     username: configService.get('DB_USERNAME'),
//     password: configService.get('DB_PASSWORD'),
//     database: configService.get('DB_DATABASE'),
//     entities: ['**/*.entity{.ts,.js}'],
//     migrations: ['src/database/migrations/*.ts'],
//   };
// }
