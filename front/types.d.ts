export interface RegisterMutation {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface LoginMutation {
  email: string;
  password: string;
}

export interface ValidationError {
  [key: string]: string[];
}

export interface ValidationErrors {
  [key: string]: string;
}

export interface GlobalError {
  error: string;
  message: string;
}

export interface LoginError {
  error: string;
  message: string;
  statusCode: number;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  token: string;
  email: string;
  role: string;
  phoneNumber: string;
  country: string;
  googleId?: string;
  avatar: string;
}

export interface ProfileMutation {
  email: string;
  firstName: string;
  country: string;
}

export interface Lesson {
  id: number;
  courseId: number;
  moduleId: number;
  number: number;
  title: string;
  video: string;
  description: string;
  isStopLesson: boolean;
}

export interface UserLesson {
  id: number;
  number: number;
  title: string;
  video: string;
  description: string;
  isStopLesson: boolean;
  module: UsersModule;
}

export interface UsersModule {
  id: number;
  number: number;
  description: string;
  title: string;
}

export interface Homework {
  id: string;
  lesson: Lesson;
  title: string;
  tutorName: string;
  tutorEmail: string;
  date: string;
  description: string;
  pdf: string;
}

export interface TutorHomework {
  id: string;
  homework: Homework;
  date: Date;
  status: string;
  studentName: string;
  studentEmail: string;
  isChecked: string;
  studentFiles: string[];
}

export interface HomeworkMutation {
  lesson: string;
  title: string;
  description: string;
  pdf: File | null;
}

export interface ApiHomework {
  lesson: string;
  title: string;
  description: string;
  pdf: File | null;
}

export interface StudentHomework {
  id: string;
  homework: Homework;
  status: string;
  studentName: string;
  studentEmail: string;
  date: string;
  isChecked: string;
  studentFiles: string;
}

export interface StudentHomeworkMutation {
  homework: string;
  studentFiles: File[] | null;
}

export interface ApiStudentHomework {
  homework: string;
  studentFiles: File[] | null;
}

export interface Category {
  id: number;
  title: string;
}

export interface CategoryMutation {
  title: string;
}

export interface Course {
  id: number;
  tutor: User;
  category: Category;
  title: string;
  description: string;
  price: string;
  duration: string;
  isGroup: boolean;
  startedAt: Date;
}

export interface CourseMutation {
  tutor: string;
  category: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  isGroup: boolean | null;
  startedAt: string;
}

export interface ApiCourse {
  tutor: number;
  category: number;
  title: string;
  description: string;
  price: string;
  duration: string;
  isGroup: boolean | null;
  startedAt: Date | null | string;
}

export interface Tutor {
  id: number;
  firstName: string;
  lastName: string;
  courses: string[];
}

export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  purchases: string[];
}

export interface UsersCourse {
  id: number;
  category: string;
  title: string;
  tutor: string;
  modules: UsersModule[];
}

export interface UsersModule {
  id: number;
  number: number;
  title: string;
  lessons: number;
}

export interface UsersLesson {
  id: number;
  student: number;
  lesson: UserLesson;
  isViewed: boolean;
  isAvailable: boolean;
}

export interface UsersPurchase {
  id: number;
  category: string;
  title: string;
  tutor: TutorType;
  modules: ModuleType[];
}

export interface TutorType {
  firstName: string;
  lastName: string;
}

export interface ModuleType {
  id: number;
  number: number;
  numberOfLessons: number;
  title: string;
}

export interface ModuleLesson {
  id: number;
  number: number;
  moduleNumber: number;
  title: string;
  description: string;
  video: string;
  isAvailable: boolean;
  isStopLesson: boolean;
  isViewed: boolean;
  viewedAt: Date | null;
}

export interface ChatMsg {
  id: number;
  userId: number;
  displayName: string;
  avatar: string;
  message: string;
  createdAt: Date;
}

export interface UserData {
  name: string;
  email: string;
  message: string;
}

export interface ApiPurchase {
  email: string;
  course: number;
}

export interface PurchaseMutation {
  email: string;
  course: string;
}
