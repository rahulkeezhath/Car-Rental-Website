import axiosInstance from "../../../../utils/axiosInstance";


// Add Car
const addCar = async (carData) => {
    const response = await axiosInstance.post('/admin/addCars', carData)

    return response.data
}

// Get Car
const getCar = async () => {
    const response = await axiosInstance.get('/admin/cars')
    return response.data
}



// Delete Car
const deleteCar = async (id) => {
    const response = await axiosInstance.patch(`/admin/deleteCar?id=${id}`)

    return response.data
}


const authService = {
    addCar,
    getCar,
    deleteCar
}

export default authService