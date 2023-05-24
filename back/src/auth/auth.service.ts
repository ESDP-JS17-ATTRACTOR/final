import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { randomUUID } from 'crypto';
import axios from 'axios';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (user && (await user.checkPassword(password))) {
      await user.generateToken();
      await this.userRepository.save(user);
      return user;
    }

    return null;
  }

  async registerUser(email: string, firstName: string, lastName: string, password: string) {
    await this.getUserById({ email });

    const user = await this.userRepository.create({
      email,
      firstName,
      lastName,
      password,
    });
    await user.generateToken();
    return this.userRepository.save(user);
  }

  async logout(id: number) {
    const user = await this.getUserById(id);
    await user.generateToken();
    await this.userRepository.save(user);
    return { message: 'Logout success' };
  }

  async registerUserWithGoogle(accessToken: string) {
    try {
      const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`);
      const { email, id: googleId, given_name: firstName, family_name: lastName, picture: avatar } = response.data;

      if (!email) {
        return new BadRequestException('Not enough user data to continue.');
      }

      let user = await this.userRepository.findOne({
        where: { googleId },
      });

      if (!user) {
        user = await this.userRepository.create({
          email,
          firstName,
          lastName,
          googleId,
          avatar,
          password: randomUUID(),
        });

        await user.generateToken();
        return await this.userRepository.save(user);
      }
      return user;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  private async getUserById(props) {
    const user = await this.userRepository.findOne({
      where: props,
    });

    if (props.email) {
      if (user) {
        throw new ConflictException({ email: 'This email is already registered!' });
      }
      return;
    }

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }
}
