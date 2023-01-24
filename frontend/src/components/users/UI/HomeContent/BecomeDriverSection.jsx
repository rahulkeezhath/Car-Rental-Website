import React from 'react'
import './BecomeDriverSection.css'
import {Container,Row,Col} from 'reactstrap'
import DriverImg from '../../../../assets/all-images/toyota-offer-2.png'

const BecomeDriverSection = () => {
  return <section className='become_driver'>
    <Container>
        <Row>
            <Col lg='6' md='6' sm='12'>
                <img src={DriverImg} alt="" className='w-100'/>
            </Col>

            <Col lg='6' md='6' sm='12'>
                <h2 className="section_title become_driver-title">
                    Do You Want To Earn With Us? So Don't Be Late
                </h2>

                <button className='btn become_driver-btn mt-4'>
                    Become a Driver
                </button>
            </Col>

        </Row>
    </Container>
  </section>
}

export default BecomeDriverSection
