import axiosInstance from "../../../../../utils/axiosInstance";


// Book Car
const bookCar = async(bookingData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axiosInstance.post('/users/bookCar',bookingData,config)
    return response.data
}


// Pay Car
const payCar = async(checkoutData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axiosInstance.post('/users/payment', checkoutData, config)
    return response.data
}

const userBookings = async(userId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axiosInstance.get(`/users/myBookings?id=${userId}`, config)
    return response.data
}


const bookingService = {
    bookCar,
    payCar,
    userBookings
}

export default bookingService