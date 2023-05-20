import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
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
import { UsersLessonsController } from './usersLessons/usersLessons.controller';
import { PurchasesController } from './purchases/purchases.controller';
import { UsersLessonsService } from './usersLessons/usersLessons.service';
import { LessonsService } from './lessons/lessons.service';
import { PurchasesService } from './purchases/purchases.service';
import { CourseModulesService } from './courseModules/courseModules.service';
import { CourseModulesController } from './courseModules/courseModules.controller';
import { CommentsService } from './comments/comments.service';
import { CommentsController } from './comments/comments.controller';
import { Comment } from './entities/comment.entity';
import { HomeworksService } from './homeworks/homeworks.service';
// import { UsersModule } from './users/users.module';

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
      Comment,
    ]),
    PassportModule,
    // UsersModule,
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
    CommentsService,
    HomeworksService,
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
    CommentsController,
  ],
})
export class AppModule {}
