import axiosInstance from "../../../../utils/axiosInstance"


// Get Users
const getUsers = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }  
    const response = await axiosInstance.get('/admin/users', config)

    return response.data
}


const adminUsersService = {
    getUsers
}
export default adminUsersService