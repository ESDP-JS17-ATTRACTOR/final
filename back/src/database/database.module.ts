import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../entities/user.entity';
import { Category } from '../entities/category.entity';
import { Course } from '../entities/course.entity';
import { CourseModule } from '../entities/courseModule.entity';
import { Purchase } from '../entities/purchase.entity';
import { Lesson } from '../entities/lesson.entity';
import { UsersLesson } from '../entities/usersLesson.entity';
import { Homework } from '../entities/homework.entity';
import { StudentHomework } from '../entities/studentHomework.entity';
import { Comment } from '../entities/comment.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: parseInt(configService.get('DB_PORT') as string),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [
          User,
          Category,
          Course,
          CourseModule,
          Purchase,
          Lesson,
          UsersLesson,
          Homework,
          StudentHomework,
          Comment,
        ],
        synchronize: false,
      }),
      dataSourceFactory: async (options) => {
        return new DataSource(options as DataSourceOptions).initialize();
      },
    }),
  ],
})
export class DatabaseModule {}
