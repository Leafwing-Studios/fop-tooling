const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let AffixSchema = Schema({
  name: {type: String, required: true},
  descShort: {type: String, required: true},
  descLong: {type: String, required: true},
  source: {
    type: String, 
    enum: ['core:phb', 'core:animism', 'core:ws'],
    required: true,
  },
  cost: {
    type: Number,
    min: 0,
    default: 1,
  },
  maxReplicates: {
    type: Number,
    min: 0,
    default: 1,
  },
  doubleEdged: {type: Boolean, default: false},
  affixType: {
    type: String,
    enum: ['Magical', 'Elemental', 'Prismatic', 'Mundane'],
    required: true,
  },
  elements: {
    type: [String],
    enum: [
      'Physical', 
      'Arcane', 
      'Eldritch', 
      'Air', 
      'Earth', 
      'Fire', 
      'Water', 
      'Primal', 
      'Decay', 
      'Radaint', 
      'Umbral', 
      'Corrosion', 
      'Electric'
    ],
  }
});

module.exports = mongoose.model('Affix', AffixSchema);
