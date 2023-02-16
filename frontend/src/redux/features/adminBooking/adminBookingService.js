import axiosInstance from '../../../../utils/axiosInstance'

// Get Drivers
const getBookings = async () => {
    const response = await axiosInstance.get('/admin/getBookings')

    return response.data
}

const adminBookingService = {
    getBookings
}

export default adminBookingService
