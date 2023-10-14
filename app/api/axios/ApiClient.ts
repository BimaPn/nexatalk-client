import axios from 'axios';
import { getSession } from 'next-auth/react';

const baseURL = process.env.NEXT_PUBLIC_DATABASE_URL || "http://localhost:3500";

const ApiClient = () => {
  const defaultOptions = {
    baseURL,
  };
  const instance = axios.create(defaultOptions);

  instance.interceptors.request.use(async (request) => {
    const session = await getSession();
    if (session) {
      request.headers.Authorization = `Bearer ${session.user.accessToken}`;
    }
    return request;
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },

  );
  return instance;
};

export default ApiClient();
