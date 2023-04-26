import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FixturesService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async dropTables(): Promise<void> {
    await this.userRepository.query(
      'TRUNCATE TABLE "user" RESTART IDENTITY CASCADE',
    );
  }

  async createUsers() {
    const user = await this.userRepository.create({
      email: 'user@gmail.com',
      firstName: 'John',
      lastName: 'Doe',
      password: 'password',
    });
    await user.generateToken();
    await this.userRepository.save(user);

    const admin = await this.userRepository.create({
      email: 'admin@gmail.com',
      firstName: 'Jane',
      lastName: 'Doe',
      password: 'password',
      role: 'admin',
    });
    await admin.generateToken();
    await this.userRepository.save(admin);
  }
}
