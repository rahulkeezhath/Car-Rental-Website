import axiosInstance from '../../../../utils/axiosInstance'

// Get Drivers
const getDrivers = async() => {

    const response = await axiosInstance.get('/admin/drivers')
    return response.data
}

// Approve Driver
const approveDriver = async(id) => {
    const response = await axiosInstance.put('/admin/approveDriver',{id:id})
    return response.data
}

// Decline Driver
const declineDriver = async(id) => {
    const response = await axiosInstance.put('/admin/declineDriver',{id:id})
    return response.data
}


// Block and Unblock Driver
const blockAndUnblockDriver = async(id) => {
    const response = await axiosInstance.put('/admin/blockAndUnblockDriver',{id:id})
    return response.data
}

const adminDriverService = {
    getDrivers,
    approveDriver,
    declineDriver,
    blockAndUnblockDriver
}

export default adminDriverService