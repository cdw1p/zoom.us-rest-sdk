const express = require('express')
const crypto = require('crypto')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 4000

// Server Configuration
let API_KEY = 'JveGiw_aTK2UUM0ZGqtD2g'
let API_SECRET = '6uSRGroD81ZP9qos8VuNs2s5ztoJRqBERRMv'

/* 
  + Role Management
      0 = Attendee
      1 = Host
      5 = Assistant

  + Sever Select
      0 = Global
      2 = China
*/

app.use(express.urlencoded({ extended: true }))
app.use(express.json(), cors())
app.use(express.static('public'))

app.get('/', (req, res) => {
  // return res.sendFile(path.join(`${__dirname}/public/index.html`))
  return res.json({
    status: true,
    message: 'Hello World!'
  })
})

app.post('/create', (req, res) => {
  const { Username, MeetingId, MeetingPassword, Email, Role, Server, PrivateKey } = req.body

  if (PrivateKey == 'NG3NT0D4NJ1N6') {
    if (Username && MeetingId && MeetingPassword && Email && Role && Server) {
      const reqTimestamp = new Date().getTime() - 30000
      const reqUsername = Buffer.from(Username).toString('base64')
      const reqEmail = Buffer.from(Email).toString('base64')
      const reqMessageServer = Buffer.from(`${API_KEY}${MeetingId}${reqTimestamp}${Role}`).toString('base64')
      const reqHashServer = crypto.createHmac('sha256', API_SECRET).update(reqMessageServer).digest('base64')
      const reqSignature = Buffer.from(`${API_KEY}.${MeetingId}.${reqTimestamp}.${Role}.${reqHashServer}`).toString('base64')

      res.json({
        status: true,
        message: `${req.protocol}://${req.hostname}:9999/meeting.html?name=${reqUsername}&mn=${MeetingId}&email=${reqEmail}&pwd=${MeetingPassword}&role=${Role}&lang=en-US&signature=${reqSignature}&china=${Server}&apiKey=${API_KEY}`
      })
    } else {
      return res.json({
        status: false,
        message: 'Invalid parameter'
      })
    }
  } else {
    return res.json({
      status: false,
      message: 'Invalid authrization'
    })
  }
})

app.listen(port, () => console.log(`Zoom Web SDK Sample Signature Node.js on port ${port}!`))