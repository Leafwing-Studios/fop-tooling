const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let RuleSchema = Schema({
  title: {type: String, required: true},
  descShort: {type: String, required: true},
  descLong: {type: String}
});

module.exports = mongoose.model('Rule', RuleSchema);
