var nodemailer = require('nodemailer'),
    jade = require('jade')

smtpTrans = nodemailer.createTransport('SMTP', {
      service: 'Gmail',
      auth: {
          user: "donald@arabangels.org",
          pass: "zer0mstr" 
      }
  })
exports.send = function(template, user, subject, sendTo, verificationUrl){
  jade.renderFile(__dirname+'/templates/'+template+'.jade',{user:user, verificationUrl: verificationUrl}, function(err, mail){
    mailOpts = {
        from: 'Arab Angels <Donald@arabangels.org>',
        to: sendTo,
        subject: subject,
        html: mail
    }

  smtpTrans.sendMail(mailOpts, function (err, response) {
        //Email not sent
        if (err) {
            console.log(err)
        }
        //Yay!! Email sent
        else {
            console.log(response)
        }
    })

  })
}  


