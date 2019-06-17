var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
const creds = require('../config/config');

// var transport = {
//   host: 'smtp.gmail.com',
//   auth: {
//     user: creds.USER,
//     pass: creds.PASS
//   }
// }
//
// var transporter = nodemailer.createTransport(transport)

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth:{
      type: 'OAuth2',
      user: creds.USER,
      pass: creds.PASS,
      clientId:"543641513493-7b9lvb5n5oec2h07f64e7as621et0i90.apps.googleusercontent.com",
      clientSecret:"cd1J7eYoeiyQh5rV86F4_Kyy",
      refreshToken:"1/kIEPysDmkcxjauNxPZICQYa5MB2i0gNP7QVvKKRF-yI",
      accessToken: 'ya29.Glv7BnNcz9BopAlvvqoSh8C8NHSvs7uMG0aTIbUNopz_20v3KSBnNRv5gX3eiVCTC4IBgvOIH5ATO9gNNnI516r1vBnLPyKm307pHlikQFnjktr1UNZXh2EomzpY'
    }
});


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
    to: 'info@swimmerstrength.com',  //Change to email address that you want to receive messages on
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
    to: 'info@swimmerstrength.com',  //Change to email address that you want to receive messages on
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


router.post('/tenDayFormSubmit', (req, res, next) => {
  console.log(req.body)
  var name = req.body.name
  var email = req.body.email
  var who1 = req.body.who1
  var who2 = req.body.who2
  var experience = req.body.experience
  var age = req.body.age
  var goal = req.body.goal
  var country = req.body.country
  var gender = req.body.gender


  var content = `10-day free core workout submission \n name of submitter: ${name} \n email: ${email} \n Is this for the submitter (y/n)?: ${who1} \n if not for submitter, who?: ${who2} \n experience level (1-10): ${experience} \n age: ${age} \n goal/objective: ${goal} \n gender: ${gender} \n country: ${country}`

  var mail = {
    from: name,
    to: 'info@swimmerstrength.com',  //Change to email address that you want to receive messages on info@swimmerstrength.com
    subject: `New Swimmer Strength 10-day Core Workout Form Submission`,
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
