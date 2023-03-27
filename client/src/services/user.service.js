import axios from 'axios';
const API_URL = process.env.REACT_APP_SERVER_HOST_ADDRESS;

function processImageRequest(data) {
        return axios.post(API_URL + 'faceDetection', data);
    }

const userService = {
    processImageRequest
}

export default userService;