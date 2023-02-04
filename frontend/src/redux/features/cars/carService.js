import axiosInstance from "../../../../utils/axiosInstance";


// Add Car
const addCar = async (carData) => {
    const response = await axiosInstance.post('/admin/addCars', carData)

    return response.data
}


const authService = {
    addCar
}

export default authService