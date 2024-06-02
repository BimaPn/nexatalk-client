import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_DATABASE_URL || "http://localhost:3500";

const ApiServer = (token:string) => {
  const defaultOptions = {
    baseURL,
  };
  const instance = axios.create(defaultOptions);

  instance.interceptors.request.use((request) => {
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
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

export default ApiServer;
