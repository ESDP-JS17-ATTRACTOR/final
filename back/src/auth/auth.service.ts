import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { randomUUID } from 'crypto';
import axios from 'axios';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { NodemailerService } from '../nodemailer/nodemailer.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
    private readonly nodemailerService: NodemailerService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (user && (await user.checkPassword(password))) {
      await user.generateToken();
      await this.userRepository.save(user);
      return user;
    }

    return null;
  }

  generateJwtToken(user: User): string {
    const payload = {
      userId: user.id,
      email: user.email,
    };
    const options: JwtSignOptions = {
      secret: process.env.JWT_SECRET,
    };
    return this.jwtService.sign(payload, options);
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
        where: { email },
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

  async restorePassword(email: string) {
    try {
      const user = await this.userRepository.findOne({ where: { email } });

      if (!user) {
        throw new BadRequestException('Incorrect E-mail.');
      }

      const generateRandomPassword = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let password = '';
        for (let i = 0; i < 8; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          password += characters.charAt(randomIndex);
        }
        return password;
      };

      const newPassword = generateRandomPassword();
      user.password = newPassword;
      await user.hashPassword();
      await this.userRepository.save(user);
      return this.nodemailerService.sendUpdatedPassword(user.email, newPassword);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async registerUserWithFacebook(accessToken: string, userID: string) {
    try {
      const facebookResponse = await axios.get(
        `https://graph.facebook.com/v12.0/${userID}?fields=name,email,picture,first_name,last_name&access_token=${accessToken}`,
      );

      const email = facebookResponse.data.email;
      const facebookId = facebookResponse.data.id;
      const firstName = facebookResponse.data.first_name;
      const lastName = facebookResponse.data.last_name;
      const avatar = facebookResponse.data.picture?.data.url;

      if (!email) {
        throw new BadRequestException('Not enough user data to continue.');
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

        const jwtToken = this.generateJwtToken(user);

        await user.generateToken();
        await this.userRepository.save(user);

        return { user, jwtToken };
      }

      const jwtToken = this.generateJwtToken(user);

      return { user, jwtToken };
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
        throw new BadRequestException({
          email: ['This email is already registered!'],
        });
      }
      return;
    }

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }
}
