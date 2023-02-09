import React from 'react'
import CarData from '../../../assets/data/carData'
import {Container, Row, Col} from 'reactstrap'
import Helmet from '../Helmet/Helmet'
import {useParams} from 'react-router-dom'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import BookingForm from '../UI/Cars/BookingForm'
import PaymentMethod from '../UI/Cars/paymentMethod'
import { useEffect } from 'react'


const Single = () => {

  const {slug} = useParams()

  const singleCarItem = CarData.find((item) => item.carName === slug);

  useEffect(()=>{
    window.scrollTo(0,0)
  },[singleCarItem])

  return (
    <Helmet title={singleCarItem.carName}>
      <Header/>
      <section>
        <Container>
          <Row>
            <Col lg='6'>
              <img src={singleCarItem.imgUrl} alt="" className='w-100' />
            </Col>

            <Col>
            <div className='car_info'>
                <h2 className='section_title2'>{singleCarItem.carName}</h2>

                <div className='d-flex align-items-center gap-5 mb-4 mt-3'>
                    <h6 className="rent_price fw-bold fs-4">Rs.{singleCarItem.price}.00 / Day</h6>

                    <span className='d-flex align-items-center gap-2'>
                    <span style={{color:'#f9a826'}}>
                      <i class="ri-star-s-fill"></i>
                      <i class="ri-star-s-fill"></i>
                      <i class="ri-star-s-fill"></i>
                      <i class="ri-star-s-fill"></i>
                      <i class="ri-star-s-fill"></i>
                    </span>
                    ({singleCarItem.rating} ratings)
                  </span>
                </div>

                <p className="section_description1">
                  {singleCarItem.description}
                </p>

              <div className='d-flex align-items-center mt-3' style={{columnGap: '4rem'}}>
                <span className='d-flex align-items-center gap-1 section_description1'>
                <i class="ri-roadster-line" style={{color:'#f9a826'}}></i> {singleCarItem.model}
                </span>

                <span className='d-flex align-items-center gap-1 section_description1'>
                <i class="ri-settings-2-line" style={{color:'#f9a826'}}></i> {singleCarItem.automatic}
                </span>

                <span className='d-flex align-items-center gap-1 section_description1'>
                <i class="ri-timer-flash-line" style={{color:'#f9a826'}}></i> {singleCarItem.speed}
                </span>

              </div>


              <div className='d-flex align-items-center mt-3' style={{columnGap: '2.8rem'}}>
                <span className='d-flex align-items-center gap-1 section_description1'>
                <i class="ri-map-pin-line" style={{color:'#f9a826'}}></i> {singleCarItem.gps}
                </span>

                <span className='d-flex align-items-center gap-1 section_description1'>
                <i class="ri-wheelchair-line" style={{color:'#f9a826'}}></i> {singleCarItem.seatType}
                </span>

                <span className='d-flex align-items-center gap-1 section_description1'>
                <i class="ri-building-2-line" style={{color:'#f9a826'}}></i>{singleCarItem.brand}
                </span>

              </div>

            </div>
            </Col>

            <Col lg='7' className='mt-5'>
              <div className='booking-info mt-5'>
                <h5 className='mb-4 fw-bold' style={{color:'#000d6b'}}>Booking Information</h5>
                <BookingForm/>
              </div>
            </Col>

            <Col lg='5' className='mt-5'>
              <div className='payment_info mt-5'>
                <h5 className='mb-4 fw-bold' style={{color:'#000d6b'}}>Payment Information</h5>
                <PaymentMethod/>
              </div>
            </Col>

          </Row>
        </Container>
      </section>
      <Footer/>
    </Helmet>
  )
}

export default Single
