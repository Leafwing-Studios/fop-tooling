const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let RuleSchema = Schema({
  name: {type: String, required: true},
  descShort: {type: String, required: true},
  descLong: {type: String, required: true},
  source: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
  }
});

module.exports = mongoose.model('Rule', RuleSchema);
