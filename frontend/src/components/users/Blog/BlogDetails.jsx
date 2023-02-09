import React from 'react'
import { Container, Row ,Col, Form, FormGroup, Input } from 'reactstrap'
import { Link, useParams } from 'react-router-dom'
import BlogData from '../../../assets/data/blogData'
import Helmet from '../Helmet/Helmet'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { useEffect } from 'react'
import CommentImg from '../../../assets/all-images/ava-1.jpg'
import './BlogDetails.css'


const BlogDetails = () => {
    const {slug} = useParams()
    const Blog = BlogData.find(Blog => Blog.title === slug)

    useEffect(()=>{
        window.scrollTo(0,0)
    }, [Blog])

  return <Helmet title={Blog.title}>
    <Header/>
    <Container>
        <Row>
            <Col lg='8' md='8'>
                <div className="blog_details mt-5">
                    <img src={Blog.imgUrl} alt="" className='w-100' />
                    <h2 className='section_title2 mt-4'>{Blog.title}</h2>

                    <div className="blog_publisher d-flex align-items-center gap-4 mb-4">
                    <span className='blog_author'>
                    <i class="ri-user-line"></i> {Blog.author}
                </span>

                <span className='d-flex align-items-center gap-1 section_description2'>
                    <i class="ri-calendar-line"></i> {Blog.date}
                    </span>
            
                    <span className='d-flex align-items-center gap-1 section_description2'>
                    <i class="ri-time-line"></i> {Blog.time}
                    </span>
                    </div>

                    <p className="section_description2">{Blog.description}</p>
                    <h6 className='ps-5 fw-normal'>
                         <blockquote className='fs-4' style={{color:'#000d6b'}}>{Blog.quote}</blockquote>
                    </h6>
                    <p className="section_description2">{Blog.description}</p>
                </div>

                <div className="comment_list mt-5">
                    <h4 className="mb-5">3 Comments</h4>

                  <div className="single_comment d-flex gap-3">
                    <img src={CommentImg} alt="" />
                    <div className="comment_content">
                        <h6 className='fw-bold' style={{color:'#000d6b'}}>David Visa</h6>
                        <p className="section_description2 mb-0">14 July, 2022</p>
                        <p className="section_description2">
                        Drive for maximum fuel efficiency. Accelerate gently.
                        Maintain a steady speed. Anticipate traffic. Avoid high speeds.
                        Coast to decelerate.
                        </p>

                        <span className="replay d-flex align-items-center gap-1 mb-5">
                    <i class="ri-reply-line"></i>Replay
                    </span>
                    </div>
                  </div>

                  {/*--------------- Comment Form --------------- */}
                  <div className="leave_comment">
                    <h4>Leave a Comment</h4>
                    <p className="section_description2">
                        You must sign-in to make or comment a post
                    </p>

                    <Form>
                        <FormGroup className='d-flex gap-3'>
                            <Input type="text" placeholder='Full Name' />
                            <Input type="email" placeholder='Email' />
                        </FormGroup>

                        <FormGroup>
                            <textarea  rows="5" className='w-100 py-2 px-3' placeholder='Comment...'></textarea>
                        </FormGroup>

                        <button className='comment_btn mt-3 mb-3'>Post a Comment</button>
                    </Form>
                  </div>
                </div>
            </Col>

            <Col lg='4' md='4'>
                <div className='recent_post'>
                    <h5 className='fw-bold'>Recent Posts</h5>
                </div>
                {
                    BlogData.map(item=>(
                        <div className="recent_blog-post mt-5" key={item.id}>
                            <div className="recent_blog-item d-flex gap-3 mb-4">
                                <img src={item.imgUrl} alt="" className='w-25 rounded-2' />
                                <h6><Link to={`/blog/${item.title}`}>{Blog.title}</Link></h6>
                            </div>
                        </div>
                    ))
                }
            </Col>
        </Row>
    </Container>
    <Footer/>
  </Helmet>
}

export default BlogDetails
