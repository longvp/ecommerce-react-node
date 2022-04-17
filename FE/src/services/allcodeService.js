import axios from '../axios'

const getAllCodeService = (typeInput) => {
    return axios.get(`/api/get-all-code?typeInput=${typeInput}`);
}

export {
    getAllCodeService,
}