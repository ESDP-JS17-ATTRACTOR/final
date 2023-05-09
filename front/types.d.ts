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
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _name: string;
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
  _id: string;
  firstName: string;
  lastName: string;
  token: string;
  email: string;
  role: string;
  phoneNumber: string;
  country: string;
  googleId?: string;
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
  price: string;
  duration: string;
  isGroup: boolean;
}

export interface CourseMutation {
  tutor: string;
  category: string;
  title: string;
  price: string;
  duration: string;
  isGroup: boolean | null;
}

export interface ApiCourse {
  tutor: number;
  category: number;
  title: string;
  price: string;
  duration: string;
  isGroup: boolean | null;
}

export interface Tutor {
  id: number;
  firstName: string;
  lastName: string;
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
  lesson: Lesson;
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

