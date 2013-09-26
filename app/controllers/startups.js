
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , User = mongoose.model('User')
  , Startup = mongoose.model('Startup')
  , utils = require('../../lib/utils')
  , jsdom = require('jsdom')
  , picsee = require('picsee')


exports.create = function (req, res) {
  var startup = new Startup(req.body),
      user = req.user
  startup.logo = ""
  startup.user.id = user.id

  startup.save(function (err) {
    if (err) {
      return res.redirect('/users/'+user.id)
    } 
    else{
      user.startups.push({_id:startup.id, 
                          name: startup.name,
                          tagline: startup.tagline,
                          website: startup.website,
                          description: startup.description})
      user.save(function(){
        return res.redirect('/startups/'+startup.id)     
      })
    }
  })
}

/**
 * Find Startup by id
 */

exports.startup = function(req, res, next, id){

  Startup.load(id, function (err, startup) {
    if (err) return next(err)
    if (!startup) return next(new Error('Failed to load startup ' + id))
    req.strtProfile = startup
    next()
  })
}

/**
 *  Show Startup profile
 */

exports.show = function (req, res) {
  var startup = req.strtProfile
  
  User.findOne({ _id : startup.user.id }).exec(function (err, founder) {
    res.render('startups/profile', {
        title: startup.name,
        startup: startup,
        user: req.user,
        founder: founder
      })

  })
}

/**
 * Edit user info
 */

exports.editStartup = function (req, res) {
  
  var startup = req.strtProfile
  user = req.user,
  startup.name = req.body.name,
  startup.location = req.body.location,
  startup.tagline = req.body.tagline,
  startup.description = req.body.description,
  startup.website = req.body.website,
  startup.links.blog = req.body.blog,
  startup.links.facebook = req.body.facebook,
  startup.links.googleplus = req.body.googleplus,
  startup.links.twitter = req.body.twitter
  
  startup.save(function(){

  })
  
  User
    .update({'startups._id': startup.id}, {'$set': {
        'startups.$.name': startup.name,
        'startups.$.tagline': startup.tagline,
        'startups.$.website': startup.website,
        'startups.$.description': startup.description
        } 
      }, 
    function(err, response) {
      if(!err){
        var a = req.user.startups
        a.forEach(function(item, i){
          if(item._id === startup.id){
            a.splice(i,1)
          }
        })
      
    
        req.user.startups.push({_id:startup.id, 
                          name: startup.name,
                          tagline: startup.tagline,
                          website: startup.website,
                          description: startup.description})
      }
    })
 
  return res.redirect('/startups/'+startup.id)
}
exports.addMedia = function (req, res) {

  var startup = req.strtProfile
  startup.video = req.body.video
  startup.presentation = req.body.presentation
  if(startup.presentation !== ""){
    jsdom.env(
      startup.presentation,
      ["http://code.jquery.com/jquery.js"],
      function (errors, window) {
        var $ = window.$ 
        startup.presentation = $(".twitter_player").attr('value')

        if(startup.presentation === undefined){
          res.json({error:true})  
        }
        else{
        startup.save()
        res.json({presentation:startup.presentation, error:false})
        }
      }
    )
  }
  startup.save()
}
exports.destroyPress = function(req, res){
  var startup = req.strtProfile,
      array = startup.press

    for(var i = array.length - 1; i >= 0; i--) {
      if(array[i].id === req.body.id) {
         array.splice(i, 1);
      }
  }
  startup.press = array
  startup.save()

}
exports.addPress = function (req, res) {
  var startup = req.strtProfile
  startup.press.push({
    title: req.body.title,
    link: req.body.link
  })
  startup.save(function(err, startup){
    if(err)
      console.log(err)
     startup.press.forEach(function(item){
      if(item.title === req.body.title)
        res.json({action:startup.id, id:item.id})
     }) 
    
  })
}
exports.uploadStartupImage = function(req, res, next){
  var startup = req.strtProfile

  picsee.upload(req, res, function (err, results) {
      
      startup.logo = results
      var patt1 = /\.([0-9a-z]+)(?:[\?#]|$)/i
      var isSecure = (req.files.profPhoto.name).match(patt1)
      if(isSecure[1] === "png" || isSecure[1] === "jpg" || isSecure[1] === "jpeg" || isSecure[1] === "gif"){
        startup.save()

        res.json({responseText: results})  
      }
      else{
        res.json({responseText: 232})  
      }
      
      
    })
}
exports.cropStartupImage = function(req, res, next){
  var startup = req.strtProfile
  var original = req.body.original || false
  picsee.crop(req, res, function (err, results) {
    if (err) res.send(err)
    console.log(results)    
    var photos = {
      versions: results,
      original: picsee.getOriginal(original)
    }
    startup.logo = photos
    startup.save()
    res.json({responseText: photos})
  })
}

/**
 * List Startup
   #startups/?skip=1
 */

exports.listStartups = function(req, res){
  var skip = req.query.skip*4

  Startup.find({}, {}, { skip: skip, limit: 4 }, function(err, results) { 
      res.json({responseText: results })
  })
}

exports.renderStartups = function(req, res){
  Startup.find({}, {}, { skip: 0, limit: 8 }, function(err, results) { 
    res.render('startups/showall', {
        title: 'Startups',
        startups: results
      })    
  })
}


