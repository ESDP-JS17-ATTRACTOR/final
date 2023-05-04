import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async getAll(userId) {
    let query = this.purchaseRepository
      .createQueryBuilder('purchase')
      .leftJoinAndSelect('purchase.purchaser', 'userId')
      .leftJoinAndSelect('users_lesson.course', 'courseId')
      .select(['purchase', 'userId.id', 'courseId.id']);

    if (userId) {
      query = query.where('userId.id = :userId', { userId });
    }

    const purchases = await query.getMany();

    if (!purchases.length) {
      throw new NotFoundException('No purchases at all!');
    }
    return purchases;
  }

  async createPurchase(user: User, courseId: number) {
    const existingPurchase = await this.purchaseRepository.findOne({
      where: { course: { id: courseId } },
    });

    if (existingPurchase) {
      throw new BadRequestException('You have already bought this course!');
    }

    const course = await this.findCourseById(courseId);
    const today = new Date();

    const purchase = this.purchaseRepository.create({
      purchaser: user,
      course: course,
      purchasedAt: today,
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
