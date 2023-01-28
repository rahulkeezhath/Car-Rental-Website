require('dotenv').config()
const serviceSID = process.env.TWILIO_SERVICE_SID
const accountSID = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const client = require('twilio')(accountSID,authToken)

const doSms = (phoneNumber) => {
    let resp = {}
    return new Promise((resolve,reject)=>{
        client.verify.services(serviceSID).verification.create({
            to: `+91${phoneNumber}`,
            channel: "sms"
          })
          .then((res) => {
            resp.valid = true
            resolve(resp)
            console.log(res);
          }).catch((err) => {
            reject(err)
          })
    })
}

const verifyOtp = (phoneNumber, otp) => {
    return new Promise((resolve, reject) => {
      client.verify.services(serviceSID).verificationChecks.create({
        to: `+91${phoneNumber}`,
        code: otp
      }).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
}

module.exports = {
   verifyOtp,doSms
}