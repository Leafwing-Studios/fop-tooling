const common = require('./common');
const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let AffixSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  descShort: {type: String, required: true},
  descLong: {type: String, required: true},
  source: {
    type: String,
    enum: common.sources,
    required: true,
  },
  cost: {
    type: Number,
    default: 1,
  },
  maxReplicates: {
    type: Number,
    min: 0,
    default: 1,
  },
  doubleEdged: {type: Boolean, default: false},
  slot: {
    type: String,
    enum: ['Arms', 'Armor', 'Trinket', 'Consumable'],
    required: true,
  },
  affixType: {
    type: String,
    enum: ['Advanced', 'Exotic', 'Prismatic', 'Mundane'],
    required: true,
  },
  prerequisites: String,
  tags: {
    type: [String],
    enum: common.affixTags,
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
      'Radiant',
      'Umbral',
      'Corrosion',
      'Electric',
      'Specified',
    ],
  }
});

AffixSchema.index({ source: 1, name: 1 }, { unique: true });

AffixSchema.on('index', (err) => console.log(err.message));

module.exports = mongoose.model('Affix', AffixSchema);
