import React from 'react'
import './OtpVerification.css'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { reset, otp } from '../../../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import Spinner from '../../../components/Spinner/Spinner'



const OtpVerification = () => {

  const { register, handleSubmit, formState: {errors} } = useForm()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if(isError) {
      toast.error(message)
    }
    if(isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isLoading, message, navigate, dispatch])

  const onSubmit = (data) => {
    const { otpCode } = data
    dispatch(otp(otpCode))
  }

  if(isLoading) {
    return (<><Spinner/></>)
  }

  return (
    <div className='body1'>
    <h1 className='enter'>Enter OTP</h1>
    <form onSubmit={handleSubmit(onSubmit)} >
    <div class="otp">
        <input type="text" name='otpCode' {...register('otpCode', {required: "Please Enter OTP"})}/>
    </div>
    {errors.otpCode && <p className='error_msg'>{errors.otpCode?.message}</p>}
    <button type='submit'>Verify</button>
    </form>

    </div>
  )
}

export default OtpVerification
