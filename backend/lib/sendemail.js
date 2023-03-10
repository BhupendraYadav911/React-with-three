/**
 * This file is meant for giving the custom sendemail
 ** params @toData | @subjectData | @textData
*/
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
module.exports = function (toData, subjectData, textData) {
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
    var transport = nodemailer.createTransport(smtpTransport({
        host: 'smtp-relay.gmail.com',
        port: 587
    }));
    const message = {
        from: 'support@2launch.co', // Sender address
        to: toData,         // List of recipients
        subject: subjectData, // Subject line
        text: textData, // Plain text body
    };
    transport.sendMail(message, function (err, info) {
        //console.log('message',message)
        if (err) {
            //console.log('err',err)
        } else {
            //console.log('info',info)
            return res.status(201).send(Response(200, "Registration Successful!."));
        }
    });
}