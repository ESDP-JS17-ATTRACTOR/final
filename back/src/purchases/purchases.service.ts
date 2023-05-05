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
import { CourseModule } from '../entities/courseModule.entity';
import { Lesson } from '../entities/lesson.entity';

@Injectable()
export class PurchasesService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(Purchase)
    private readonly purchaseRepository: Repository<Purchase>,
    @InjectRepository(CourseModule)
    private readonly courseModulesRepository: Repository<CourseModule>,
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
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

  async getCoursesWithModules(userId: number) {
    const courses = await this.purchaseRepository
      .createQueryBuilder('purchase')
      .where('purchase.userId = :userId', { userId })
      .leftJoinAndSelect('purchase.purchaser', 'user')
      .leftJoinAndSelect('purchase.course', 'course')
      .select(['purchase', 'course'])
      .leftJoinAndSelect('course.tutor', 'tutor')
      .leftJoinAndSelect('course.category', 'category')
      .select([
        'purchase',
        'course.id',
        'course.title',
        'category.title',
        'tutor.firstName',
        'tutor.lastName',
      ])
      .getMany();

    if (!courses.length) {
      throw new NotFoundException('Purchased courses not found!');
    }

    const courseModules = await this.courseModulesRepository
      .createQueryBuilder('course_module')
      .leftJoinAndSelect('course_module.course', 'course')
      .select(['course_module', 'course.id'])
      .getMany();

    const responseCourses = [];

    for (let i = 0; i < courses.length; i++) {
      responseCourses.push({
        id: courses[i].id,
        category: courses[i].course.category.title,
        title: courses[i].course.title,
        tutor: {
          firstName: courses[i].course.tutor.firstName,
          lastName: courses[i].course.tutor.lastName,
        },
        modules: [],
      });
      for (let j = 0; j < courseModules.length; j++) {
        if (courses[i].course.id === courseModules[j].course.id) {
          const id = courseModules[j].id;
          const lessons = await this.lessonRepository
            .createQueryBuilder('lesson')
            .leftJoinAndSelect('lesson.module', 'module')
            .where('module.id = :id', { id })
            .select(['lesson'])
            .getMany();

          responseCourses[i].modules.push({
            id: courseModules[j].id,
            number: courseModules[j].number,
            title: courseModules[j].title,
            numberOfLessons: lessons.length,
          });
        }
      }
    }

    return responseCourses;
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
