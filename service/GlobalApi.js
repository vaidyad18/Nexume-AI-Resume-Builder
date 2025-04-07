import axios from "axios";

const API_KEY = '3e085e0d7c3ec083af992ca7c708806025e9fe78979c1b73e76f9dfa1b921be18f8aade5a422b091005b148684004a8e8d8c46a7b10cb0deec07223f2486cf55aa62cb760ae7ebbd9a9747dda3e3d2055c89fe958bab039d495d62492d8d84038b13b78c0a217a8bd254f728d52f1eb59b869a6eb125e9d926e96d6840804d00';
const axiosClient = axios.create({
    baseURL: 'https://nexume-strapi-admin.onrender.com/api',
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
