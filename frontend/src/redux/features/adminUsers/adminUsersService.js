import axiosInstance from "../../../../utils/axiosInstance"


// Get Users
const getUsers = async (getUser) => {
   
    const response = await axiosInstance.get('/admin/users', getUser)

    return response.data
}


const adminUsersService = {
    getUsers
}
export default adminUsersService