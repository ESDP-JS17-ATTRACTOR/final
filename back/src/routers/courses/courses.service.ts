import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from '../../entities/course.entity';
import { Repository } from 'typeorm';
import { AddCourseDto } from './dto/addCourse.dto';
import { User } from '../../entities/user.entity';
import { Category } from '../../entities/category.entity';
import { UpdateCourseDto } from './dto/updateCourse.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getAll(): Promise<Course[]> {
    return this.courseRepository
      .createQueryBuilder('course')
      .leftJoinAndSelect('course.category', 'category')
      .leftJoinAndSelect('course.tutor', 'tutor')
      .select(['course', 'tutor.id', 'tutor.firstName', 'tutor.lastName', 'category'])
      .getMany();
  }

  async createCourse(courseData: AddCourseDto): Promise<Course> {
    const user = await this.checkUserExists(courseData);
    const category = await this.checkCategoryExists(courseData);
    await this.findCourseByTitle(courseData.title);

    const tutor = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    const course = this.courseRepository.create({
      tutor: tutor,
      category: category,
      title: courseData.title,
      description: courseData.description,
      duration: courseData.duration,
      price: courseData.price,
      isGroup: courseData.isGroup,
      startedAt: courseData.startedAt,
    });
    return this.courseRepository.save(course);
  }

  async removeOneCourse(id: number) {
    const course = await this.findCourseById(id);
    if (course) {
      return this.courseRepository.delete(id);
    }
  }

  async updateCourse(id: number, updateCourseDto: UpdateCourseDto) {
    const course = await this.findCourseById(id);
    const user = await this.checkUserExists(updateCourseDto);
    const category = await this.checkCategoryExists(updateCourseDto);

    // if (course) { {* без этой проверки результат такой же, удалить?*}
    course.tutor = user;
    course.category = category;
    course.title = updateCourseDto.title;
    course.description = updateCourseDto.description;
    course.duration = updateCourseDto.duration;
    course.price = updateCourseDto.price;
    course.isGroup = updateCourseDto.isGroup;
    course.startedAt = updateCourseDto.startedAt;

    await this.courseRepository.save(course);
    const { tutor, ...result } = await this.courseRepository
      .createQueryBuilder('course')
      .leftJoinAndSelect('course.category', 'category')
      .leftJoinAndSelect('course.tutor', 'tutor')
      .select(['course', 'tutor.id', 'category.id'])
      .where('course.id = :id', { id })
      .getOne();

    return {
      ...result,
      category: category.id.toString(),
      tutor: tutor.id.toString(),
    };
    // }
  }

  async getOneCourse(id: number) {
    await this.findCourseById(id);
    const { category, tutor, ...result } = await this.courseRepository
      .createQueryBuilder('course')
      .leftJoinAndSelect('course.category', 'category')
      .leftJoinAndSelect('course.tutor', 'tutor')
      .select(['course', 'tutor.id', 'category.id'])
      .where('course.id = :id', { id })
      .getOne();

    return {
      ...result,
      category: category.id.toString(),
      tutor: tutor.id.toString(),
    };
  }

  private async findCourseByTitle(title: string): Promise<void> {
    const course = await this.courseRepository.findOne({
      where: { title },
    });
    if (course) {
      throw new BadRequestException('Course with this title already exists');
    }
  }

  private async checkUserExists(courseData: AddCourseDto): Promise<User> {
    const existUser = await this.userRepository.findOne({
      where: { id: courseData.tutor },
    });
    if (!existUser) {
      throw new BadRequestException('Tutor was not found');
    }
    return existUser;
  }

  private async checkCategoryExists(courseData: AddCourseDto): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { id: courseData.category },
    });
    if (!category) {
      throw new BadRequestException('Category was not found');
    }
    return category;
  }

  private async findCourseById(id: number): Promise<Course> {
    const course = await this.courseRepository.findOne({
      where: { id },
    });
    if (!course) {
      throw new NotFoundException(`Course with id ${id} not found`);
    }
    return course;
  }
}
