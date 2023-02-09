import axiosInstance from "../../../../utils/axiosInstance";

// Add Brand
const addBrand = async(brand) => {
    const response = await axiosInstance.post('/admin/addBrand', brand)
    return response.data
}


// Get Brands
 const getBrands = async() => {
    const response = await axiosInstance.get('/admin/getBrands')
    return response .data
 }


 // Delete Brand
 const deleteBrand = async(id)=>{
    const response = await axiosInstance.delete(`/admin/deleteBrand?id=${id}`)
    return response.data
 }


 const brandService = {
    addBrand,
    getBrands,
    deleteBrand
 }

 export default brandService