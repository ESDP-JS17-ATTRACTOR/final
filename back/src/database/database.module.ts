import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { DataSource, DataSourceOptions } from 'typeorm'; // Tsyganov migration logic
// import migrations from './migrations'; // Tsyganov migration logic
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

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD') as string,
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
        // migrations, // Tsyganov migration logic
      }),
      // dataSourceFactory: async (options) => {
      //   return new DataSource(options as DataSourceOptions).initialize(); // Tsyganov migration logic
      // },
    }),
  ],
})
export class DatabaseModule {}
