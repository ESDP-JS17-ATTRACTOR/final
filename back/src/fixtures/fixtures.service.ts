import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
import { Course } from '../entities/course.entity';
import { CourseModule } from '../entities/courseModule.entity';

@Injectable()
export class FixturesService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
    @InjectRepository(Course)
    private readonly coursesRepository: Repository<Course>,
    @InjectRepository(CourseModule)
    private readonly modulesRepository: Repository<CourseModule>,
  ) {}

  async dropTables(): Promise<void> {
    await this.usersRepository.query(
      'TRUNCATE TABLE "user" RESTART IDENTITY CASCADE',
    );
  }

  async createUsers() {
    const user = await this.usersRepository.create({
      email: 'user@gmail.com',
      firstName: 'John',
      lastName: 'Doe',
      password: 'password',
    });
    await user.generateToken();
    await this.usersRepository.save(user);

    const admin = await this.usersRepository.create({
      email: 'admin@gmail.com',
      firstName: 'Jane',
      lastName: 'Doe',
      password: 'password',
      role: 'admin',
    });
    await admin.generateToken();
    await this.usersRepository.save(admin);

    const tutorFirst = await this.usersRepository.create({
      email: 'tutor-first@gmail.com',
      firstName: 'Jack',
      lastName: 'Doe',
      password: 'password',
      role: 'tutor',
    });
    await tutorFirst.generateToken();
    await this.usersRepository.save(tutorFirst);

    const tutorSecond = await this.usersRepository.create({
      email: 'tutor-second@gmail.com',
      firstName: 'Jack',
      lastName: 'Doe',
      password: 'password',
      role: 'tutor',
    });
    await tutorSecond.generateToken();
    await this.usersRepository.save(tutorSecond);

    const moderator = await this.usersRepository.create({
      email: 'moderator@gmail.com',
      firstName: 'Joshua',
      lastName: 'Doe',
      password: 'password',
      role: 'moderator',
    });
    await moderator.generateToken();
    await this.usersRepository.save(moderator);
  }

  async createCategories() {
    const smm = await this.categoriesRepository.create({ title: 'SMM' });
    await this.categoriesRepository.save(smm);

    const mobilography = await this.categoriesRepository.create({
      title: 'Mobilography',
    });
    await this.categoriesRepository.save(mobilography);

    const graphicDesign = await this.categoriesRepository.create({
      title: 'Graphic Design',
    });
    await this.categoriesRepository.save(graphicDesign);

    const contentCreator = await this.categoriesRepository.create({
      title: 'Content creator',
    });
    await this.categoriesRepository.save(contentCreator);
  }

  async createCourses() {
    const tutorFirst = await this.usersRepository.findOne({
      where: { email: 'tutor-first@gmail.com' },
    });
    const tutorSecond = await this.usersRepository.findOne({
      where: { email: 'tutor-second@gmail.com' },
    });
    const smmCategory = await this.categoriesRepository.findOne({
      where: { title: 'SMM' },
    });
    const graphicDesignCategory = await this.categoriesRepository.findOne({
      where: { title: 'Graphic Design' },
    });
    const mobilographyCategory = await this.categoriesRepository.findOne({
      where: { title: 'Mobilography' },
    });
    const contentCreatorCategory = await this.categoriesRepository.findOne({
      where: { title: 'Content creator' },
    });

    const smmCourse = await this.coursesRepository.create({
      tutor: tutorFirst,
      category: smmCategory,
      title: 'SMM ZA 30 DNEI',
      description: 'My nauchim vas delat SMM, vy budete samyi luchshii SMM',
      startedAt: '2023-05-15T09:00:00',
      duration: '30',
      price: '7500',
      isGroup: false,
    });
    await this.coursesRepository.save(smmCourse);

    const mobilographyCourse = await this.coursesRepository.create({
      tutor: tutorFirst,
      category: mobilographyCategory,
      title: 'Mobilographya ZA 45 DNEI',
      description:
        'My nauchim vas delat Mobilographia, vy budete samyi presamyi luchshii Mobilographia',
      startedAt: '2023-05-25T09:00:00',
      duration: '45',
      price: '15500',
      isGroup: true,
    });
    await this.coursesRepository.save(mobilographyCourse);

    const contentCreatorCourse = await this.coursesRepository.create({
      tutor: tutorSecond,
      category: contentCreatorCategory,
      title: 'contentCreator ZA 30 DNEI',
      description:
        'My nauchim vas delat contentCreator, vy budete samyi presamyi luchshii contentCreator',
      startedAt: '2023-05-22T09:00:00',
      duration: '30',
      price: '6500',
      isGroup: false,
    });
    await this.coursesRepository.save(contentCreatorCourse);

    const graphicDesignerCourse = await this.coursesRepository.create({
      tutor: tutorSecond,
      category: graphicDesignCategory,
      title: 'graphicDesigner ZA 45 DNEI',
      description:
        'My nauchim vas delat graphicDesigner, vy budete samyi presamyi luchshii graphicDesigner',
      startedAt: '2023-05-18T09:00:00',
      duration: '45',
      price: '25500',
      isGroup: true,
    });
    await this.coursesRepository.save(graphicDesignerCourse);
  }

  async createModules() {
    const contentCreatorCourse = await this.coursesRepository.findOne({
      where: { title: 'contentCreator ZA 30 DNEI' },
    });

    const smmCourse = await this.coursesRepository.findOne({
      where: { title: 'SMM ZA 30 DNEI' },
    });

    const smmModuleFirst = await this.modulesRepository.create({
      course: smmCourse,
      number: 1,
      title: 'Module #1',
      description: 'test',
    });
    await this.modulesRepository.save(smmModuleFirst);

    const smmModuleSecond = await this.modulesRepository.create({
      course: smmCourse,
      number: 2,
      title: 'Module #2',
      description: 'test',
    });
    await this.modulesRepository.save(smmModuleSecond);

    const smmModuleThird = await this.modulesRepository.create({
      course: smmCourse,
      number: 3,
      title: 'Module #3',
      description: 'test',
    });
    await this.modulesRepository.save(smmModuleThird);

    const contentCreator = await this.modulesRepository.create({
      course: contentCreatorCourse,
      number: 1,
      title: 'Module #1',
      description: 'test',
    });
    await this.modulesRepository.save(contentCreator);
  }
}
