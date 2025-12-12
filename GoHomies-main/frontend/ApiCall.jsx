import axios from 'axios';

const api = axios.create({
    baseURL:"http://localhost:8001/"
})

export const UserSignIn = async(email,password)=>{
    try {
        console.log('Attempting login with email:', email);
        const response = await api.post('user/login',{email:email,password:password},{
            withCredentials: true,
        })
        console.log('Login response received:', response);
        return response

    } catch (error) {
        console.error('Login request error:', error);
        console.error('Error response data:', error?.response?.data);
        return error.response
    }
}

export const UserSignUp = async(name,email,username,password)=>{
    try {
        const response = await api.post('user/',
            {
                name:name,
                email:email,
                username:username,
                password:password
            }
        )
        return response;
    
    } catch (error) {
        return error.response;
    }
}

export const CompleteUserProfile = async(userEmail,title,designation,about) =>{
    try {
        const response = await api.post('user/update',{
            email:userEmail,
            title:title,
            designation:designation,
            about:about
        })
        return response
    } catch (error) {
        return error.response
    }
}

export const CreatePost = async(destination,totalPersons,TravelMonth,BudgetPerPerson,description,imageFile) => {
    try {
        const formData = new FormData();
        formData.append('destination', destination);
        formData.append('totalPersons', totalPersons);
        formData.append('TravelMonth', TravelMonth);
        formData.append('BudgetPerPerson', BudgetPerPerson);
        formData.append('description', description);
        
        if (imageFile) {
            formData.append('image', imageFile);
        }

        const response = await api.post('post/create', formData, {
            withCredentials: true
        })

        return response
    } catch (error) {
        console.error('CreatePost Error:', error);
        return error.response
    }
}

export const FetchPost = async() => {
    try {
        const response = await api.get('post/fetch',{
            withCredentials: true 
        })

        return response
    } catch (error) {
        return error.response
    }
}

export const PostImages = async(destination)=> {
    const destinations = destination + " " + "tourism"
    console.log(destinations)
    try {
        const response = await axios.get(`https://api.unsplash.com/search/photos?query=${destinations}&client_id=3StF_Gofq_OG9yN9Wuq4-RHJM-b7jh89sBJpql5fOS0`);
       
        return response

    } catch (error) {
        console.log(error)
        return error.response
    }
}

export const CreateVlog = async(title, description, videoUrl) => {
    try {
        const response = await api.post('vlog/create', {
            title: title,
            description: description,
            videoUrl: videoUrl
        }, { withCredentials: true })

        return response
    } catch (error) {
        return error.response
    }
}

export const FetchVlogs = async() => {
    try {
        const response = await api.get('vlog/fetch', {
            withCredentials: true 
        })

        return response
    } catch (error) {
        return error.response
    }
}