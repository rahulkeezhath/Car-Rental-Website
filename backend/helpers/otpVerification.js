const serviceSID = "VA75dc2d78efc30375e9417a7398f5da18"
const accountSID = "ACbb04e0319ff6aba695f7593a15375b58"
const authToken = "54dc8eb2a7a0a85fc102485892e6a65a"
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
      client.verify.services(serviceSID).verification.create({
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