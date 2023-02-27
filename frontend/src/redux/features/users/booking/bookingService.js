import axiosInstance from "../../../../../utils/axiosInstance";

const bookCar = async(bookingData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axiosInstance.post('/users/bookCar',bookingData,config)
    return response.data
}

const bookingService = {
    bookCar
}

export default bookingService