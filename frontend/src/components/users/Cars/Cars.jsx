import React, {useState, useEffect} from 'react'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import Helmet from '../Helmet/Helmet'
import { Container, Row, Col } from 'reactstrap'
import CommonSection from '../UI/About/CommonSection'
import CarItem from '../UI/HomeContent/CarItem'
import { useDispatch, useSelector } from 'react-redux'
import { allCars, reset } from '../../../redux/features/users/cars/carSlice'
import toast, {Toaster} from 'react-hot-toast'
import Spinner from '../../Spinner/Spinner'


const Cars = () => {
  
  const [ searchQuery, setSearchQuery ] = useState("")
  const dispatch = useDispatch()
  const { cars, message, isLoading, isError } = useSelector((state) => state.userCars)
  const keys = ["name", "body", "place", "brand"]

  useEffect(() => {
    if(isError) {
      toast.error(message)
    }
    dispatch(allCars())
    return () => {
      dispatch(reset())
    }
  }, [isError, message, dispatch])

  if( isLoading) {
    return (<><Spinner/></>)
  }

  return (
    <Helmet title='Cars'>
      <Header/>
      <CommonSection title='Cars' />

      <section>
        <Container>
          <Row>
            <Col lg='12'>
              <div className='d-flex align-items-center gap-3 mb-5'>
                <span className='d-flex align-items-center gap-2 mt-5'>
                <i class="ri-sort-asc"></i> Filter </span>
               <input  type={'search'} placeholder='Search' className='mt-5' onChange={(e) => setSearchQuery(e.target.value)} />   
              </div>
            </Col>
            {
              cars.filter(car => keys.some(key => car[key].toLowerCase().includes(searchQuery.toLowerCase()))).map((car)=>(
                 <CarItem key={car._id} name={car.name} rent={car.rent} place={car.place} brand={car.brand} model={car.model} transmission={car.transmission} fuel={car.fuel} id={car._id} image={car.image} />))
            }
          </Row>
        </Container>
      </section>
      <Toaster/>
    <Footer/>
    </Helmet>
  )
}

export default Cars
