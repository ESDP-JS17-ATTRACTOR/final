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
  phoneNumber: string;
  country: string;
  googleId?: string;
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