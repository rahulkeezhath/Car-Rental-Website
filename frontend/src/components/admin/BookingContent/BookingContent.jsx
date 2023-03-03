import React, {useEffect} from 'react'
import styled from 'styled-components'
import scrollreveal from 'scrollreveal'
import DataTable from 'react-data-table-component'
import Navbar from '../Navbar/Navbar'
import { useDispatch, useSelector,  } from 'react-redux'
import toast, {Toaster} from 'react-hot-toast'
import { getAllBookings, reset } from '../../../redux/features/adminBooking/adminBookingSlice'
import Spinner from '../../Spinner/Spinner'
import moment from 'moment'


const BookingContent = () => {

    const dispatch = useDispatch()
    const { bookings, isLoading, isError, error} = useSelector((state) => state.adminBooking)
    console.log("bookings",bookings);

    useEffect(() => {
        if(isError) {
            toast.error(error)
        }

        dispatch(getAllBookings())

        return() => {
            dispatch(reset())
        }
    }, [dispatch, isError, error])

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
              sortable:true,
              width:"210px"
            },
            {
              name: "Sl.No",
              selector: (row) => row.slNo,
              sortable:true
            },
            {
              name: "User Name",
              selector: (row) => row.userName,
              sortable:true
            },
            {
              name: "Car Name",
              selector: (row) => row.carName,
              sortable:true,
              width: '130px'
            },
            {
              name: "Phone Number",
              selector: (row) => row.phoneNumber,
              sortable:true,
              width:"130px"
            },
            {
              name: "Driver",
              selector: (row) => row.driverRequire,
              sortable:true,
              width:"120px"
            },
            {
              name: "Pickup Date",
              selector: (row) => row.pickUpDate,
              sortable:true,
              width:"150px"
            },
            {
              name: "Dropoff Date",
              selector: (row) => row.dropOffDate,
              sortable:true,
              width:"150px"
            },
            {
              name: "Total Hours",
              selector: (row) => row.totalHours,
              sortable:true,
              width:"110px"
            },
            {
              name: "Total Amount",
              selector: (row) => row.totalAmount,
              sortable:true,
              width:"120px"
            },
            {
              name: "Dropoff City",
              selector: (row) => row.dropOffCity,
              sortable:true,
              width:"120px"
            },
            {
                name: "Payment",
                selector: (row) => row.payment,
                sortable:true
            },
            {
                name: "Status",
                selector: (row) => row.status,
                sortable:true
            }
          ]
         


          const rows = bookings.map((booking, index) => {
            return {
                id: booking._id,
                slNo: index + 1,
                userName: booking.userData.fullName,
                carName: booking.carData.name,
                phoneNumber: booking.userData.phoneNumber,
                payment: booking.transactionId === 'pending' ? 'Pending' : 'Success',
                driverRequire: booking.driverRequire === true ? 'Required' : 'Not Required',
                pickUpDate: moment(booking.bookedSlots.from).format('MMM DD yyyy hh:mm'),
                dropOffDate: moment(booking.bookedSlots.to).format('MMM DD yyyy hh:mm'),
                totalHours: booking.totalHours,
                totalAmount: booking.totalAmount,
                dropOffCity: booking.dropoffCity,
                status: booking.status
            }
          })

       
          if (isLoading) {
            return (<><Spinner/></>)
          }

  return (
    <div>
      <Section>
        <Navbar/>
        <div className="grid">
          <div className="row__one"></div>
    <DataTable title="Booking Details"
      columns={columns}
      data={rows}
      pagination 
      fixedHeader
      fixedHeaderScrollHeight='450px'
      selectableRows
      selectableRowsHighlight
      highlightOnHover
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



export default BookingContent