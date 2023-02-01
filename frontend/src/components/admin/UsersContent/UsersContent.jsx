  import  React from 'react'
  import axios from 'axios'
  import { useState } from 'react'
  import DataTable from 'react-data-table-component'
  import { useEffect } from 'react'

  const UsersContent = () => {

    const [users, setUsers] = useState([])
    const [search, setSearch] = useState("")
    const [filteredUsers, setFilteredUsers] = useState([])

    const getUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/admin/users')
        setUsers(response.data);
        setFilteredUsers(response.data)
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(()=>{
      getUsers()
    },[])

    useEffect(()=>{
      const result = users.filter(user => {
        return  user.fullName.toLowerCase().match(search.toLowerCase());
      });

      setFilteredUsers(result);
    }, [search])

    const columns = [
      {
        name: "Full Name",
        selector: (row) => row.fullName,
        sortable:true
      },
      {
        name: "Email",
        selector: (row) => row.email,
        sortable:true
      },
      {
        name: "PhoneNumber",
        selector: (row) => row.phoneNumber,
        sortable:true
      },
      {
        name: "Action",
        cell: (row) =>  <button className='btn btn-primary'>Block/Unblock</button>
        
      }
    ]
  
    return (
    <DataTable title="Users List"
      columns={columns}
      data={filteredUsers}
      pagination 
      fixedHeader
      fixedHeaderScrollHeight='450px'
      selectableRows
      selectableRowsHighlight
      highlightOnHover
      subHeader
      subHeaderComponent={
        <input type={"text"} placeholder="Search Here" className='w-25 form-control' value={search} onChange={(e) => setSearch(e.target.value)} /> }
      />
    )
  }

  export default UsersContent
