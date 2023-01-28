import React from 'react'
import './OtpVerification.css'


const OtpVerification = () => {
  return (
    <div className='body1'>
    <h1 className='enter'>Enter OTP</h1>
    <div class="otp">
        <input type="text" maxlength="1"/>
        <input type="text" maxlength="1"/>
        <input type="text" maxlength="1" class="spacing"/>
        <input type="text" maxlength="1"/>
        <input type="text" maxlength="1"/>
        <input type="text" maxlength="1"/>
    </div>

    <button className='val'>Verify</button>
    </div>
  )
}

export default OtpVerification