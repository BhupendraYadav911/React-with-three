/**
 * This file is meant for giving the custom sendemail
 ** params @toData | @subjectData | @textData
*/
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
module.exports = function (toData, subjectData,resetToken) {
  return new Promise(function(resolve, reject) {
    /* let transport = nodemailer.createTransport({
        host: 'smtp.mailtrap.io',
        port: 2525,
        auth: {
            user: '4933545dcb062b',
            pass: '59452c5b5cbe72'
        }
    });
    const message = {
        from: 'ghanshyam.digiprima@gmail.com', // Sender address
        to: toData,         // List of recipients
        subject: subjectData, // Subject line
        text: textData, // Plain text body
    }; */
    /*  let transport = nodemailer.createTransport({
         host: 'smtp-relay.gmail.com',
         port: 587,
         auth: {
             user: 'support@2launch.co',
             pass: 'fhcgflqjabydxybt'
         }
     }); */
    // var transport = nodemailer.createTransport(smtpTransport({
    //     host: 'smtp-relay.gmail.com',
    //     port: 587
    // }));
    // const message = {
    //     from: 'support@2launch.co', // Sender address
    //     to: toData,         // List of recipients
    //     subject: subjectData, // Subject line
    //     text: textData, // Plain text body
    // };
    // transport.sendMail(message, function (err, info) {
    //     //console.log('message',message)
    //     if (err) {
    //         //console.log('err',err)
    //     } else {
    //         //console.log('info',info)
    //         return res.status(201).send(Response(200, "Registration Successful!."));
    //     }
    // });
    const url = 'http://103.120.178.54:3011/#/resetpassword/token='+resetToken;
    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: "ghanshyam.digiprima@gmail.com",
            pass: "oscbgtmkmwrbkohw",
        },
    });
    // send mail with defined transport object
    let info = transporter.sendMail({
        from: '"HDFC 360 image" <ghanshyam.digiprima@gmail.com>', // sender address
        to: `${toData}`, // list of receivers
        subject: 'HDFC 360 image', // Subject line
        text: 'forgot your password', // plain text body
        html: `<!DOCTYPE html>
                    <html>
                      <head>
                        <meta charset="utf-8">
                        <title>NodeMailer Email Template</title>
                        <style>
                          .container {
                            width: 100%;
                            height: 100%;
                            padding: 20px;
                            background-color:#fff;
                          }
                          .email {
                            width: 80%;
                            margin: 0 auto;
                            background-color: #fff;
                            padding: 20px;
                          }
                          .email-header {
                            background-color: #333;
                            color: #fff;
                            padding: 20px;
                            text-align: center;
                          }
                          .email-body {
                            padding: 20px;
                          }
                          .email-footer {
                            background-color: #333;
                            color: #fff;
                            padding: 20px;
                            text-align: center;
                          }
                        </style>
                      </head>
                      <body>
                        <div class="container">
                          <div class="email">
                           
                            <div class="email-body">
                              <p><h2> Looks like you forgot your password.</h2></p>
            
                              <p> Please follow the next link to reset your password: <a href="${url}" target="_blank">Reset password</a></p>
            
                              <p>If that doesn't work or you have any other issues, feel free to email us at <a  href="mailto:hdfc@hdfc360image">hdfc@hdfc360image</a></p>
                            </div>
                           
                          </div>
                        </div>
                      </body>
                    </html>` // html body
    });
    
    resolve(info)
  });
}