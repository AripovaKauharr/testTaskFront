import axios from 'axios';
import type { GetCalls } from '../types/details.types';
import api from '../../../api';

export const fetchCalls = async (): Promise<GetCalls> => {
  try {
    const response = await api.get('/calls');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Ошибка загрузки');
    }
    throw error;
  }
};
