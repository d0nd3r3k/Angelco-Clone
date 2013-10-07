var nodemailer = require('nodemailer'),
    jade = require('jade')

smtpTrans = nodemailer.createTransport('SMTP', {
      service: 'Gmail',
      auth: {
          user: "donald@arabangels.org",
          pass: "zer0mstr" 
      }
  })
exports.send = function(template, user){
  console.log(user)
  jade.renderFile(__dirname+'/templates/'+template+'.jade',{user:user}, function(err, mail){
    mailOpts = {
        from: 'Arab Angels <Donald@arabangels.org>',
        to: user.email,
        subject: 'Welcome to Arab Angels',
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

