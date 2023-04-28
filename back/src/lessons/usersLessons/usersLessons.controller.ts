import { Controller, Get, Param, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from '../../entities/lesson.entity';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { UsersLesson } from '../../entities/usersLesson.entity';
import { UsersLessonsService } from './usersLessons.service';
import { CurrentUser } from '../../auth/currentUser.decorator';

@Controller('users-lessons')
export class UsersLessonsController {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UsersLesson)
    private readonly usersLessonRepository: Repository<UsersLesson>,
    private readonly usersLessonsService: UsersLessonsService,
  ) {}

  @Get()
  async getAll() {
    return this.usersLessonRepository.find(); // need to check for dependencies in lessonRepo
  }

  @Post(':id') // Guard ???
  async createUsersLesson(@CurrentUser() user: User, @Param('id') id: number) {
    return this.usersLessonsService.createUsersLesson(user, id);
  }
}
