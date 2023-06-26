import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { TokenAuthGuard } from '../../auth/token-auth.guard';
import { AuthService } from '../../auth/auth.service';
import { LocalAuthGuard } from '../../auth/local-auth.guard';
import { CurrentUser } from '../../auth/currentUser.decorator';
import { Purchase } from '../../entities/purchase.entity';
import { StaffGuard } from '../../auth/staff.guard';
import { Course } from '../../entities/course.entity';

@Controller('users')
export class UsersController {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authService: AuthService,
    @InjectRepository(Purchase)
    private readonly purchaseRepository: Repository<Purchase>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  @Post('register')
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(ValidationPipe)
  async registerUser(@Body() body: RegisterDto) {
    return this.authService.registerUser(body.email, body.firstName, body.lastName, body.password);
  }

  @Post('google-authentication')
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(ValidationPipe)
  async registerUserWithGoogle(@Body() body: { credential: string }) {
    return this.authService.registerUserWithGoogle(body.credential);
  }

  @Post('facebook-authentication')
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(ValidationPipe)
  async registerUserWithFacebook(@Body() body: { accessToken: string; userID: string }) {
    return this.authService.registerUserWithFacebook(body.accessToken, body.userID);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async login(@CurrentUser() user: User) {
    return user;
  }

  @Post('recoverPassword')
  @UseInterceptors(ClassSerializerInterceptor)
  async recoverPassword(@Body() body: { email: string }) {
    return this.authService.restorePassword(body.email);
  }

  @Delete('sessions')
  @UseGuards(TokenAuthGuard)
  async logout(@CurrentUser() user: User) {
    return this.authService.logout(user.id);
  }

  @Patch('edit-profile')
  @UseGuards(TokenAuthGuard)
  async edit(@CurrentUser() user: User, @Body() updateData: Partial<User>) {
    await this.userRepository.update(user.id, updateData);
    return this.userRepository.findOne({
      where: { id: user.id },
    });
  }

  @Get('tutors')
  @UseGuards(TokenAuthGuard, StaffGuard)
  async getTutors() {
    const tutors = await this.userRepository.find({
      where: { role: 'tutor' },
      select: ['id', 'firstName', 'lastName', 'role'],
    });
    const tutorsIds = tutors.map((tutor) => tutor.id);
    const courses = await this.courseRepository.find({
      where: { tutor: { id: In(tutorsIds) } },
      relations: ['tutor'],
    });

    return tutors.map((tutor) => {
      const tutorCourses = courses.filter((course) => course.tutor.id === tutor.id);
      return {
        ...tutor,
        courses: tutorCourses.map((course) => course.title),
      };
    });
  }

  @Get('students')
  @UseGuards(TokenAuthGuard, StaffGuard)
  async getStudents() {
    const students = await this.userRepository.find({
      where: { role: 'student' },
      select: ['id', 'firstName', 'lastName', 'role'],
    });
    const studentsIds = students.map((student) => student.id);
    const purchases = await this.purchaseRepository.find({
      where: { purchaser: { id: In(studentsIds) } },
      relations: ['purchaser', 'course'],
    });

    return students.map((student) => {
      const studentPurchases = purchases.filter((purchase) => purchase.purchaser.id === student.id);
      return {
        ...student,
        purchases: studentPurchases.map((purchase) => purchase.course.title),
      };
    });
  }
}
