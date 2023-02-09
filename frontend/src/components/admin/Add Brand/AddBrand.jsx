import React from 'react'
import styled from 'styled-components'
import scrollreveal from 'scrollreveal'
import Navbar from '../Navbar/Navbar'
import DataTable from 'react-data-table-component'
import { useEffect, useState } from 'react'
import { brandReset, getBrands,deleteBrand } from '../../../redux/features/brands/brandSlice'
import { useDispatch, useSelector } from 'react-redux'
import toast, {Toaster} from 'react-hot-toast'
import Sidebar from '../Sidebar/Sidebar'
import AddBrandModal from '../AddNewContent/AddBrandModal'



const AddBrand = () => {

    const [addBrand, setAddBrand] = useState(false)
    const { error, message, isError, isSuccess , brands } = useSelector((state) => state.brands)
    const dispatch = useDispatch()

    useEffect(() => {
        if (isError) {
            toast.error(error)
        }
        if (isSuccess) {
            toast.success(message.message)
        }
        dispatch(getBrands())
    }, [dispatch, error, message, isError, isSuccess])

    useEffect(() => {
        return () => {
            dispatch(brandReset())
        }
    }, [])

     useEffect(() => {
    const sr = scrollreveal({
      origin: "bottom",
      distance: "80px",
      duration: 2000,
      reset: false,
    });
    
    sr.reveal(
      `
      nav,
      .row_one,
      .row_two
      `,
      {
        opacity: 0,
        interval: 300,
      }
      );
    }, []);


    const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      sortable:true
    },
    {
      name: "Sl.No",
      selector: (row) => row.slNo,
      sortable:true
    },
    {
      name: "Brand",
      selector: (row) => row.brand,
      sortable:true
    },
    {
      name: 'Delete',
      cell : (row) => (
        <>
        <button onClick={() => dispatch(deleteBrand(row.id))}>Delete</button>
        </>
      )
    }
  ]


  const rows = brands.map((brand, index) => {
    return {
    id: brand._id,
    slNo: index + 1,
    brand: brand.brand
    }
  })

  
  return (
    <div>
        <Sidebar/>
    <Section>
      <Navbar/>
      {addBrand ? (<AddBrandModal stateChange={setAddBrand} />) : null}
      <div className="grid">
        <div className="row_one"></div>
  <DataTable title="Brand List"
    columns={columns}
    data={rows}
    pagination 
    fixedHeader
    fixedHeaderScrollHeight='450px'
    selectableRows
    selectableRowsHighlight
    highlightOnHover
    actions={<button onClick={() => setAddBrand(true)} className='btn btn-sm btn-info'>Add Brand</button>}
    subHeader
    />
    </div>
    </Section>
    <Toaster/>
    </div>
  )
}



const Section = styled.section`
margin-left: 18vw;
padding: 2rem;
height: 100%;
.grid{
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 1rem;
  margin-top: 2rem;
  .row_one{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    height: 50%;
    gap: 1rem;
  }
  .row_two{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    height: 50%;
    gap: 1rem;
  }
}
@media screen and (min-width: 280px) and (max-width: 1080px) {
    margin-left: 0;
    .grid {
      .row__one,
      .row__two {
        grid-template-columns: 1fr;
      }
    }
  }
`;

export default AddBrand