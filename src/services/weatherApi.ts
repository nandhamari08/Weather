import axios from 'axios';
import type { WeatherData } from '../types/weather';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || '020f7af3801b4fb5bbf132919261205';
const BASE_URL = 'https://api.weatherapi.com/v1';

export const fetchWeather = async (city: string): Promise<WeatherData> => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast.json`, {
      params: {
        key: API_KEY,
        q: city,
        days: 4,
        aqi: 'no',
        alerts: 'no',
      },
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error?.message || 'Failed to fetch weather data', { cause: error });
    }
    throw new Error('An unexpected error occurred', { cause: error });
  }
};

export const fetchWeatherByCoords = async (lat: number, lon: number): Promise<WeatherData> => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast.json`, {
      params: {
        key: API_KEY,
        q: `${lat},${lon}`,
        days: 4,
        aqi: 'no',
        alerts: 'no',
      },
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error?.message || 'Failed to fetch weather data by coordinates', { cause: error });
    }
    throw new Error('An unexpected error occurred while fetching by coordinates', { cause: error });
  }
};
