import React from 'react'
import UserProfileModal from './UserProfileModal'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'






const UserProfile = () => {
 

  const { user } = useSelector(state => state.auth)
  console.log("jdgfhgde",user)


  const navigate = useNavigate()


  


  return (
    <section style={{backgroundColor: '#fff'}}>
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-4">
              <div className="card mb-4">
                <div className="card-body text-center">
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar" className="rounded-circle img-fluid" style={{width: '150px'}} />
                  <h5 className="my-3">{user?.fullName}</h5>
                  <p className="text-muted mb-1">Welcome Rider</p>
                  <p className="text-muted mb-4">Have a Nice Trip</p>
                  <div className="d-flex justify-content-center mb-2">
                    <UserProfileModal userDetails={user} /> 
                    <button onClick={() => navigate('/bookingcar')} type="submit" className="btn btn-outline-primary ms-1">My Bookings</button>
                  </div>  
                </div>
              </div>
              <div className="card mb-4 mb-lg-0">
                <div className="card-body p-0">
                  <ul className="list-group list-group-flush rounded-3">
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                      <i className="fab fa-github fa-lg" style={{color: '#333333'}} />
                      <p className="mb-0">Github</p>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                      <i className="fab fa-twitter fa-lg" style={{color: '#55acee'}} />
                      <p className="mb-0">Twitter</p>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                      <i className="fab fa-instagram fa-lg" style={{color: '#ac2bac'}} />
                      <p className="mb-0">Instagram</p>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                      <i className="fab fa-facebook-f fa-lg" style={{color: '#3b5998'}} />
                      <p className="mb-0">Facebook</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Full Name</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{user?.fullName}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Email</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{user?.email}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Mobile</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{user?.phoneNumber}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="card mb-4 mb-md-0">
                    <div className="card-body">
                      <p className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Skills
                      </p>
                      <p className="mb-1" style={{fontSize: '.77rem'}}>Web Design</p>
                      <div className="progress rounded" style={{height: '5px'}}>
                        <div className="progress-bar" role="progressbar" style={{width: '80%'}} aria-valuenow={80} aria-valuemin={0} aria-valuemax={100} />
                      </div>
                      <p className="mt-4 mb-1" style={{fontSize: '.77rem'}}>React</p>
                      <div className="progress rounded" style={{height: '5px'}}>
                        <div className="progress-bar" role="progressbar" style={{width: '72%'}} aria-valuenow={72} aria-valuemin={0} aria-valuemax={100} />
                      </div>
                      <p className="mt-4 mb-1" style={{fontSize: '.77rem'}}>Javascript</p>
                      <div className="progress rounded" style={{height: '5px'}}>
                        <div className="progress-bar" role="progressbar" style={{width: '89%'}} aria-valuenow={89} aria-valuemin={0} aria-valuemax={100} />
                      </div>
                      <p className="mt-4 mb-1" style={{fontSize: '.77rem'}}>NodeJS</p>
                      <div className="progress rounded" style={{height: '5px'}}>
                        <div className="progress-bar" role="progressbar" style={{width: '55%'}} aria-valuenow={55} aria-valuemin={0} aria-valuemax={100} />
                      </div>
                      <p className="mt-4 mb-1" style={{fontSize: '.77rem'}}>MongoDB</p>
                      <div className="progress rounded mb-2" style={{height: '5px'}}>
                        <div className="progress-bar" role="progressbar" style={{width: '66%'}} aria-valuenow={66} aria-valuemin={0} aria-valuemax={100} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card mb-4 mb-md-0">
                    <div className="card-body">
                      <p className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status
                      </p>
                      <p className="mb-1" style={{fontSize: '.77rem'}}>UI/UX Designer</p>
                      <div className="progress rounded" style={{height: '5px'}}>
                        <div className="progress-bar" role="progressbar" style={{width: '80%'}} aria-valuenow={80} aria-valuemin={0} aria-valuemax={100} />
                      </div>
                      <p className="mt-4 mb-1" style={{fontSize: '.77rem'}}>Website Markup</p>
                      <div className="progress rounded" style={{height: '5px'}}>
                        <div className="progress-bar" role="progressbar" style={{width: '72%'}} aria-valuenow={72} aria-valuemin={0} aria-valuemax={100} />
                      </div>
                      <p className="mt-4 mb-1" style={{fontSize: '.77rem'}}>PostMan</p>
                      <div className="progress rounded" style={{height: '5px'}}>
                        <div className="progress-bar" role="progressbar" style={{width: '89%'}} aria-valuenow={89} aria-valuemin={0} aria-valuemax={100} />
                      </div>
                      <p className="mt-4 mb-1" style={{fontSize: '.77rem'}}>Firebase</p>
                      <div className="progress rounded" style={{height: '5px'}}>
                        <div className="progress-bar" role="progressbar" style={{width: '55%'}} aria-valuenow={55} aria-valuemin={0} aria-valuemax={100} />
                      </div>
                      <p className="mt-4 mb-1" style={{fontSize: '.77rem'}}>Backend API</p>
                      <div className="progress rounded mb-2" style={{height: '5px'}}>
                        <div className="progress-bar" role="progressbar" style={{width: '66%'}} aria-valuenow={66} aria-valuemin={0} aria-valuemax={100} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default UserProfile
