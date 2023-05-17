import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as crypto from 'crypto';
import axios from 'axios';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (user && (await user.checkPassword(password))) {
      await user.generateToken();
      await this.userRepository.save(user);
      return user;
    }

    return null;
  }

  async registerUserWithGoogle(accessToken: string) {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`,
      );

      const email = response.data.email;
      const googleId = response.data.sub;
      const firstName = response.data.given_name;
      const lastName = response.data.family_name;
      const avatar = response.data.picture;

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
          password: crypto.randomUUID(),
        });

        await user.generateToken();
        await this.userRepository.save(user);
        return user;
      }
      return user;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  generateJwtToken(user: User): string {
    const payload = {
      userId: user.id,
      email: user.email,
    };
    const options: JwtSignOptions = {
      secret: process.env.JWT_SECRET, // Используйте свойство "secret" вместо "secretKey"
    };
    return this.jwtService.sign(payload, options);
  }
  // async registerUserWithFacebook(accessToken: string) {
  //   try {
  //     const response = await axios.get(
  //       `https://graph.facebook.com/v13.0/me?fields=email,first_name,last_name,picture&access_token=${accessToken}`,
  //     );
  //
  //     console.log('Response from Facebook API:', response.data);
  //     const email = response.data.email;
  //     const facebookId = response.data.id;
  //     const firstName = response.data.first_name;
  //     const lastName = response.data.last_name;
  //     const avatar = response.data.picture?.data.url;
  //
  //     if (!email) {
  //       return new BadRequestException('Not enough user data to continue.');
  //     }
  //
  //     let user = await this.userRepository.findOne({
  //       where: { facebookId },
  //     });
  //
  //     if (!user) {
  //       user = await this.userRepository.create({
  //         email,
  //         firstName,
  //         lastName,
  //         facebookId,
  //         avatar,
  //         password: crypto.randomUUID(),
  //       });
  //
  //       await user.generateToken();
  //       await this.userRepository.save(user);
  //       return user;
  //     }
  //
  //     return user;
  //   } catch (e) {
  //     throw new BadRequestException(e.message);
  //   }
  // }
}
