var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
const creds = require('../config/config');

var transport = {
  host: 'smtp.gmail.com',
  auth: {
    user: creds.USER,
    pass: creds.PASS
  }
}

var transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/send', (req, res, next) => {
  console.log(req.body)
  var type = req.body.type
  var name = req.body.name
  var email = req.body.email
  var telephone = req.body.telephone
  var club = req.body.club
  var country = req.body.country
  var startDate = req.body.startDate
  var endDate = req.body.endDate
  var checkListObj = {'Strength Training': req.body.contactChoice1,
                      'Swim Training': req.body.contactChoice2,
                      'Dryland Training': req.body.contactChoice3,
                      'Assistant Swim Coaching': req.body.contactChoice4,
                      'Start Training': req.body.contactChoice5,
                      'Lectures and Presentations': req.body.contactChoice6,
                      'Logistics': req.body.contactChoice7}

  var demographics = req.body.demographics
  var objectives = req.body.objectives
  var str = ''

  for (checks in checkListObj) {
    checkListObj[checks] === true ? str += checks + ', ': null
  }

  var content = `${type} submission \n name: ${name} \n email: ${email} \n telephone: ${telephone} \n club: ${club} \n country: ${country} \n startDate: ${startDate} \n endDate: ${endDate} \n desired topics: ${str.slice(0, -2)} \n demographics: ${demographics} \n objectives: ${objectives} `

  var mail = {
    from: name,
    to: 'sholly@usc.edu',  //Change to email address that you want to receive messages on
    subject: `New Swimmer Strength ${type} Form Submission`,
    text: content
  }

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        msg: 'fail'
      })
    } else {
      res.json({
        msg: 'success'
      })
    }
  })
})


router.post('/sendContact', (req, res, next) => {
  console.log(req.body)
  var type = req.body.type
  var name = req.body.name
  var email = req.body.email
  var subject = req.body.subject
  var message = req.body.message

  var content = `${type} submission \n name: ${name} \n email: ${email} \n subject: ${subject} \n message: ${message} `

  var mail = {
    from: name,
    to: 'sholly@usc.edu',  //Change to email address that you want to receive messages on
    subject: `New Swimmer Strength ${type} Form Submission`,
    text: content
  }

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        msg: 'fail'
      })
    } else {
      res.json({
        msg: 'success'
      })
    }
  })
})

module.exports = router;
