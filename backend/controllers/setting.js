var mongoose = require('mongoose');
const Setting = require('../models/setting');
const Response = require('../lib/response');
module.exports = {
	addBanner:addBanner,
  getBanners:getBanners
}
async function moveFile(file, somePlace) {
    return new Promise((resolve, reject) => {
        file.mv(somePlace, function (err) {
            if (err) return reject(err);
            resolve();
        });
    });
}
async function addBanner(req, res) {

  const passUser = await Setting.findOne({ "_id": req.body._id });

   if(!passUser){
    if (!req.files || Object.keys(req.files).length === 0) {
            return res.json(Response(400, 'No files were uploaded!'));
        }
     

       let banner1 = req.files.banner1;
        let fileName1 = banner1.name;
        let file_url = "/images/" + fileName1;
        const fileMovePromise = req.files ?
        moveFile(banner1, 'public/banners/' + fileName1) : Promise.resolve('No file present');

        let banner2 = req.files.banner2;
        let fileName2 = banner2.name;
        let file_url2 = "/images/" + fileName2;
        const fileMovePromise2 = req.files ?
        moveFile(banner2, 'public/banners/' + fileName2) : Promise.resolve('No file present');

        let banner3 = req.files.banner3;
        let fileName3 = banner3.name;
        let file_url3 = "/images/" + fileName3;
        const fileMovePromise3 = req.files ?
        moveFile(banner3, 'public/banners/' + fileName3) : Promise.resolve('No file present');

        let banner4 = req.files.banner4;
        let fileName4 = banner4.name;
        let file_url4 = "/images/" + fileName4;
        const fileMovePromise4 = req.files ?
        moveFile(banner4, 'public/banners/' + fileName4) : Promise.resolve('No file present');

      const userToBeSaved = new Setting();
        userToBeSaved.banner1 = 'public/banners/' + req.files.banner1.name;
        userToBeSaved.banner2 = 'public/banners/' + req.files.banner2.name;
        userToBeSaved.banner3 = 'public/banners/' + req.files.banner3.name;
        userToBeSaved.banner4 = 'public/banners/' + req.files.banner4.name;
     
        userToBeSaved.save();
        return res.status(201).send(Response(200, "Banner saved  Successful!."));
   }else{
      if (!req.files || Object.keys(req.files).length === 0) {
            return res.json(Response(400, 'No files were uploaded!'));
        }
     

       let banner1 = req.files.banner1;
        let fileName1 = banner1.name;
        let file_url = "/images/" + fileName1;
        const fileMovePromise = req.files ?
        moveFile(banner1, 'public/banners/' + fileName1) : Promise.resolve('No file present');

        let banner2 = req.files.banner2;
        let fileName2 = banner2.name;
        let file_url2 = "/images/" + fileName2;
        const fileMovePromise2 = req.files ?
        moveFile(banner2, 'public/banners/' + fileName2) : Promise.resolve('No file present');

        let banner3 = req.files.banner3;
        let fileName3 = banner3.name;
        let file_url3 = "/images/" + fileName3;
        const fileMovePromise3 = req.files ?
        moveFile(banner3, 'public/banners/' + fileName3) : Promise.resolve('No file present');

        let banner4 = req.files.banner4;
        let fileName4 = banner4.name;
        let file_url4 = "/images/" + fileName4;
        const fileMovePromise4 = req.files ?
        moveFile(banner4, 'public/banners/' + fileName4) : Promise.resolve('No file present');
        
       passUser.banner1 = 'public/banners/' + req.files.banner1.name || passUser.banner1;
        passUser.banner2 = 'public/banners/' + req.files.banner2.name || passUser.banner2;
         passUser.banner3 = 'public/banners/' + req.files.banner3.name || passUser.banner3;
          passUser.banner4 = 'public/banners/' + req.files.banner4.name || passUser.banner4;
   passUser.save();
   return res.status(201).send(Response(200, "Banner update succcessfully!."));
   }
}

async function getBanners(req, res) {
await Setting.find()
        .then(banners => {
            res.status(201).send(Response(200, "Banners list data succcessfully!.", banners));
        }).catch(err => {
            res.status(500).send(Response(500, "Some error occurred while retrieving banner."));
        });
}
