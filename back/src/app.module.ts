import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { UsersController } from './routers/users/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { Category } from './entities/category.entity';
import { CourseModule } from './entities/courseModule.entity';
import { CategoriesController } from './routers/categories/categories.controller';
import { AuthService } from './auth/auth.service';
import { LocalStrategy } from './auth/local.strategy';
import { FixturesService } from './fixtures/fixtures.service';
import { SeedCommand } from './fixtures/seed.command';
import { CoursesController } from './routers/courses/courses.controller';
import { Course } from './entities/course.entity';
import { HomeworksController } from './routers/homeworks/homeworks.controller';
import { Homework } from './entities/homework.entity';
import { StudentHomeworksController } from './routers/student-homeworks/student-homeworks.controller';
import { StudentHomework } from './entities/studentHomework.entity';
import { Purchase } from './entities/purchase.entity';
import { Lesson } from './entities/lesson.entity';
import { UsersLesson } from './entities/usersLesson.entity';
import { LessonsController } from './routers/lessons/lessons.controller';
import { UsersLessonsController } from './routers/usersLessons/usersLessons.controller';
import { PurchasesController } from './routers/purchases/purchases.controller';
import { UsersLessonsService } from './routers/usersLessons/usersLessons.service';
import { LessonsService } from './routers/lessons/lessons.service';
import { PurchasesService } from './routers/purchases/purchases.service';
import { CourseModulesService } from './routers/courseModules/courseModules.service';
import { CourseModulesController } from './routers/courseModules/courseModules.controller';
import { CommentsService } from './routers/comments/comments.service';
import { CommentsController } from './routers/comments/comments.controller';
import { Comment } from './entities/comment.entity';
import { HomeworksService } from './routers/homeworks/homeworks.service';
import { JwtModule } from '@nestjs/jwt';
import { MyWebSocketGateway } from './websocket/websocket.module';

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
    JwtModule,
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
    MyWebSocketGateway,
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
