import AxiosServices from '~python/axiosServices';
import { IRecommend } from './types';

export const handleRecommend = (skills: string[]) => {
  return new AxiosServices().post<IRecommend>(`recommend`, { skills });
};
