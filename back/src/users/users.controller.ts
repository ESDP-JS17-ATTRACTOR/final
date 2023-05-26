import {
  BadRequestException,
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
import axios from 'axios';

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
  @Post('facebook-authentication')
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(ValidationPipe)
  async registerUserWithFacebook(@Body() body: { accessToken: string; userID: string }) {
    try {
      const accessToken = body.accessToken;
      const userID = body.userID;

      const facebookResponse = await axios.get(
        `https://graph.facebook.com/v12.0/${userID}?fields=name,email,picture,first_name,last_name&access_token=${accessToken}`,
      );
      console.log(facebookResponse.data);
      const email = facebookResponse.data.email;
      const facebookId = facebookResponse.data.id;
      const firstName = facebookResponse.data.first_name;
      const lastName = facebookResponse.data.last_name;
      const avatar = facebookResponse.data.picture?.data.url;

      if (!email) {
        return new BadRequestException('Not enough user data to continue.');
      }

      let user = await this.userRepository.findOne({
        where: { facebookId },
      });

      if (!user) {
        user = await this.userRepository.create({
          email,
          firstName,
          lastName,
          facebookId,
          avatar,
          password: crypto.randomUUID(),
        });
        const jwtToken = this.authService.generateJwtToken(user);

        await user.generateToken();
        await this.userRepository.save(user);
        return { user, jwtToken };
      }
      const jwtToken = this.authService.generateJwtToken(user);

      return { user, jwtToken };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
