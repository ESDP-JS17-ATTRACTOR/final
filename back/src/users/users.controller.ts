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
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { TokenAuthGuard } from '../auth/token-auth.guard';
import { AuthService } from '../auth/auth.service';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { CurrentUser } from '../auth/currentUser.decorator';

@Controller('users')
export class UsersController {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authService: AuthService,
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
  async getTutors() {
    return await this.userRepository.find({
      where: { role: 'tutor' },
      select: ['id', 'firstName', 'lastName', 'role'],
    });
  }
}
