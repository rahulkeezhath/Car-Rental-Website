import axiosInstance from "../../../../utils/axiosInstance";

// Login Admin
const login = async (adminData) => {
    const response = await axiosInstance.post('/admin/adminLogin',adminData)

    if(response.data) {
        localStorage.setItem('admin', JSON.stringify(response.data))
    }
    return response.data
}

//Logout Admin
const logout = () => {
    localStorage.removeItem('admin')
}

const adminAuthService = {
    login,logout
}

export default adminAuthService