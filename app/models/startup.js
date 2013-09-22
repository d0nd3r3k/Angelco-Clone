
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , Schema = mongoose.Schema

/**
 * Startup Schema
 */

var StartupSchema = new Schema({
  name: { type: String,unique: true},
  website: { type: String, default: '' },
  tagline: { type: String, default: '' },
  description: { type: String, default: '' },
  location: { type: String, default: '' },
  presentation: { type: String, default: '' },
  video: { type: String, default: '' },
  logo: {type: Object},
  links: {
    blog: {type: String, default: ''},
    facebook: {type: String, default: ''},
    twitter: {type: String, default: ''},
    googleplus: {type: String, default: ''}
  },
  press: [{
    title: { type : String, default : '' },
    link: { type : String, default : '' }
  }],
  user: {
    id: {type: String, default: ''}
  },
  createdAt  : {type : Date, default : Date.now}
})
StartupSchema.path('name').index({ unique: true });


/**
 * Statics
 */

StartupSchema.statics = {

  /**
   * Find startup by id
   *
   * @param {ObjectId} id
   * @param {Function} cb
   * @api private
   */

  load: function (id, cb) {
    this.findOne({ _id : id })
      .exec(cb)
  },

  /**
   * List articles
   *
   * @param {Object} options
   * @param {Function} cb
   * @api private
   */

  list: function (options, cb) {
    var criteria = options.criteria || {}

    this.find(criteria)
      .populate('user', 'name')
      .sort({'createdAt': -1}) // sort by date
      .limit(options.perPage)
      .skip(options.perPage * options.page)
      .exec(cb)
  }

}


mongoose.model('Startup', StartupSchema)
