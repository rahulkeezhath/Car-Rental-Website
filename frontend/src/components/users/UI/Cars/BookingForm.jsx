import React, {useEffect, useState} from 'react'
import './BookingForm.scss'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import { getPlace, placeReset } from '../../../../redux/features/place/placeSlice';
import { bookCar, bookingReset} from '../../../../redux/features/users/booking/bookingSlice'
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import BookedSlots from '../../BookedSlots/BookedSlots';



const BookingForm = () => {

    const [dropOffCity, setDropOffCity] = useState()
    const [dropOffDate, setDropOffDate] = useState()
    const [pickupDate, setPickUpDate] = useState()
    const [totalDays, setTotalDays] = useState(0)
    const [driver, setDriver] = useState(false)
    const [totalAmount, setTotalAmount] = useState(0)
    const [showBookedSlots, setShowBookedSlots] = useState(false)
 


    const navigate = useNavigate()
    const dispatch = useDispatch()
    const bookDispatch = useDispatch()

    const { car } = useSelector((state) => state.singleCar)
    const { bookingMessage, bookingIsSuccess, bookingIsError, bookingError } = useSelector((state) => state.booking)
    const { places } = useSelector((state) => state.places)
    
    let bookedSlots = car?.bookedSlots
    console.log("bookedSlots",bookedSlots);

    useEffect(() => {
        dispatch(getPlace())

        return()=> {
            dispatch(placeReset())
            dispatch(bookingReset())
        }
    }, [])

    useEffect(() => {
      if(dropOffDate) {
        setTotalDays(moment(dropOffDate).diff(moment(pickupDate),'hours'))
      }
      if (totalDays) {
        if(pickupDate < dropOffDate) {
          if(driver) {
            setTotalAmount(Number.parseFloat(car.rent) * Number.parseInt(totalDays) + (Number.parseInt(totalDays) * 100))
          } else {
            setTotalAmount(Number.parseFloat(car.rent) * Number.parseInt(totalDays))
          }
        }else {
          setTotalAmount(0)
        }
      }
    }, [dropOffDate, totalDays, driver, pickupDate])



    useEffect(() => {
      if(bookingIsError) {
        toast.error(bookingError)
      }
      if(bookingIsSuccess) {
        navigate('/checkout', { state: {bookingMessage,car: car}})
      }
      dispatch(bookingReset())
    }, [navigate, bookingIsError, bookingIsSuccess, bookingError])

    function onSubmit(e) {
      e.preventDefault()
      if(!dropOffCity || !pickupDate || !dropOffDate) {
        if(!dropOffCity) {
          toast.error('Please Add Dropoff City')
        }
        if(!pickupDate && !dropOffDate) {
          toast.error("Please Add Date")
        }
      } else {
        let user = JSON.parse(localStorage.getItem('user'))
        if(!user) {
          navigate('/login')
        } else {
          const reqObj = {
            user: user._id,
            car: car._id,
            totalAmount,
            totalDays,
            pickupDate,
            dropOffDate,
            dropOffCity,
            driverRequire: driver
          }
          if(totalDays >= 1) {
            bookDispatch(bookCar(reqObj))
          } else {
            toast.error("Book Car atleast for 1 hour")
          }
        }
      }
    }
  
  return (
    <div className="booking_sec_wrapper">
    <form onSubmit={onSubmit} className="booking">
      <div className="booking_field">
        <label htmlFor="">Dropoff City</label>
        <select onChange={(e) => setDropOffCity(e.target.value)}>
          <option value="" hidden>Select City</option>
          {
            places.map((place) => (
              <option key={place._id} value={place.place}>{place.place}</option>
            ))
          }
        </select>
      </div>
      <div className="booking_field">
        <label htmlFor="">Pickup Date</label>
        <DatePicker
            selected={pickupDate}
            minDate={Date.now()}
            showTimeSelect
            timeIntervals={60}
            dateFormat = "MM d, yyyy h:mm aa"
            onChange={(date) => { setPickUpDate(date)}}
            placeholderText="Select Pickup Date" />
      </div>
      <div className="booking_field">
        <label htmlFor="">Dropoff Date</label>
        <DatePicker
        selected={dropOffDate}
        minDate={Date.now()}
        showTimeSelect
        timeIntervals={60}
        dateFormat="MM d, yyyy h:mm aa"
        onChange={(date) => { setDropOffDate(date)}}
        placeholderText="Select Dropoff Date" />
      </div>
      <div className="booking_field_driver">
        <div onClick={() => setShowBookedSlots(true)} className='booked_slots'>Booked Slots</div>
        {showBookedSlots && <BookedSlots stateChange={setShowBookedSlots} data={bookedSlots} />}
      </div>

      <div className="booking_field_driver">
        <input type="checkbox" onChange={(e) => {
          if (e.target.checked) {
            setDriver(true)
          } else {
            setDriver(false)
          }
        }} />
        <label htmlFor="">Driver Require</label>
      </div>
      <div className="booking_field">
        <p>Total hours : {totalDays >= 1 ? totalDays : 0} </p>
        <h1>Total : ₹ {totalAmount} </h1>
      </div>
      <div className="booking_field">
        <button style={{backgroundColor:'#000d6b'}} className='book' type='submit'>Book Now</button>
      </div>
    </form>
  </div>
  )
}

export default BookingForm
