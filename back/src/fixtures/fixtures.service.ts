import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
import { Course } from '../entities/course.entity';
import { CourseModule } from '../entities/courseModule.entity';
import { Lesson } from '../entities/lesson.entity';
import { Purchase } from '../entities/purchase.entity';
import { UsersLesson } from '../entities/usersLesson.entity';
import { Homework } from '../entities/homework.entity';
import { StudentHomework } from '../entities/studentHomework.entity';

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
    @InjectRepository(Lesson)
    private readonly lessonsRepository: Repository<Lesson>,
    @InjectRepository(Purchase)
    private readonly purchasesRepository: Repository<Purchase>,
    @InjectRepository(UsersLesson)
    private readonly usersLessonsRepository: Repository<UsersLesson>,
    @InjectRepository(Homework)
    private readonly homeworksRepository: Repository<Homework>,
    @InjectRepository(StudentHomework)
    private readonly studentHomeworksRepository: Repository<StudentHomework>,
  ) {}

  async dropTables(): Promise<void> {
    await this.categoriesRepository.query(
      'TRUNCATE TABLE "category" RESTART IDENTITY CASCADE',
    );
    await this.usersRepository.query(
      'TRUNCATE TABLE "user" RESTART IDENTITY CASCADE',
    );
    await this.coursesRepository.query(
      'TRUNCATE TABLE "course" RESTART IDENTITY CASCADE',
    );
    await this.modulesRepository.query(
      'TRUNCATE TABLE "course_module" RESTART IDENTITY CASCADE',
    );
    await this.lessonsRepository.query(
      'TRUNCATE TABLE "lesson" RESTART IDENTITY CASCADE',
    );
    await this.purchasesRepository.query(
      'TRUNCATE TABLE "purchase" RESTART IDENTITY CASCADE',
    );
    await this.usersLessonsRepository.query(
      'TRUNCATE TABLE "users_lesson" RESTART IDENTITY CASCADE',
    );
    await this.homeworksRepository.query(
      'TRUNCATE TABLE "homework" RESTART IDENTITY CASCADE',
    );
    await this.studentHomeworksRepository.query(
      'TRUNCATE TABLE "student_homework" RESTART IDENTITY CASCADE',
    );
  }

  async createUsers() {
    const userFirst = await this.usersRepository.create({
      email: 'user-first@gmail.com',
      firstName: 'John',
      lastName: 'Doe',
      password: 'password',
    });
    await userFirst.generateToken();
    await this.usersRepository.save(userFirst);

    const userSecond = await this.usersRepository.create({
      email: 'user-second@gmail.com',
      firstName: 'Jane',
      lastName: 'Doe',
      password: 'password',
    });
    await userSecond.generateToken();
    await this.usersRepository.save(userSecond);

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

  async createLessons() {
    const smmCourse = await this.coursesRepository.findOne({
      where: { title: 'SMM ZA 30 DNEI' },
    });

    const smmModuleFirst = await this.modulesRepository.findOne({
      where: { course: { id: smmCourse.id }, number: 1 },
    });

    const lesson1 = await this.lessonsRepository.create({
      course: smmCourse,
      module: smmModuleFirst,
      number: 1,
      video: 'fixtures/lessons/video/test-video.mp4',
      description: 'test',
      title: 'Lesson #1',
      isStopLesson: false,
    });
    await this.lessonsRepository.save(lesson1);

    const lesson2 = await this.lessonsRepository.create({
      course: smmCourse,
      module: smmModuleFirst,
      number: 2,
      video: 'fixtures/lessons/video/test-video.mp4',
      description: 'test',
      title: 'Lesson #2',
      isStopLesson: false,
    });
    await this.lessonsRepository.save(lesson2);

    const lesson3 = await this.lessonsRepository.create({
      course: smmCourse,
      module: smmModuleFirst,
      number: 3,
      video: 'fixtures/lessons/video/test-video.mp4',
      description: 'test',
      title: 'Lesson #3',
      isStopLesson: true,
    });
    await this.lessonsRepository.save(lesson3);

    const lesson4 = await this.lessonsRepository.create({
      course: smmCourse,
      module: smmModuleFirst,
      number: 4,
      video: 'fixtures/lessons/video/test-video.mp4',
      description: 'test',
      title: 'Lesson #4',
      isStopLesson: false,
    });
    await this.lessonsRepository.save(lesson4);

    const lesson5 = await this.lessonsRepository.create({
      course: smmCourse,
      module: smmModuleFirst,
      number: 5,
      video: 'fixtures/lessons/video/test-video.mp4',
      description: 'test',
      title: 'Lesson #5',
      isStopLesson: false,
    });
    await this.lessonsRepository.save(lesson5);

    const lesson6 = await this.lessonsRepository.create({
      course: smmCourse,
      module: smmModuleFirst,
      number: 6,
      video: 'fixtures/lessons/video/test-video.mp4',
      description: 'test',
      title: 'Lesson #6',
      isStopLesson: true,
    });
    await this.lessonsRepository.save(lesson6);

    const lesson7 = await this.lessonsRepository.create({
      course: smmCourse,
      module: smmModuleFirst,
      number: 7,
      video: 'fixtures/lessons/video/test-video.mp4',
      description: 'test',
      title: 'Lesson #7',
      isStopLesson: false,
    });
    await this.lessonsRepository.save(lesson7);
  }

  async createHomeworks() {
    const lesson1 = await this.lessonsRepository.findOne({
      where: { title: 'Lesson #1' },
    });

    const lesson2 = await this.lessonsRepository.findOne({
      where: { title: 'Lesson #2' },
    });

    const tutorFirst = await this.usersRepository.findOne({
      where: { email: 'tutor-first@gmail.com' },
    });

    const tutorSecond = await this.usersRepository.findOne({
      where: { email: 'tutor-second@gmail.com' },
    });

    const homework1ToLesson1 = await this.homeworksRepository.create({
      lesson: lesson1,
      title: 'Homework1ToLesson1',
      tutorName: tutorFirst.firstName,
      tutorEmail: tutorFirst.email,
      date: '2023-05-03 20:19:16.937+06',
      description: 'Description about Homework1ToLesson1',
      pdf: 'fixtures/homeworks/pdf/example.pdf',
    });
    await this.homeworksRepository.save(homework1ToLesson1);

    const homework2ToLesson1 = await this.homeworksRepository.create({
      lesson: lesson1,
      title: 'Homework2ToLesson1',
      tutorName: tutorSecond.firstName,
      tutorEmail: tutorSecond.email,
      date: '2023-05-03 20:19:17.937+06',
      description: 'Description about Homework2ToLesson1',
      pdf: 'fixtures/homeworks/pdf/example.pdf',
    });
    await this.homeworksRepository.save(homework2ToLesson1);

    const homework1ToLesson2 = await this.homeworksRepository.create({
      lesson: lesson2,
      title: 'Homework1ToLesson2',
      tutorName: tutorFirst.firstName,
      tutorEmail: tutorFirst.email,
      date: '2023-05-03 20:19:18.937+06',
      description: 'Description about Homework1ToLesson2',
      pdf: 'fixtures/homeworks/pdf/example.pdf',
    });
    await this.homeworksRepository.save(homework1ToLesson2);

    const homework2ToLesson2 = await this.homeworksRepository.create({
      lesson: lesson2,
      title: 'Homework2ToLesson2',
      tutorName: tutorSecond.firstName,
      tutorEmail: tutorSecond.email,
      date: '2023-05-03 20:19:19.937+06',
      description: 'Description about Homework2ToLesson2',
      pdf: 'fixtures/homeworks/pdf/example.pdf',
    });
    await this.homeworksRepository.save(homework2ToLesson2);
  }

  async createStudentHomeworks() {
    const homework1 = await this.homeworksRepository.findOne({
      where: { id: 1 },
    });

    const homework2 = await this.homeworksRepository.findOne({
      where: { id: 2 },
    });

    const userFirst = await this.usersRepository.findOne({
      where: { email: 'user-first@gmail.com' },
    });

    const userSecond = await this.usersRepository.findOne({
      where: { email: 'user-second@gmail.com' },
    });

    const studentHomework1ToHomework1 =
      await this.studentHomeworksRepository.create({
        homework: homework1,
        studentName: userFirst.firstName,
        status: 'Done',
        studentEmail: userFirst.email,
        date: '2023-05-03 20:19:16.937+06',
        isChecked: 'Not checked',
        studentFiles: [
          'fixtures/studentHomeworks/pdf/example.pdf',
          'fixtures/studentHomeworks/pdf/book.jpeg',
        ],
      });
    await this.studentHomeworksRepository.save(studentHomework1ToHomework1);

    const studentHomework2ToHomework1 =
      await this.studentHomeworksRepository.create({
        homework: homework1,
        studentName: userSecond.firstName,
        status: 'Done',
        studentEmail: userSecond.email,
        date: '2023-05-03 20:19:17.937+06',
        isChecked: 'Not checked',
        studentFiles: [
          'fixtures/studentHomeworks/pdf/example.pdf',
          'fixtures/studentHomeworks/pdf/book.jpeg',
        ],
      });
    await this.studentHomeworksRepository.save(studentHomework2ToHomework1);

    const studentHomework1ToHomework2 =
      await this.studentHomeworksRepository.create({
        homework: homework2,
        studentName: userFirst.firstName,
        status: 'Done',
        studentEmail: userFirst.email,
        date: '2023-05-03 20:19:18.937+06',
        isChecked: 'Not checked',
        studentFiles: [
          'fixtures/studentHomeworks/pdf/example.pdf',
          'fixtures/studentHomeworks/pdf/book.jpeg',
        ],
      });
    await this.studentHomeworksRepository.save(studentHomework1ToHomework2);

    const studentHomework2ToHomework2 =
      await this.studentHomeworksRepository.create({
        homework: homework2,
        studentName: userSecond.firstName,
        status: 'Done',
        studentEmail: userSecond.email,
        date: '2023-05-03 20:19:19.937+06',
        isChecked: 'Not checked',
        studentFiles: [
          'fixtures/studentHomeworks/pdf/example.pdf',
          'fixtures/studentHomeworks/pdf/book.jpeg',
        ],
      });
    await this.studentHomeworksRepository.save(studentHomework2ToHomework2);
  }
}
