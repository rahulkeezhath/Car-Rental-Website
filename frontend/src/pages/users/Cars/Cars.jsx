import React from 'react'
import Footer from '../../../components/users/Footer/Footer'
import Header from '../../../components/users/Header/Header'
import Helmet from '../../../components/users/Helmet/Helmet'
import { Container, Row, Col } from 'reactstrap'
import CommonSection from '../../../components/users/UI/About/CommonSection'
import CarItem from '../../../components/users/UI/HomeContent/CarItem'
import carData from '../../../assets/data/carData'

const Cars = () => {
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
                <i class="ri-sort-asc"></i>Sort By</span>

                <select className='mt-5'>
                  <option>Select</option>
                  <option value="low">Low to High</option>
                  <option value="high">High to Low</option>
                </select>
                
              </div>
            </Col>

            {
              carData.map(item=> <CarItem item={item} key={item.id}/>)
            }

          </Row>
        </Container>
      </section>
    <Footer/>
    </Helmet>
  )
}

export default Cars
