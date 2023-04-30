import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
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
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('homeworks')
export class HomeworksController {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
    @InjectRepository(Homework)
    private readonly homeworkRepository: Repository<Homework>,
  ) {}

  @Get()
  async getAll() {
    return this.homeworkRepository.find();
  }

  @Post()
  @UseGuards(TokenAuthGuard, TutorGuard)
  @UseInterceptors(
    FileInterceptor('image', { dest: './public/uploads/homeworks/pdf' }),
  )
  async createLesson(
    @Req() req: Request,
    @Body() homeworkData: AddHomeworkDto,
    file: Express.Multer.File,
  ) {
    const user = req.user as User;
    const lesson = await this.lessonRepository.findOne({
      where: { id: homeworkData.lesson },
    });

    if (!lesson) {
      throw new BadRequestException('Lesson not found');
    }

    console.log(file);

    const homework = await this.homeworkRepository.create({
      lesson: lesson,
      title: homeworkData.title,
      date: new Date(),
      description: homeworkData.description,
      tutorName: user.firstName,
      // pdf: file ? '/uploads/homeworks/pdf/' + file.filename : null,
    });
    return this.homeworkRepository.save(homework);
  }

  // @Patch()
  // @UseGuards(TokenAuthGuard, TutorGuard)
  // async updateHomework(
  //   @Param('id') id: number,
  //   @Body() updateHomeworkDto: UpdateHomeworkDto,
  // ) {
  //   const homework = await this.homeworkRepository.findOne({
  //     where: { id: id },
  //   });
  //   await this.homeworkRepository.update(homework.id, updateHomeworkDto);
  //   return this.homeworkRepository.findOne({
  //     where: { id: homework.id },
  //   });
  // }

  @Get(':id')
  async getOneHomework(@Param('id') id: number) {
    return this.homeworkRepository.findOne({
      where: { id: id },
    });
  }

  @Delete(':id')
  @UseGuards(TokenAuthGuard, TutorGuard)
  async removeOneHomework(@Param('id') id: number) {
    const homework: Homework = await this.homeworkRepository.findOne({
      where: { id: id },
    });
    if (homework) {
      return this.homeworkRepository.delete(id);
    } else {
      throw new NotFoundException(`Homework with id ${id} not found`);
    }
  }
}
