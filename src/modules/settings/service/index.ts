import axios from 'axios';
import type { CreateUser, User } from '../types/user.types';
import api from '../../../api';

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Ошибка загрузки');
    }
    throw error;
  }
};

export const createUser = async (newUser: CreateUser): Promise<User> => {
  try {
    const response = await api.post('/users', newUser);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Ошибка создания');
    }
    throw error;
  }
};