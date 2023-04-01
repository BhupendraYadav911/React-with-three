var mongoose = require('mongoose');
const Setting = require('../models/setting');
const Response = require('../lib/response');
module.exports = {
    addBanner: addBanner,
    getBanners: getBanners,
    upadteBanner: upadteBanner
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
    // if (req.body.user.role != 'admin') {
    //     return res.status(403).send(Response(403, 'Not allowed'));
    // }
    if (!req.body.name) {
        return res.status(400).send(Response(400, 'Invalid request! Required banner name is missing'));
    }
    if (!req.body.banner_type) {
        return res.status(400).send(Response(400, 'Invalid request! Required banner type is missing'));
    }
    if (!req.body.banner_url) {
        return res.status(400).send(Response(400, 'Invalid request! Required banner url is missing'));
    }
  
    const bannerExists = await Setting.findOne({ "banner_type": req.body.banner_type });
    if (bannerExists) {
        return res.status(400).send(Response(400, 'Banner type already exists!.', bannerExists));

    } else {
        // Create a banner
        const banner = new Setting(req.body);
        banner.created_by = req.body.user._id;

        console.log('banner', banner);
        // Save banner in the database
        await banner.save()
            .then(data => {
                res.status(201).send(Response(200, "Banner add succcessfully!", data));
            }).catch(err => {
                res.status(500).send(Response(500, "Some error occurred while retrieving banner."));
            });
    }

}
async function upadteBanner(req, res) {
    if (req.body.user.role != 'admin') {
        return res.status(403).send(Response(403, 'Not allowed'));
    }
    if (!req.body.bannerId || req.body.bannerId == "") {
        return res.status(400).send(Response(400, 'Invalid request! Required banner id is missing'));
    }
    if (!req.body.name) {
        return res.status(400).send(Response(400, 'Invalid request! Required banner name is missing'));
    }
    if (!req.body.banner_url) {
        return res.status(400).send(Response(400, 'Invalid request! Required banner url is missing'));
    }
    await Setting.findOneAndUpdate(
        { _id: req.body.bannerId },
        { $set: { "name": req.body.name, "banner_url": req.body.banner_url } },
        { new: true }
    ).then(banner => {
        if (!banner) {
            return res.status(404).send(Response(404, `Invalid banner ID ${req.body.bannerId}`));
        }
        res.status(201).send(Response(200, "Banner updated successfully!", banner));
    }).catch(err => {
        res.status(500).send(Response(500, "Some error occurred while retrieving banners."));
    });

}
// async function addBanner(req, res) {

//   const passUser = await Setting.findOne({ "_id": req.body._id });

//    if(!passUser){
//     if (!req.files || Object.keys(req.files).length === 0) {
//             return res.json(Response(400, 'No files were uploaded!'));
//         }


//        let banner1 = req.files.banner1;
//         let fileName1 = banner1.name;
//         let file_url = "/images/" + fileName1;
//         const fileMovePromise = req.files ?
//         moveFile(banner1, 'public/banners/' + fileName1) : Promise.resolve('No file present');

//         let banner2 = req.files.banner2;
//         let fileName2 = banner2.name;
//         let file_url2 = "/images/" + fileName2;
//         const fileMovePromise2 = req.files ?
//         moveFile(banner2, 'public/banners/' + fileName2) : Promise.resolve('No file present');

//         let banner3 = req.files.banner3;
//         let fileName3 = banner3.name;
//         let file_url3 = "/images/" + fileName3;
//         const fileMovePromise3 = req.files ?
//         moveFile(banner3, 'public/banners/' + fileName3) : Promise.resolve('No file present');

//         let banner4 = req.files.banner4;
//         let fileName4 = banner4.name;
//         let file_url4 = "/images/" + fileName4;
//         const fileMovePromise4 = req.files ?
//         moveFile(banner4, 'public/banners/' + fileName4) : Promise.resolve('No file present');

//       const userToBeSaved = new Setting();
//         userToBeSaved.banner1 = 'public/banners/' + req.files.banner1.name;
//         userToBeSaved.banner2 = 'public/banners/' + req.files.banner2.name;
//         userToBeSaved.banner3 = 'public/banners/' + req.files.banner3.name;
//         userToBeSaved.banner4 = 'public/banners/' + req.files.banner4.name;

//         userToBeSaved.save();
//         return res.status(201).send(Response(200, "Banner saved  Successful!."));
//    }else{
//       if (!req.files || Object.keys(req.files).length === 0) {
//             return res.json(Response(400, 'No files were uploaded!'));
//         }


//        let banner1 = req.files.banner1;
//         let fileName1 = banner1.name;
//         let file_url = "/images/" + fileName1;
//         const fileMovePromise = req.files ?
//         moveFile(banner1, 'public/banners/' + fileName1) : Promise.resolve('No file present');

//         let banner2 = req.files.banner2;
//         let fileName2 = banner2.name;
//         let file_url2 = "/images/" + fileName2;
//         const fileMovePromise2 = req.files ?
//         moveFile(banner2, 'public/banners/' + fileName2) : Promise.resolve('No file present');

//         let banner3 = req.files.banner3;
//         let fileName3 = banner3.name;
//         let file_url3 = "/images/" + fileName3;
//         const fileMovePromise3 = req.files ?
//         moveFile(banner3, 'public/banners/' + fileName3) : Promise.resolve('No file present');

//         let banner4 = req.files.banner4;
//         let fileName4 = banner4.name;
//         let file_url4 = "/images/" + fileName4;
//         const fileMovePromise4 = req.files ?
//         moveFile(banner4, 'public/banners/' + fileName4) : Promise.resolve('No file present');

//        passUser.banner1 = 'public/banners/' + req.files.banner1.name || passUser.banner1;
//        passUser.banner2 = 'public/banners/' + req.files.banner2.name || passUser.banner2;
//        passUser.banner3 = 'public/banners/' + req.files.banner3.name || passUser.banner3;
//        passUser.banner4 = 'public/banners/' + req.files.banner4.name || passUser.banner4;
//    passUser.save();
//    return res.status(201).send(Response(200, "Banner update succcessfully!."));
//    }
// }

async function getBanners(req, res) {
    
    await Setting.find()
        .then(banners => {
            res.status(201).send(Response(200, "Banners list data succcessfully!.", banners));
        }).catch(err => {
            res.status(500).send(Response(500, "Some error occurred while retrieving banner."));
        });
}
