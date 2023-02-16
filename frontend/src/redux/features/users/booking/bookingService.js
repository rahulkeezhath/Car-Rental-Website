import axiosInstance from "../../../../../utils/axiosInstance";

const bookCar = async(bookingData) => {
    const response = await axiosInstance.post('/users/bookCar',bookingData)
    return response.data
}

const bookingService = {
    bookCar
}

export default bookingService