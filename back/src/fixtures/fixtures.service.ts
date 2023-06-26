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
    await this.categoriesRepository.query('TRUNCATE TABLE "category" RESTART IDENTITY CASCADE');
    await this.usersRepository.query('TRUNCATE TABLE "user" RESTART IDENTITY CASCADE');
    await this.coursesRepository.query('TRUNCATE TABLE "course" RESTART IDENTITY CASCADE');
    await this.modulesRepository.query('TRUNCATE TABLE "course_module" RESTART IDENTITY CASCADE');
    await this.lessonsRepository.query('TRUNCATE TABLE "lesson" RESTART IDENTITY CASCADE');
    await this.purchasesRepository.query('TRUNCATE TABLE "purchase" RESTART IDENTITY CASCADE');
    await this.usersLessonsRepository.query('TRUNCATE TABLE "users_lesson" RESTART IDENTITY CASCADE');
    await this.studentHomeworksRepository.query('TRUNCATE TABLE "student_homework" RESTART IDENTITY CASCADE');
    await this.homeworksRepository.query('TRUNCATE TABLE "homework" RESTART IDENTITY CASCADE');
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
    const defaultCategory = await this.categoriesRepository.create({ title: 'Default  Category', isDefault: true });
    await this.categoriesRepository.save(defaultCategory);

    const smm = await this.categoriesRepository.create({ title: 'SMM', isDefault: false });
    await this.categoriesRepository.save(smm);

    const mobilography = await this.categoriesRepository.create({
      title: 'Mobilography',
      isDefault: false,
    });
    await this.categoriesRepository.save(mobilography);

    const graphicDesign = await this.categoriesRepository.create({
      title: 'Graphic Design',
      isDefault: false,
    });
    await this.categoriesRepository.save(graphicDesign);

    const contentCreator = await this.categoriesRepository.create({
      title: 'Content creator',
      isDefault: false,
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
      title: 'SMM Manager',
      description:
        "Get the profession of SMM manager. You will learn how to develop a strategy from scratch, generate ideas for viral content and prepare texts for social networks. You will learn what is an infotainment and content plan, and get acquainted with the visual architecture of content. On the basic version of the program, you'll take a deep dive into the technology field and be employable in nine months after you start learning.",
      startedAt: new Date('2023-05-15T09:00:00'),
      duration: '45',
      price: '150',
      isGroup: false,
    });
    await this.coursesRepository.save(smmCourse);

    const mobilographyCourse = await this.coursesRepository.create({
      tutor: tutorFirst,
      category: mobilographyCategory,
      title: 'Mobile Photography',
      description:
        'Would you like to learn how to take beautiful photos with your smartphone camera? Create memorable shots for your family archive or social media? Register for our Mobile Photography course. It\'s suitable for beginners as well as mobile photography enthusiasts who want to enhance their skills. With the courses offered by the offline school "Tehnikum," you\'ll not only be able to create stunning photos for yourself but also explore job opportunities in design studios.',
      startedAt: '2023-05-25T09:00:00',
      duration: '30',
      price: '200',
      isGroup: true,
    });
    await this.coursesRepository.save(mobilographyCourse);

    const seoCourse = await this.coursesRepository.create({
      tutor: tutorSecond,
      category: contentCreatorCategory,
      title: 'SEO Specialist',
      description:
        'Get the profession of a SEO specialist. You will learn how to prepare a website for promotion, conduct its technical audit, internal and external optimization. You will learn how to create the right site structure, analyze competitors and position yourself intelligently in the market. On the master version of the program you will dive deep into technological specialization and be able to get a job in 9 months after the start of training.',
      startedAt: '2023-05-22T09:00:00',
      duration: '180',
      price: '129',
      isGroup: false,
    });
    await this.coursesRepository.save(seoCourse);

    const graphicDesignerCourse = await this.coursesRepository.create({
      tutor: tutorSecond,
      category: graphicDesignCategory,
      title: 'Graphic Designer',
      description: 'Develop logos, corporate identity, advertising and print layouts',
      startedAt: '2023-05-18T09:00:00',
      duration: '60',
      price: '175',
      isGroup: true,
    });
    await this.coursesRepository.save(graphicDesignerCourse);
  }

  async createCoursesModules() {
    const seoCourse = await this.coursesRepository.findOne({
      where: { title: 'SEO Specialist' },
    });

    const smmCourse = await this.coursesRepository.findOne({
      where: { title: 'SMM Manager' },
    });

    const mobilographyCourse = await this.coursesRepository.findOne({
      where: { title: 'Mobile Photography' },
    });

    const graphicCourse = await this.coursesRepository.findOne({
      where: { title: 'Graphic Designer' },
    });

    const smmModuleFirst = await this.modulesRepository.create({
      course: smmCourse,
      number: 1,
      title: 'Main block',
      description: 'Guidance',
    });
    await this.modulesRepository.save(smmModuleFirst);

    const smmModuleSecond = await this.modulesRepository.create({
      course: smmCourse,
      number: 2,
      title: 'Specialty',
      description: 'Positioning the company in the market',
    });
    await this.modulesRepository.save(smmModuleSecond);

    const smmModuleThird = await this.modulesRepository.create({
      course: smmCourse,
      number: 3,
      title: 'Technological specialization',
      description: 'SMM strategy development',
    });
    await this.modulesRepository.save(smmModuleThird);

    const contentCreator = await this.modulesRepository.create({
      course: seoCourse,
      number: 1,
      title: 'Module #1',
      description: 'test',
    });
    await this.modulesRepository.save(contentCreator);
  }

  async createLessons() {
    const smmCourse = await this.coursesRepository.findOne({
      where: { title: 'SMM Manager' },
    });

    const smmModuleFirst = await this.modulesRepository.findOne({
      where: { course: { id: smmCourse.id }, number: 1 },
    });

    const smmModuleSecond = await this.modulesRepository.findOne({
      where: { course: { id: smmCourse.id }, number: 2 },
    });

    const smmModuleThird = await this.modulesRepository.findOne({
      where: { course: { id: smmCourse.id }, number: 3 },
    });

    const lesson1 = await this.lessonsRepository.create({
      course: smmCourse,
      module: smmModuleFirst,
      number: 1,
      video: 'fixtures/lessons/video/What is Social Media Marketing in 2 minutes..mp4',
      description:
        'Market analysis in SMM (Social Media Marketing) refers to the process of evaluating and understanding the market dynamics, trends, and consumer behavior within the social media landscape. It involves gathering and analyzing data related to target audiences, competitors, industry trends, and social media platforms to make informed decisions and develop effective marketing strategies.',
      title: 'Market analysis',
      isStopLesson: false,
    });
    await this.lessonsRepository.save(lesson1);

    const lesson2 = await this.lessonsRepository.create({
      course: smmCourse,
      module: smmModuleFirst,
      number: 2,
      video:
        'fixtures/lessons/video/Social Media Marketing In 5 Minutes _ What Is Social Media Marketing_ [For Beginners] _ Simplilearn.mp4',
      description:
        "Project idea development in SMM (Social Media Marketing) involves the process of generating and refining innovative concepts and strategies for social media campaigns or initiatives. It focuses on identifying unique and compelling ideas that align with the brand's objectives, target audience, and the dynamics of social media platforms. The goal is to create engaging and impactful projects that effectively reach and resonate with the target audience, leading to increased brand awareness, engagement, and conversions.",
      title: 'Project idea development',
      isStopLesson: false,
    });
    await this.lessonsRepository.save(lesson2);

    const lesson3 = await this.lessonsRepository.create({
      course: smmCourse,
      module: smmModuleFirst,
      number: 3,
      video:
        'fixtures/lessons/video/How to improve your page with Facebook posts_ _ Social Media Marketing Training Part 3.mp4',
      description:
        'Promotion of companies, products, and brands in SMM (Social Media Marketing) refers to the strategic activities undertaken to increase awareness, visibility, and engagement for a business, its offerings, and its brand identity on various social media platforms. It involves leveraging the power of social media channels to reach and connect with the target audience, build brand loyalty, and drive conversions. The primary goal of promotion in SMM is to effectively communicate the value proposition of a company, product, or brand and encourage its target audience to take desired actions.',
      title: 'Promotion of companies, products and brands',
      isStopLesson: true,
    });
    await this.lessonsRepository.save(lesson3);

    const lesson4 = await this.lessonsRepository.create({
      course: smmCourse,
      module: smmModuleSecond,
      number: 4,
      video: 'fixtures/lessons/video/Primal Studio Digital Marketing Animated Video.mp4',
      description:
        'Visuals and tools play a crucial role in the field of SMM (Social Media Marketing) as they help create visually appealing and engaging content. Here is a description of some popular visuals and tools used in SMM',
      title: 'Visuals and tools: Miro, Adobe, Figma, Tilda, Wordpress, Notion',
      isStopLesson: false,
    });
    await this.lessonsRepository.save(lesson4);

    const lesson5 = await this.lessonsRepository.create({
      course: smmCourse,
      module: smmModuleSecond,
      number: 5,
      video: 'fixtures/lessons/video/test-video.mp4',
      description:
        'UX research and Customer Journey Mapping (CJM) are essential components of creating a user-centered and engaging digital experience. Here is a description of each.',
      title: 'UX research and CJM',
      isStopLesson: false,
    });
    await this.lessonsRepository.save(lesson5);

    const lesson6 = await this.lessonsRepository.create({
      course: smmCourse,
      module: smmModuleSecond,
      number: 6,
      video: 'fixtures/lessons/video/CJM.mp4',
      description:
        'Guidance on the choice of technical specialization in SMM (Social Media Marketing) involves providing individuals with information and recommendations to help them select the most suitable technical skills and tools to enhance their SMM expertise.',
      title: 'Guidance on the choice of technical specialization',
      isStopLesson: true,
    });
    await this.lessonsRepository.save(lesson6);

    const lesson7 = await this.lessonsRepository.create({
      course: smmCourse,
      module: smmModuleThird,
      number: 7,
      video: 'fixtures/lessons/video/Primal Studio Digital Marketing Animated Video.mp4',
      description:
        'Preparation for the final certification in SMM (Social Media Marketing) involves comprehensive training and guidance to equip individuals with the knowledge and skills necessary to successfully pass the certification exam.',
      title: 'Preparation for the final certification',
      isStopLesson: false,
    });
    await this.lessonsRepository.save(lesson7);
  }

  async createHomeworks() {
    const lesson1 = await this.lessonsRepository.findOne({
      where: { title: 'Market analysis' },
    });

    const lesson2 = await this.lessonsRepository.findOne({
      where: { title: 'Project idea development' },
    });

    const tutorFirst = await this.usersRepository.findOne({
      where: { email: 'tutor-first@gmail.com' },
    });

    const tutorSecond = await this.usersRepository.findOne({
      where: { email: 'tutor-second@gmail.com' },
    });

    const homework1ToLesson1 = await this.homeworksRepository.create({
      lesson: lesson1,
      title: 'MarketScope: Analyzing Social Media Landscapes',
      tutorName: tutorFirst.firstName,
      tutorEmail: tutorFirst.email,
      date: '2023-05-21 20:19:16.937+06',
      description:
        'This homework focuses on analyzing social media data to uncover valuable insights about market potential, allowing you to make informed decisions for your marketing strategies.',
      pdf: 'fixtures/homeworks/pdf/example.pdf',
    });
    await this.homeworksRepository.save(homework1ToLesson1);

    const homework2ToLesson1 = await this.homeworksRepository.create({
      lesson: lesson1,
      title: 'Social Pulse: Exploring Market Dynamics',
      tutorName: tutorSecond.firstName,
      tutorEmail: tutorSecond.email,
      date: '2023-05-15 20:19:17.937+06',
      description:
        'This homework explores the dynamic nature of the market through social media analysis. You will examine fluctuations in consumer behavior, engagement patterns, and industry influencers to gain a deeper understanding of market dynamics.',
      pdf: 'fixtures/homeworks/pdf/example.pdf',
    });
    await this.homeworksRepository.save(homework2ToLesson1);

    const homework1ToLesson2 = await this.homeworksRepository.create({
      lesson: lesson2,
      title: 'Social Spotlight: Illuminating Market Analysis',
      tutorName: tutorFirst.firstName,
      tutorEmail: tutorFirst.email,
      date: '2023-05-09 20:19:18.937+06',
      description:
        'This homework sheds light on the market analysis process by examining key metrics, consumer sentiment, and competitive positioning. You will gain insights into market opportunities and challenges.',
      pdf: 'fixtures/homeworks/pdf/example.pdf',
    });
    await this.homeworksRepository.save(homework1ToLesson2);

    const homework2ToLesson2 = await this.homeworksRepository.create({
      lesson: lesson2,
      title: 'SMMarket Analyzer: Examining Social Media Markets',
      tutorName: tutorSecond.firstName,
      tutorEmail: tutorSecond.email,
      date: '2023-05-03 20:19:19.937+06',
      description:
        'This assignment focuses on analyzing social media markets, including platform-specific trends, user behavior, and market segmentation. You will develop a comprehensive understanding of how social media platforms can influence marketing strategies.',
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
      where: { email: 'user@gmail.com' },
    });

    const userSecond = await this.usersRepository.findOne({
      where: { email: 'user-second@gmail.com' },
    });

    const studentHomework1ToHomework1 = await this.studentHomeworksRepository.create({
      homework: homework1,
      studentName: userFirst.firstName,
      status: 'Done',
      studentEmail: userFirst.email,
      date: '2023-05-03 20:19:16.937+06',
      isChecked: 'Not checked',
      studentFiles: ['fixtures/studentHomeworks/pdf/example.pdf', 'fixtures/studentHomeworks/pdf/book.jpeg'],
    });
    await this.studentHomeworksRepository.save(studentHomework1ToHomework1);

    const studentHomework2ToHomework1 = await this.studentHomeworksRepository.create({
      homework: homework1,
      studentName: userSecond.firstName,
      status: 'Done',
      studentEmail: userSecond.email,
      date: '2023-05-03 20:19:17.937+06',
      isChecked: 'Not checked',
      studentFiles: ['fixtures/studentHomeworks/pdf/example.pdf', 'fixtures/studentHomeworks/pdf/book.jpeg'],
    });
    await this.studentHomeworksRepository.save(studentHomework2ToHomework1);

    const studentHomework1ToHomework2 = await this.studentHomeworksRepository.create({
      homework: homework2,
      studentName: userFirst.firstName,
      status: 'Done',
      studentEmail: userFirst.email,
      date: '2023-05-03 20:19:18.937+06',
      isChecked: 'Not checked',
      studentFiles: ['fixtures/studentHomeworks/pdf/example.pdf', 'fixtures/studentHomeworks/pdf/book.jpeg'],
    });
    await this.studentHomeworksRepository.save(studentHomework1ToHomework2);

    const studentHomework2ToHomework2 = await this.studentHomeworksRepository.create({
      homework: homework2,
      studentName: userSecond.firstName,
      status: 'Done',
      studentEmail: userSecond.email,
      date: '2023-05-03 20:19:19.937+06',
      isChecked: 'Not checked',
      studentFiles: ['fixtures/studentHomeworks/pdf/example.pdf', 'fixtures/studentHomeworks/pdf/book.jpeg'],
    });
    await this.studentHomeworksRepository.save(studentHomework2ToHomework2);
  }

  async createPurchases() {
    const user = await this.usersRepository.findOne({
      where: { email: 'user@gmail.com' },
    });

    const smmCourse = await this.coursesRepository.findOne({
      where: { title: 'SMM Manager' },
    });

    const firstPurchase = await this.purchasesRepository.create({
      purchaser: user,
      course: smmCourse,
      purchasedAt: new Date('2023-05-05T09:00:00'),
    });
    await this.purchasesRepository.save(firstPurchase);
  }

  async createUsersLessons() {
    const user = await this.usersRepository.findOne({
      where: { email: 'user@gmail.com' },
    });

    const lessons = await this.lessonsRepository.find({
      where: { course: { title: 'SMM Manager' } },
      order: { number: 'ASC' },
    });

    const firstUsersLesson = await this.usersLessonsRepository.create({
      student: user,
      lesson: lessons[0],
    });
    await this.usersLessonsRepository.save(firstUsersLesson);

    const secondUsersLesson = await this.usersLessonsRepository.create({
      student: user,
      lesson: lessons[1],
    });
    await this.usersLessonsRepository.save(secondUsersLesson);

    const thirdUsersLesson = await this.usersLessonsRepository.create({
      student: user,
      lesson: lessons[2],
    });
    await this.usersLessonsRepository.save(thirdUsersLesson);
  }
}
