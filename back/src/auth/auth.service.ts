import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { google } from 'googleapis';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
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

  async registerUserWithGoogle(credential: string) {
    const { clientId } = this.configService.get('GOOGLE_CLIENT_ID');
    const client = new google.auth.OAuth2(clientId, '', '');

    try {
      const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: clientId,
      });

      const payload = ticket.getPayload();

      if (!payload) {
        return new BadRequestException('Google login error!');
      }

      const email = payload.email;
      const googleId = payload.sub;
      const firstName = payload.given_name;
      const lastName = payload.family_name;
      const avatar = payload.picture;

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
}
