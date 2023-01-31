import React from 'react'
import Navbar from '../Navbar/Navbar'
import Sidebar from '../Sidebar/Sidebar'
import './Layout.scss'

const AdminLayout = ({children}) => {
  return (

    <><div className="layout">
          <Sidebar />
      </div><div className="main_layout">
              <Navbar />
          </div><div className="content">
              {children}
          </div></>
  )
}

export default AdminLayout
