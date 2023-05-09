import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../../axiosApi";
import { GlobalError, ModuleLesson, UsersLesson } from "../../../types";
import {isAxiosError} from "axios";

export const fetchModuleLessons = createAsyncThunk<ModuleLesson[], string>(
  'usersLessons/fetchByModuleId',
  async (moduleId) => {
    const response = await axiosApi.get<ModuleLesson[]>(`/users-lessons?id=${moduleId}`);
    return response.data;
  }
);

export const fetchUsersLessons = createAsyncThunk<UsersLesson[]>(
  'usersLessons/fetchAll',
  async () => {
    try {
      const response = await axiosApi.get<UsersLesson[]>('/users-lessons');
      return response.data;
    } catch (e) {
      throw e;
    }
  }
);

export const fetchOneUsersLesson = createAsyncThunk<UsersLesson, string>(
  'usersLessons/fetchOne',
  async (id) => {
    try {
      const response = await axiosApi.get<UsersLesson>(`/users-lessons/${Number(id)}`);
      return response.data;
    } catch (e) {
      throw e;
    }
  }
);

export const createUsersLessons = createAsyncThunk<void, number>(
  'usersLessons/createAll',
  async (courseId) => {
    try {
      const id = { id: courseId};
      await axiosApi.post('/users-lessons', id);
    } catch (e) {
      if (isAxiosError(e) && e.response) {
        return alert(e.response.data.error as GlobalError);
      }
      throw (e);
    }
  }
);