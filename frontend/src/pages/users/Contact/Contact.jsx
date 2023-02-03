import React from 'react'
import { Link } from 'react-router-dom'
import { Col, Container, Form, FormGroup, Input, Row } from 'reactstrap'
import Footer from '../../../components/users/Footer/Footer'
import Header from '../../../components/users/Header/Header'
import Helmet from '../../../components/users/Helmet/Helmet'
import CommonSection from '../../../components/users/UI/About/CommonSection'
import './Contact.css'

const socialLinks = [
    {
        url: "#",
        icon: "ri-facebook-line"
    },
    {
        url: "#",
        icon: "ri-instagram-line"
    },
    {
        url: "#",
        icon: "ri-linkedin-line"
    },
    {
        url: "#",
        icon: "ri-twitter-line"
    }
]

const Contact = () => {
  return (
    <Helmet title="Contact">
        <Header/>
        <CommonSection title="Contact"/>
        <section>
            <Container>
                <Row>
                    <Col lg='7' md='7'>
                        <h6 className='fw-bold mt-5' style={{color:'#000d6b'}}>Get In Touch</h6>

                        <Form>
                            <FormGroup className='contact_form'>
                                <Input placeholder='Your Name' type='text' />
                            </FormGroup>
                            <FormGroup className='contact_form'>
                                <Input placeholder='Email' type='email' />                                
                            </FormGroup>
                            <FormGroup>
                                <textarea rows="5" placeholder='Message' className='textarea'></textarea>
                            </FormGroup>

                            <button className='contact_btn mb-5' type='submit'>Send Message</button>
                        </Form>
                    </Col>

                    <Col lg='5' md='5'>
                        <div className="contact_info mt-5">
                            <h6 className='fw-bold' style={{color:"#000d6b"}}>Contact Information</h6>
                            <p className="section_description2 mb-0">272 Manjeri, Malappuram, Kerala</p>
                            <div className='d-flex align-items-center gap-2'>
                                <h6 className='fs-6 mb-0' style={{color:"#000d6b"}}>Phone:</h6>
                                <p className='section_description2 mb-0'>+91 6282314460</p>
                            </div>

                            <div className='d-flex align-items-center gap-2'>
                                <h6 className='mb-0 fs-6' style={{color:"#000d6b"}}>Email:</h6>
                                <p className='section_description2 mb-0'>rahulkeezhath@gmail.com</p>
                            </div>

                            <h6 className='fw-bold mt-5' style={{color:"#000d6b"}}>Follow Us</h6>

                            <div className='d-flex align-items-center gap-4 mt-3'>
                                {
                                    socialLinks.map((item, index)=>(
                                        <Link to={item.url} key={index} className='social_link-icon'>
                                            <i class={item.icon}></i>
                                        </Link>
                                    ))
                                }
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
        <Footer/>
    </Helmet>
  )
}

export default Contact
