import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { Lesson } from '../../entities/lesson.entity';
import { CommentsService } from './comments.service';
import { TokenAuthGuard } from '../../auth/token-auth.guard';
import { CurrentUser } from '../../auth/currentUser.decorator';
import { CreateCommentDto } from './dto/createComment.dto';

@Controller('comments')
export class CommentsController {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Lesson)
    private readonly lessonsRepository: Repository<Lesson>,
    private readonly commentsService: CommentsService,
  ) {}

  @Get(':id')
  async getAll(@Param('id') id: number) {
    return this.commentsService.getAll(id);
  }

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(TokenAuthGuard)
  async createComment(@CurrentUser() user: User, @Body() body: CreateCommentDto) {
    return this.commentsService.createComment(user.id, body);
  }

  @Delete(':id')
  @UseGuards(TokenAuthGuard)
  async removeComment(@Param('id') id: number) {
    return this.commentsService.removeComment(id);
  }
}
