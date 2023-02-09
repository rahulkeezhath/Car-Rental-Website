import React from 'react'
import AdminLayout from '../../../components/admin/Layout/Layout'
import AddPlace from '../../../components/admin/AddPlace/AddPlace'

const AddPlace = () => {
  return (
    <>
    <AdminLayout children={<AddPlace/>}/>
    </>
  )
}

export default AddPlace