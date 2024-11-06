import AxiosServices from '../axiosServices.js';

const chat = (question) => {
    return new AxiosServices().get(`chat?question=${question}`);
};

export { chat };
