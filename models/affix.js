const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let AffixSchema = Schema({
  name: {type: String, required: true},
  descShort: {type: String, required: true},
  descLong: {type: String}
});

module.exports = mongoose.model('Affix', AffixSchema);
