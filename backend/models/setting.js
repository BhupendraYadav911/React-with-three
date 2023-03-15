var mongoose = require('mongoose');
// var random = require('mongoose-simple-random');

Schema = mongoose.Schema;

const SettingSchema = mongoose.Schema({
  
    banner1: { type: String },
     banner2: { type: String },
      banner3: { type: String },
       banner4: { type: String },
});

module.exports = mongoose.model('Setting', SettingSchema);