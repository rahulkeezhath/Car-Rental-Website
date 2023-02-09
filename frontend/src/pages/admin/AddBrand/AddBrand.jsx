import React from 'react'
import AdminLayout from '../../../components/admin/Layout/Layout'
import AddBrand from '../../../components/admin/Add Brand/AddBrand'

const AddBrand = () => {
  return (
   <>
   <AdminLayout children={<AddBrand/>} />
   </>
  )
}

export default AddBrand