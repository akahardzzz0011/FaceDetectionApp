import axios from 'axios';
const API_URL = process.env.SERVER_HOST_ADDRESS;

class UserService {
    processImageRequest(data) {
        return axios.post(API_URL + 'faceDetection/', data);
    }
}

export default new UserService();