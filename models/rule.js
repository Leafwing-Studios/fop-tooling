const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let RuleSchema = Schema({
  name: {type: String, required: true},
  descShort: {type: String, required: true},
  descLong: {type: String, required: true},
  source: {
    type: String, 
    enum: ['core:phb', 'core:animism', 'core:ws'],
    required: true,
  },
});

module.exports = mongoose.model('Rule', RuleSchema);
