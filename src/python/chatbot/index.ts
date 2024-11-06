import AxiosServices from '~python/axiosServices';

export const chat = (question: string) => {
  return new AxiosServices().get<string>(`chat?question=${question}`);
};
