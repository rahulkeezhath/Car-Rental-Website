import axiosInstance from '../../../../utils/axiosInstance'

// Add Place
const addPlace = async(place) => {
    const response = await axiosInstance.post('/admin/addPlace',place)
    return response.data
}

// Get Place
const getPlace = async() => {
    const response = await axiosInstance.get('/admin/getPlaces')
    return response.data
}

// Delete Place
const deletePlace = async(id) => {
    const response = await axiosInstance.delete(`/admin/deletePlace?id=${id}`)
    return response.data
}


const placeService={
    addPlace,
    getPlace,
    deletePlace
}

export default placeService