var express = require('express');
var router = express.Router();
var nodemailer=require('nodemailer');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { msg: '' });
});
router.post('/send',function(req,res){
  const output=`<p> You have a new message </p>
  <h3>Contact Details</h3>
  <ul>
  <li> Name:${req.body.name}</li>
  <li> Company:${req.body.company}</li>
  <li> Email:${req.body.email}</li>
  <li> Phone:${req.body.phone}</li>
  </ul>
  <h3>Message</h3>
  <p>${req.body.message}</p>
  `;
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'testjain44@gmail.com', // generated ethereal user
        pass: 'password'  // generated ethereal password
    },
    // tls:{
    //   rejectUnauthorized:false
    // }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: '"Nodemailer Contact" <testjain44@gmail.com>', // sender address
      to: 'moh.sharma.2901@gmail.com', // list of receivers
      subject: 'node contact ', // Subject line
      text: 'Hello world?', // plain text body
      html: output // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.render('index', {msg:'Email has been sent'});
  });
});

module.exports = router;
