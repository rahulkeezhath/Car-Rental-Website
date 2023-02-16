import axiosInstance from '../../../../../utils/axiosInstance'

// Get Cars 
const getCars = async() => {
    const response = await axiosInstance.get('/users/cars')
    return response.data
}

// const getCars = async() => {
//     await axiosInstance({
//         url: '/users/cars',
//         method:'get',
//         headers:{
//             authorization: response.data.token
//         }
//     }).then((response) => {
//         console.log("afasas");
//     })
// }

const carService = {
    getCars
}

export default carService