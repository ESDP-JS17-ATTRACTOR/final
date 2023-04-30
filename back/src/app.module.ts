import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { Category } from './entities/category.entity';
import { CourseModule } from './entities/courseModule.entity';
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
import { Purchase } from './entities/purchase.entity';
import { Lesson } from './entities/lesson.entity';
import { UsersLesson } from './entities/usersLesson.entity';
import { LessonsController } from './lessons/lessons.controller';
import { UsersLessonsController } from './lessons/usersLessons/usersLessons.controller';
import { PurchasesController } from './purchases/purchases.controller';
import { UsersLessonsService } from './lessons/usersLessons/usersLessons.service';
import { LessonsService } from './lessons/lessons.service';
import { PurchasesService } from './purchases/purchases.service';
import { CourseModulesService } from './courseModules/courseModules.service';
import { CourseModulesController } from './courseModules/courseModules.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    TypeOrmModule.forFeature([
      User,
      Category,
      Course,
      CourseModule,
      Purchase,
      Lesson,
      UsersLesson,
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
    LessonsService,
    UsersLessonsService,
    PurchasesService,
    CourseModulesService,
  ],
  controllers: [
    UsersController,
    CategoriesController,
    CoursesController,
    LessonsController,
    UsersLessonsController,
    PurchasesController,
    HomeworksController,
    StudentHomeworksController,
    CourseModulesController,
  ],
})
export class AppModule {}
