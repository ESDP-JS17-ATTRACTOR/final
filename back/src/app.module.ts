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
import { CoursesController } from './courses/courses.controller';
import { Course } from './entities/course.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    TypeOrmModule.forFeature([User, Category, Course]),
    PassportModule,
  ],
  controllers: [UsersController, CategoriesController, CoursesController],
  providers: [AppService, AuthService, LocalStrategy],
})
export class AppModule {}
