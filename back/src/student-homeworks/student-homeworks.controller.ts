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
  UploadedFile, UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TokenAuthGuard } from '../auth/token-auth.guard';
import { TutorGuard } from '../auth/tutor.guard';
import { Homework } from '../entities/homework.entity';
import { User } from '../entities/user.entity';
import { Request } from 'express';
import { StudentHomework } from '../entities/studentHomework.entity';
import { AddStudentHomeworkDto } from './dto/addStudentHomework.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('student-homeworks')
export class StudentHomeworksController {
  constructor(
    @InjectRepository(Homework)
    private readonly homeworkRepository: Repository<Homework>,
    @InjectRepository(StudentHomework)
    private readonly studentHomeworkRepository: Repository<StudentHomework>,
  ) {}

  @Get()
  @UseGuards(TokenAuthGuard)
  async getAll(@Req() req: Request) {
    const user = req.user as User;
    const studentHomeworks = await this.studentHomeworkRepository.find({
      relations: ['homework'],
      where: [
        { studentEmail: user.email },
        { homework: { tutorEmail: user.email } },
      ],
      order: {
        date: 'DESC',
      },
    });
    return studentHomeworks;
  }

  @Post()
  @UseGuards(TokenAuthGuard)
  @UseInterceptors(
    FilesInterceptor('studentFiles', 3, {
      dest: './public/uploads/studentsHomeworks',
    }),
  )
  async createLesson(
    @Req() req: Request,
    @Body() studentHomeworkData: AddStudentHomeworkDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const user = req.user as User;
    const homework = await this.homeworkRepository.findOne({
      where: { id: parseFloat(studentHomeworkData.homework) },
    });

    const existStudentHomework = await this.studentHomeworkRepository.findOne({
      relations: ['homework'],
      where: {
        studentEmail: user.email,
        homework: { id: parseFloat(studentHomeworkData.homework) },
      },
    });

    if (!homework) {
      throw new BadRequestException('Homework not found');
    }

    if (existStudentHomework) {
      throw new BadRequestException('This homework already done');
    }

    console.log(files);

    const studentHomework = await this.studentHomeworkRepository.create({
      homework: homework,
      date: new Date(),
      studentName: user.firstName,
      studentEmail: user.email,
      studentFiles: files
        ? files.map((file) => '/uploads/studentsHomeworks/' + file.filename)
        : null,
    });
    return this.studentHomeworkRepository.save(studentHomework);
  }

  @Patch(':id/toggleCheck')
  @UseGuards(TokenAuthGuard, TutorGuard)
  async updateHomework(@Param('id') id: number) {
    const studentHomework = await this.studentHomeworkRepository.findOne({
      where: { id: id },
    });

    const newStatus =
      studentHomework.isChecked === 'Not checked' ? 'Checked' : 'Not checked';

    await this.studentHomeworkRepository.update(id, { isChecked: newStatus });

    return this.studentHomeworkRepository.findOne({
      where: { id: id },
    });
  }

  @Get(':id')
  async getOneStudentHomework(@Param('id') id: number) {
    return this.studentHomeworkRepository.findOne({
      where: { id: id },
    });
  }

  @Delete(':id')
  @UseGuards(TokenAuthGuard)
  async removeOneStudentHomework(@Req() req: Request, @Param('id') id: number) {
    const user = req.user as User;
    const studentHomework: StudentHomework =
      await this.studentHomeworkRepository.findOne({
        relations: ['homework'],
        where: { studentEmail: user.email, homework: { id: id } },
      });
    if (studentHomework) {
      await this.studentHomeworkRepository.delete(studentHomework.id);
      return { message: 'Student homework deleted' };
    } else {
      throw new NotFoundException(`Student Homework with id ${id} not found`);
    }
  }
}
