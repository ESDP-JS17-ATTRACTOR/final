import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

interface UserRequest extends Request {
  user?: User;
}

@Controller('users')
export class UsersController {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  @Post('register')
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(ValidationPipe)
  async registerUser(@Body() body: RegisterDto) {
    const existUser = await this.userRepository.findOne({
      where: { email: body.email },
    });

    if (existUser) {
      throw new BadRequestException('This email is already registered');
    }

    const user = this.userRepository.create(body);
    await user.generateToken();
    return this.userRepository.save(user);
  }

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Req() req: UserRequest) {
    return req.user as User;
  }
}
