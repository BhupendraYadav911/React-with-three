var mongoose = require('mongoose');
const Setting = require('../models/setting');
const Response = require('../lib/response');
module.exports = {
	setting:setting
}

async function setting(req, res) {
  const userToBeSaved = Setting.find()

   	
        userToBeSaved.banner1 = req.body.banner1 || userToBeSaved.banner1;
     
        userToBeSaved.save();
        return res.status(201).send(Response(200, "Registration Successful!.", userToBeSaved));
}


