import AxiosServices from '../axiosServices.js';

const handleRecommend = (skills) => {
    return new AxiosServices().post(`recommend`, { skills });
};

export { handleRecommend };
