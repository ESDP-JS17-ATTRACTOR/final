import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from '../entities/lesson.entity';
import { Repository } from 'typeorm';
import { TokenAuthGuard } from '../auth/token-auth.guard';
import { TutorGuard } from '../auth/tutor.guard';
import { AddHomeworkDto } from './dto/addHomework.dto';
import { Homework } from '../entities/homework.entity';
import { User } from '../entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { HomeworksService } from './homeworks.service';
import { CurrentUser } from '../auth/currentUser.decorator';
import { Request } from 'express';
import { UpdateHomeworkDto } from './dto/updateHomework.dto';

@Controller('homeworks')
export class HomeworksController {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
    @InjectRepository(Homework)
    private readonly homeworkRepository: Repository<Homework>,
    private readonly homeworksService: HomeworksService,
  ) {}

  @Get()
  @UseGuards(TokenAuthGuard)
  async getAll() {
    return this.homeworkRepository.find({
      relations: ['lesson'],
      order: {
        date: 'DESC',
      },
    });
  }

  @Get('byTutor')
  @UseGuards(TokenAuthGuard)
  async getAllByTutor(@Req() req: Request) {
    const user = req.user as User;
    return this.homeworkRepository.find({
      relations: ['lesson'],
      where: { tutorEmail: user.email },
      order: {
        date: 'DESC',
      },
    });
  }

  @Get('tutorHomeworks')
  @UseGuards(TokenAuthGuard)
  async getTutorHomeworks(@Req() req: Request) {
    const user = req.user as User;
    return this.homeworksService.getTutorsHomeworks(user);
  }

  @Post()
  @UseGuards(TokenAuthGuard, TutorGuard)
  @UseInterceptors(FileInterceptor('pdf', { dest: './public/uploads/homeworks/pdf' }))
  async createHomework(
    @CurrentUser() user: User,
    @Body() homeworkData: AddHomeworkDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.homeworksService.createHomework(user, homeworkData, file);
  }

  @Patch(':id')
  @UseGuards(TokenAuthGuard, TutorGuard)
  @UseInterceptors(FileInterceptor('pdf', { dest: './public/uploads/homeworks/pdf' }))
  async updateHomework(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateHomeworkDto: UpdateHomeworkDto,
  ) {
    return this.homeworksService.updateHomework(id, file, updateHomeworkDto);
  }

  @Get(':id')
  async getOneHomework(@Param('id') id: number) {
    return this.homeworkRepository.findOne({
      where: { id: id },
    });
  }

  @Delete(':id')
  @UseGuards(TokenAuthGuard, TutorGuard)
  async removeOneHomework(@Param('id') id: number) {
    return this.homeworksService.removeOneHomework(id);
  }
}
