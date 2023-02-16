import axiosInstance from  '../../../../utils/axiosInstance'

// Register Driver
const register = async (driverData) => {
    const response = await axiosInstance.post('/driver/signup',driverData)
    console.log("response",driverData);
    return response.data
}

// Login Driver
const login = async (loginData) => {
    const response = await axiosInstance.post('/driver/login',loginData)
    if (response.data) {
        localStorage.setItem('driver', JSON.stringify(response.data))
    }
    return response.data
}

const driverAuthService = {
    register,
    login
}

export default driverAuthService