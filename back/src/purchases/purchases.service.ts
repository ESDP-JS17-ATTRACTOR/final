import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from '../entities/course.entity';
import { User } from '../entities/user.entity';
import { Purchase } from '../entities/purchase.entity';

@Injectable()
export class PurchasesService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(Purchase)
    private readonly purchaseRepository: Repository<Purchase>,
  ) {}

  async createPurchase(user: User, course: Course) {
    await this.findCourseById(course.id);
    const today = new Date();
    const startedAt = new Date(course.startedAt); //should be "2022-03-15T09:00:00" alike to work
    const durationInMilliseconds =
      Number(course.duration) * 24 * 60 * 60 * 1000;
    const expiredAt = new Date(
      startedAt.getTime() + durationInMilliseconds + 45 * 24 * 60 * 60 * 1000,
    );

    const purchase = this.purchaseRepository.create({
      purchaser: user,
      course: course,
      purchasedAt: today,
      expiredDate: expiredAt.toISOString(),
    });
    return this.purchaseRepository.save(purchase);
  }

  async removePurchase(id: number) {
    const purchase: Purchase = await this.purchaseRepository.findOne({
      where: { id },
    });
    if (purchase) {
      await this.purchaseRepository.delete(id);
      return { message: `Purchase with id ${id} deleted` };
    } else {
      throw new NotFoundException(`Purchase with id ${id} not found`);
    }
  }

  private async findCourseById(id: number): Promise<Course> {
    const course = await this.courseRepository.findOne({ where: { id: id } });
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    return course;
  }
}
