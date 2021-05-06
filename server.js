
const ws    = require('ws')
const fs    = require('fs')
const https = require('https')
const querystring = require('querystring');

var privateKey  = fs.readFileSync('/etc/letsencrypt/live/coturn.demo.ixm.ca/privkey.pem', 'utf8')
var certificate = fs.readFileSync('/etc/letsencrypt/live/coturn.demo.ixm.ca/fullchain.pem', 'utf8')

const httpsServer = https.createServer({ key: privateKey, cert: certificate })

httpsServer.listen(8091, '0.0.0.0')
httpsServer.on('error', (error) => console.log(error))

const server = new ws.Server({
  server: httpsServer
})

const socketsMap = new Map();

class Meeting {
  constructor() {
    this.instructor = undefined;
    this.customer = undefined;
  }
  sendAll(message) {
      if (this.customer) {
        this.customer.send(message);
      }
      if (this.instructor) {
        this.instructor.send(message);
      }
  }
  sendMessageToPartner(isInstructorRole, message) {
    if (isInstructorRole) {
      if (this.customer) {
        this.customer.send(message);
      }
    } else {
      if (this.instructor) {
        this.instructor.send(message);
      }
    }
  }
  setByRole(isInstructorRole, socket) {
    if (isInstructorRole) {
      if (this.instructor) {
        this.instructor.close()
      }
      return this.instructor = socket
    } else {
      if (this.customer) {
        this.customer.close()
      }
      return this.customer = socket
    }
  }

  bothInMeeting() {
   if (this.instructor && this.customer) {
     return true
   } else {
     return false
   }
  }
}

server.on('connection', function (socket, req) {
  const queryParams = querystring.parse(req.url.replace(/(^\/)|(\?)/g, ''))
  const meetingId = queryParams.meetingId
  const isInstructorRole = queryParams.isInstructorRole === 'true'
  if (!meetingId) {
    return;
  }

  if (!socketsMap.has(meetingId)) {
    socketsMap.set(meetingId, new Meeting())
  }

  const meeting = socketsMap.get(meetingId)

  meeting.setByRole(isInstructorRole, socket)

  console.log('new connection', isInstructorRole ? 'instructor':'customer', meetingId)

  socket.on('message', onMessage)
  socket.on('close', function () {
    meeting.setByRole(isInstructorRole, undefined)
  })
]
  function onMessage (message) {
    console.log('on message from', isInstructorRole ? 'instructor':'customer')
    meeting.sendMessageToPartner(isInstructorRole, message)
  }

  if (meeting.bothInMeeting()) {
    console.log('both partners are here')
    meeting.sendAll('ready')
  }
})
