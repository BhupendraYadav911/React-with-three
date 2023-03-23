var mongoose = require('mongoose');
const User = require('../models/user');
const Status = require('../models/status');
const Response = require('../lib/response');
const Sendemail = require('../lib/sendemail');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const saltRounds = require('../config').saltRounds;
const authenticate = require('../authenticate');
const fileUpload = require('express-fileupload');
var jwt = require('jsonwebtoken');
var randStr = require('randomstring');
module.exports = {
    statusAdd: statusAdd,
    signupEmail: signupEmail,
    signup: signup,
    login: login,
    changePassword: changePassword,
    forgotPassword: forgotPassword,
    logoutUser: logoutUser,
    updateUserProfile: updateUserProfile,
    updateUserPhoto: updateUserPhoto,
    updateUserPhotoTest:updateUserPhotoTest,
    getAllUsers: getAllUsers,
    deleteUser: deleteUser
};
async function statusAdd(req, res) {
    const newUser = new Status(req.body);
    newUser.save((err, User) => {
        if (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({ err: err });
            return;
        }
        res.statusCode = 201;
        res.setHeader('Content-Type', 'application/json');
        res.json(Response(200, 'status add Successful!', newUser));
        return;
    });
}
async function signup(req, res) {
    if (!req.body.full_name) {
        return res.status(400).send(Response(400, 'Invalid request! Required full_name is missing'));
    }
    if (!req.body.email) {
        return res.status(400).send(Response(400, 'Invalid request! Required email is missing'));
    }
    if (!req.body.password) {
        return res.status(400).send(Response(400, 'Invalid request! Required password is missing'));
    }
    const emailExists = await User.findOne({ "email": req.body.email });
    if (emailExists) {
        return res.status(400).send(Response(400, 'Email already exists!.',emailExists));
    }
    else{
        const userToBeSaved = new User();
        userToBeSaved.full_name = req.body.full_name;
        userToBeSaved.email = req.body.email;
        userToBeSaved.role = req.body.role;
        userToBeSaved.user_photo = req.body.user_photo;
        userToBeSaved.password = bcrypt.hashSync(req.body.password, 10);
        userToBeSaved.save();
        return res.status(201).send(Response(200, "Registration Successful!.", userToBeSaved));
    }

};
async function login(req, res) {
     //const imageUrl = req.headers.origin;
    if (!req.body.email) {
        return res.status(400).send(Response(400, 'Invalid request! Required email are missing!'));
    }
    if (!req.body.password) {
        return res.status(400).send(Response(400, 'Invalid request! Required password are missing!'));
    }

    const dataUser = await User.findOne({ "email": req.body.email });
   
    if(dataUser){
        bcrypt.compare(req.body.password, dataUser.password, function (err, result) {
            if (result == true) {
                /* if (user.user_photo != "") {
                    user.user_photo = imageUrl + user.user_photo;
                } */
                res.status(201);
                res.json({
                    code: "200",
                    message: "user login Successful",
                    data: dataUser,
                    token: authenticate.getToken({
                        userid: dataUser._id,
                        iat: Math.floor(Date.now() / 1000),
                        // exp: Math.floor(Date.now() / 1000) + (60 * 60)
                    })
                });
            } else {
                return res.status(400).send(Response(400, 'Incorrect password!'));
            }
        });
    }else{
        return res.status(400).send(Response(400, 'Email Address is not registered with us !'));  
    }
}
async function changePassword(req, res) {
    if (!req.body.oldPassword && req.body.oldPassword == "") {
        return res.json(Response(400, 'Required old password are missing!'));
    }
    if (!req.body.newPassword && req.body.newPassword == "") {
        return res.json(Response(400, 'Required new password are missing!'));
    }
    const passUser = await User.findOne({ "_id": req.body.user._id });
    if (passUser) {
        bcrypt.compare(req.body.oldPassword, req.body.user.password, function (err, result) {
            if (result == true) {
                req.body.newPassword = bcrypt.hashSync(req.body.newPassword, saltRounds);
                User.findOneAndUpdate(
                    { _id: req.body.user._id },
                    { $set: { "password": req.body.newPassword } },
                    { new: true }
                ).then(user => {
                    if (!user) {
                        return res.status(404).send(Response(404, `Invalid old password ${req.body.oldPassword}`));
                    }
                    res.status(201).send(Response(200, "Password updated successfully!", user));
                }).catch(err => {
                    res.status(500).send(Response(500, "Some error occurred while retrieving user."));
                });
            } else {
                res.json({ status: "false", response: "Incorrect old password !", data: {} });
            }
        });
    } else {
        res.json({ status: "false", response: "Email Address is missing !", data: {} });
    }
}
async function signupEmail(req, res) {
    const sideURL = req.headers.origin;
    if (req && Object.keys(req.body).length > 0) {
        const newUser = new Status(req.body);
        //newUser.save();
        const emailExists = await User.findOne({ "email": req.body.email });
        if (emailExists) {
            // return res.json(Response(402, 'Email already exists'));
            //return res.status(201).send(Response(200, "Email already exists!.", emailExists));
            return res.status(400).send(Response(400, 'Email already exists!.', emailExists));
        } else {
            const newUser = new User();
            const statusData = await Status.findOne();
            if (req.body.email) {
                newUser.email = req.body.email;
                const rand = () => Math.random(0).toString(36).substr(2);
                const token = (length) => (rand() + rand() + new Date().getTime() + rand() + rand()).substr(0, length);
                newUser.token = token(40);
                newUser.status = mongoose.Types.ObjectId(statusData._id);
            }
            newUser.save(async (err, User) => {
                if (err) {
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({ err: err });
                    return;
                } else {
                    // update share roadmap data
                    const emailInvite = await Roadmapinvitation.find({ "email": req.body.email });
                    if (emailInvite.length > 0) {
                        for (let i = 0; i < emailInvite.length; i++) {
                            const newUserInvite = {
                                "userId": newUser._id,
                                "permission": {
                                    "add": emailInvite[i].permission.add,
                                    "edit": emailInvite[i].permission.edit,
                                    "delete": emailInvite[i].permission.delete,
                                    "view": emailInvite[i].permission.view
                                }
                            }
                            await Share.findOneAndUpdate(
                                { "roadmapId": emailInvite[i].roadmapId },
                                {
                                    $push: { "sharedWith": newUserInvite }
                                }, { new: true }
                            );
                        }
                    }
                    // send email to register email
                    /*  let transport = nodemailer.createTransport({
                         host: 'smtp.mailtrap.io',
                         port: 2525,
                         auth: {
                             user: '4933545dcb062b',
                             pass: '59452c5b5cbe72'
                         }
                     });
                     const message = {
                         from: 'ghanshyam.digiprima@gmail.com', // Sender address
                         to: req.body.email,         // List of recipients
                         subject: 'Activate your account', // Subject line
                         text: 'https://api.hungryforwings.com/auth/validate-signup/' + newUser.token, // Plain text body
                     };
                     transport.sendMail(message, function (err, info) {
                         if (err) {
                             console.log(err)
                         } else {
                             return res.status(201).send(Response(200, "Registration Successful!.", newUser));
                         }
                     }); */
                    let textSms = sideURL + '/sign-up/details/' + newUser.token;
                    console.log('hhii', textSms);
                    Sendemail(req.body.email, 'Activate your account', textSms);
                    return res.status(201).send(Response(200, "Registration Successful!.", newUser));
                }
            });
        }
    } else {
        return res.status(400).send(Response(400, 'Required fields are missing'));
    }
};
// async function signup(req, res) {
//     if (!req.body.full_name) {
//         return res.status(400).send(Response(400, 'Invalid request! Required full_name is missing'));
//     }
//     if (!req.body.password) {
//         return res.status(400).send(Response(400, 'Invalid request! Required password is missing'));
//     }
//     if (!req.body.organization) {
//         return res.status(400).send(Response(400, 'Invalid request! Required organization is missing'));
//     }
//     /* if (!req.body.phone_code) {
//         return res.status(400).send(Response(400, 'Invalid request! Required phone_code is missing'));
//     }
//     if (!req.body.phone_nymber) {
//         return res.status(400).send(Response(400, 'Invalid request! Required phone_nymber is missing'));
//     } */
//     if (!req.body.job_id) {
//         return res.status(400).send(Response(400, 'Invalid request! Required job_id is missing'));
//     }
//     if (!req.body.token) {
//         return res.status(400).send(Response(400, 'Invalid request! Required token is missing'));
//     }
//     const emailExists = await User.findOne({ "token": req.body.token });
//     if (emailExists) {
//         req.body.password = bcrypt.hashSync(req.body.password, saltRounds);
//         // save user organization
//         const newOrganization = {
//             organization: req.body.organization,
//         }
//         const OrganiUser = new Userorganization(newOrganization);
//         OrganiUser.save();
//         req.body.organization_id = OrganiUser._id;
//         await User.findOneAndUpdate({ _id: emailExists._id }, req.body, { new: true }
//         ).then(user => {
//             if (!user) {
//                 return res.status(404).send(Response(404, `Invalid user`));
//             }
//             res.status(201).send(Response(200, "successfully updated!", user));
//         }).catch(err => {
//             res.status(500).send(Response(500, "Some error occurred while retrieving user."));
//         });
//     }
//     else {
//         return res.status(400).send(Response(400, 'Invalid token'));
//     }
// };



async function forgotPassword(req, res) {
    if (!req.body.email && req.body.email == "") {
        return res.status(400).send(Response(400, 'Invalid request! Required email are missing!'));
    }
    const passUser = await User.findOne({ "email": req.body.email });
    if (passUser) {
        const yourString = randStr.generate(8);
        const passReset = bcrypt.hashSync(yourString, saltRounds);
        User.findOneAndUpdate(
            { _id: passUser._id },
            { $set: { "password": passReset } },
            { new: true }
        ).then(user => {
            if (!user) {
                /*  return res.status(404).send(Response(404, `Invalid old password ${req.body.oldPassword}`)); */
            }
            // send email to register email
            Sendemail(req.body.email, 'Forgot password', 'Your password is' + ' ' + yourString);
            res.status(201).send(Response(200, "Please check your email for reset instructions! "));
        }).catch(err => {
            res.status(500).send(Response(500, "Some error occurred while retrieving user."));
        });
    }
    else {
        return res.status(400).send(Response(400, 'Email Address is not registered with us !'));
    }
}

/* async function forgotPassword(req, res) {
    if (req.body.email != "" && req.body.email != null) {
        User.find({ email: req.body.email }, function (err, rows) {
            if (err) {
               // res.send(err)
                res.status(500).send(Response(500, "Some error occurred while retrieving user."));
            }
            else if (rows[0] != undefined) {
                //@ send an email
                secret = randomstring.generate(35);
                User.update({
                    _id: rows[0]._id,
                    email: rows[0].email
                },
                    { reset_secret: crypto.createHash('md5').update(secret).digest("hex") }, function (err2, tmp2) {
                        if (err2)
                            console.log(err2);
                        plainText = 'Kindly click the Link to reset your Account password  ' + config.baseURL + '/reset/' + secret
                        htmlText = '<b> Kindly click the Link to reset your Account password </b> <br/> ' + config.baseURL + '/reset/' + secret
                        var mailOptions = {
                            from: '"FaithCannon" <noreply@faithcanon.com>', // sender address
                            to: rows[0].email, // list of receivers
                            subject: 'Reset your FaithCannon Password', // Subject line
                            text: plainText, // plain text body
                            html: htmlText
                        };
                        // send mail with defined transport object
                        smtpTransport.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                return console.log(error);
                            }
                            console.log('Message sent: %s', info.messageId);
                            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                        });
                        res.json({
                            status: "true",
                            response: "Please check your email for reset instructions.",
                            data: {}
                        });
                    });
            } else {
                //res.json({ status: "false", response: "Email Address is not registered with us !", data: {} });
                return res.status(400).send(Response(400, 'Email Address is not registered with us !'));
            }
        });

    } else {
       // res.json({ status: "false", response: "Email Address is missing !", data: {} });
       return res.status(400).send(Response(400, 'Invalid request! Required email are missing!'));
    }
}; */
async function logoutUser(req, res) {
    /// const Tokan = req.body.user.token;
    console.log(req);
    /*  try {
         Tokan = Tokan.filter((token) =>{
          return token.token !== req.token
         })
         await req.user.save()
         res.send()
     } catch (error) {
         res.status(500).send()
     } */
}
async function updateUserProfile(req, res) {
    if (!req.body.full_name) {
        return res.json(Response(400, 'Required full_name are missing!'));
    }
    if (!req.body.job_id) {
        return res.json(Response(400, 'Required job_id are missing!'));
    }
    if (req.body.newPassword && req.body.newPassword != "" && !req.body.oldPassword) {
        return res.json(Response(400, 'Required old password are missing!'));
    }
    const passUser = await User.findOne({ "_id": req.body.user._id });
    //const imageUrl = req.headers.origin;
    if (passUser) {
        /* if (!req.body.phone_code) {
            req.body.phone_code = req.body.user.phone_code;
        }
        if (!req.body.phone_nymber) {
            req.body.phone_nymber = req.body.user.phone_nymber;
        } */
        if (req.body.newPassword && req.body.newPassword != "") {
            bcrypt.compare(req.body.oldPassword, req.body.user.password, function (err, result) {
                if (result == true) {
                    req.body.newPassword = bcrypt.hashSync(req.body.newPassword, saltRounds);
                    User.findOneAndUpdate(
                        { _id: req.body.user._id },
                        {
                            $set: {
                                "full_name": req.body.full_name,
                                "organization": req.body.organization,
                                "job_id": req.body.job_id,
                                "password": req.body.newPassword
                            }
                        }, { new: true }
                    ).then(user => {
                        if (!user) {
                            return res.status(404).send(Response(404, `Invalid user ${user}`));
                        }
                        /* if (user.user_photo != "") {
                            user.user_photo = imageUrl + user.user_photo;
                        } */
                        res.status(201).send(Response(200, "Profile updated successfully!", user));
                    }).catch(err => {
                        res.status(500).send(Response(500, "Some error occurred while retrieving user."));
                    });
                } else {
                    return res.status(400).send(Response(400, 'Incorrect old password!'));
                }
            });
        } else {
            User.findOneAndUpdate(
                { _id: req.body.user._id },
                {
                    $set: {
                        "full_name": req.body.full_name,
                        "organization": req.body.organization,
                        "job_id": req.body.job_id
                    }
                }, { new: true }
            ).then(user => {
                if (!user) {
                    return res.status(404).send(Response(404, `Invalid user ${user}`));
                }
               /*  if (user.user_photo != "") {
                    user.user_photo = imageUrl + user.user_photo;
                } */
                res.status(201).send(Response(200, "Profile updated successfully!", user));
            }).catch(err => {
                res.status(500).send(Response(500, "Some error occurred while retrieving user."));
            });
        }
        //console.log('updatedField', updatedField);
    } else {
        return res.status(400).send(Response(400, 'Email Address is missing !'));
    }
}
async function moveFile(file, somePlace) {
    return new Promise((resolve, reject) => {
        file.mv(somePlace, function (err) {
            if (err) return reject(err);
            resolve();
        });
    });
}
async function updateUserPhoto(req, res) {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.json(Response(400, 'No files were uploaded!'));
        }
        let sampleFile = req.files.user_photo;
        if (sampleFile.size > "1000000") {
            return res.json(Response(400, 'File size must under 1mb!'));
        }
        let fileName = sampleFile.name;
        let file_url = "/images/" + fileName;
        //let file_url = "/home/dell/Projects/backend-dev/public/images/" + fileName;
        //const imageUrl = req.headers.origin;
        // Use the mv() method to place the file somewhere on your server
        const fileMovePromise = req.files ?
            moveFile(sampleFile, 'public/images/' + fileName) : Promise.resolve('No file present');
        fileMovePromise.then(() => {
            // do other stuff
            User.findOneAndUpdate(
                { _id: req.body.user._id },
                {
                    $set: {
                        "user_photo": file_url
                    }
                }, { new: true }
            ).then(user => {
                if (!user) {
                    return res.status(404).send(Response(404, `Invalid user ${user}`));
                }
                //user.user_photo = imageUrl + user.user_photo;
                res.status(201).send(Response(200, "Profile updated successfully!", user));
            });
        }).catch(err => {
           res.status(500).send(Response(500, err));
        });
}
async function updateUserPhotoTest(req, res) {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.json(Response(400, 'No files were uploaded!'));
        }
        let sampleFile = req.files.user_photo;
        if (sampleFile.size > "1000000") {
            return res.json(Response(400, 'File size must under 1mb!'));
        }
        let fileName = sampleFile.name;
        let file_url = "/images/" + fileName;
        //const imageUrl = req.headers.origin;
        // Use the mv() method to place the file somewhere on your server
        sampleFile.mv('public/images/' + fileName, function (err) {
            if (err) {
                res.status(500).send(Response(500, "Some error occurred while retrieving user."));
            } else {
                User.findOneAndUpdate(
                    { _id: req.body.user._id },
                    {
                        $set: {
                            "user_photo": file_url
                        }
                    }, { new: true }
                ).then(user => {
                    if (!user) {
                        return res.status(404).send(Response(404, `Invalid user ${user}`));
                    }
                    //user.user_photo = imageUrl + user.user_photo;
                    res.status(201).send(Response(200, "Profile updated successfully!", user));
                }).catch(err => {
                    res.status(500).send(Response(500, "Some error occurred while retrieving user."));
                });
            }
        });
}
async function getAllUsers(req, res) {
    await User.find()
        .then(users => {
            res.status(201).send(Response(200, "Users list data succcessfully!.", users));
        }).catch(err => {
            res.status(500).send(Response(500, "Some error occurred while retrieving user."));
        });
}
async function deleteUser(req, res) {
    if (req.body.userId != "" && req.body.userId != null) {
        User.findByIdAndRemove(req.body.userId)
            .then(user => {
                if (!user) {
                    return res.status(404).send(Response(404, `Invalid user ID ${req.body.userId}`));
                }
                return res.json(Response(200, 'User deleted successfully!', user));
            }).catch(err => {
                res.status(500).send(Response(500, "Some error occurred while retrieving user."));
            });
    }
    else {
        return res.status(400).send(Response(400, 'Invalid request! Required user ID is missing'));
    }
}
