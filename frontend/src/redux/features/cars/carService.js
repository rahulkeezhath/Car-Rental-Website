import axiosInstance from "../../../../utils/axiosInstance";
import {message} from 'antd'



// Add Car
const addCar = async (carData,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axiosInstance.post('/admin/addCars', carData,config)
    message.success("Car Added Successfully")
    
    return response.data
}

// Get Car
const getCar = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axiosInstance.get('/admin/cars',config)
    return response.data
}



// Delete Car
const deleteCar = async (id,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axiosInstance.delete(`/admin/deleteCar?id=${id}`,config)
    message.success("Car Deleted Successfully")
    return response.data
}



const carService = {
    addCar,
    getCar,
    deleteCar
}

export default carService