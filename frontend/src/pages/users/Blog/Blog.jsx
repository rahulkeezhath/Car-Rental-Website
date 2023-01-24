import React from 'react'
import { Container,Row } from 'reactstrap'
import Footer from '../../../components/users/Footer/Footer'
import Header from '../../../components/users/Header/Header'
import Helmet from '../../../components/users/Helmet/Helmet'
import CommenSection from '../../../components/users/UI/About/CommonSection'
import BlogList from '../../../components/users/UI/HomeContent/BlogList'

const Blog = () => {
  return (
    <Helmet title='Blogs'>
      <Header/>
      <CommenSection title='Blogs'/>
      <section>
        <Container>
          <Row>
            <BlogList/>
            <BlogList/>
          </Row>
        </Container>
      </section>
      <Footer/>
    </Helmet>
  )
}

export default Blog
