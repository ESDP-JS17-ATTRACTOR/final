import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { User } from '../../entities/user.entity';
import { UsersLessonsService } from './usersLessons.service';
import { CurrentUser } from '../../auth/currentUser.decorator';
import { TokenAuthGuard } from '../../auth/token-auth.guard';

@Controller('users-lessons')
export class UsersLessonsController {
  constructor(private readonly usersLessonsService: UsersLessonsService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(TokenAuthGuard)
  async getAll(@CurrentUser() user: User, @Query('id') id: number) {
    return await this.usersLessonsService.getAll(user.id, id);
  }

  @Get('/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(TokenAuthGuard)
  async getById(@CurrentUser() user: User, @Param('id') id: number) {
    return this.usersLessonsService.getUsersLessonById(user, id);
  }

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(TokenAuthGuard)
  async createUsersLesson(@CurrentUser() user: User, @Body() body: { id: number }) {
    return this.usersLessonsService.createUsersLesson(user, body.id);
  }

  @Patch(':id')
  async updateUsersLesson(@Param('id') id: number, @Body() body: { isViewed: boolean }) {
    return await this.usersLessonsService.updateUsersLesson(id, body.isViewed);
  }
}
