import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { Category } from './entities/category.entity';
import { CategoriesController } from './categories/categories.controller';
import { AuthService } from './auth/auth.service';
import { LocalStrategy } from './auth/local.strategy';
import { FixturesService } from './fixtures/fixtures.service';
import { SeedCommand } from './fixtures/seed.command';
import { CoursesController } from './courses/courses.controller';
import { Course } from './entities/course.entity';
import { HomeworksController } from './homeworks/homeworks.controller';
import { Homework } from './entities/homework.entity';
import { StudentHomeworksController } from './student-homeworks/student-homeworks.controller';
import { StudentHomework } from './entities/studentHomework.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    TypeOrmModule.forFeature([
      User,
      Category,
      Course,
      Homework,
      StudentHomework,
    ]),
    PassportModule,
  ],
  providers: [
    AppService,
    AuthService,
    LocalStrategy,
    FixturesService,
    SeedCommand,
  ],
  controllers: [
    UsersController,
    CategoriesController,
    CoursesController,
    HomeworksController,
    StudentHomeworksController,
  ],
})
export class AppModule {}
