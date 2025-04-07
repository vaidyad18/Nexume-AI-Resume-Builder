import axios from "axios";

const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;
const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL+"/api",
    headers: {
        "Content-Type": 'application/json',
        'Authorization': `Bearer ${API_KEY}`
    }
});

const CreateNewResume = (data) => {
    return axiosClient.post('/user-resumes', { data }); 
};

const GetUserResumes=(userMail)=>{
    return axiosClient.get('/user-resumes?filters[userMail][$eq]='+userMail)
}

const UpdateResumeDetail = (data,id) => {
    return axiosClient.put('/user-resumes/'+id,data); 
};

const GetResumeById = (id) => {
    return axiosClient.get('/user-resumes/'+id+"?populate=*"); 
};

const DeleteResumeById = (id) => {
    return axiosClient.delete('/user-resumes/'+id); 
};

export default {
    CreateNewResume,
    GetUserResumes,
    UpdateResumeDetail,
    GetResumeById,
    DeleteResumeById
};
