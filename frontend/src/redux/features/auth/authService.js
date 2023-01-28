import axiosInstance from "../../../../utils/axiosInstance";


// Register user 
const register = async (userData) => {
    const response = await axiosInstance.post('/users/userSignup',userData)

    if(response.data) {
        localStorage.setItem('userData', JSON.stringify(userData))
    }

    return response.data
}


// Login user 

const login = async (userData) => {
    const response = await axiosInstance.post('/users/userLogin', userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}


// Logout user
const logout = () => {
    localStorage.removeItem('user')
}


const authService = {
    register,
    login,
    logout
}

export default authService