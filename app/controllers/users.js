
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , User = mongoose.model('User')
  , verificationTokenModel = mongoose.model('VerificationToken')
  , Startup = mongoose.model('Startup')
  , utils = require('../../lib/utils')
  , async = require('async')
  , picsee = require('picsee')
  , mailer = require('../mailer/config') 

exports.index = function (req, res){
  res.render('index', {
    title: 'Welcome to Arab Angels'
  })

}

var login = function (req, res) {
  if (req.session.returnTo) {
    res.redirect(req.session.returnTo)
    delete req.session.returnTo
    return
  }
  res.statusCode = 307
  res.redirect('/users/'+req.user.id)
}

exports.signin = function (req, res) {}


/**
 * Auth callback
 */

exports.authCallback = login

/**
 * Show login form
 */

exports.login = function (req, res) {
  res.render('users/login', {
    title: 'Login',
    message: req.flash('error')
  })
}

/**
 * Show sign up form
 */

exports.signup = function (req, res) {
  res.render('users/signup', {
    title: 'Sign up',
    user: new User()
  })
}

/**
 * Show Join
 */

exports.join = function (req, res) {
  res.render('users/join', {
    title: 'Join'
  })
}

/**
 * Logout
 */

exports.logout = function (req, res) {
  req.logout()
  res.statusCode = 307;
  res.redirect('/login')
}

/**
 * Session
 */

exports.session = login

/**
 * Create user
 */

exports.create = function (req, res) {
  var user = new User(req.body)
  user.provider = 'local'

  user.save(function (err) {
    if (err) {
      return res.render('users/signup', {
        errors: utils.errors(err.errors),
        user: user,
        title: 'Sign up'
      })
    }

    // manually login the user once successfully signed up
    req.logIn(user, function(err) {
      if (err) return next(err)
      res.statusCode = 307;
      return res.redirect('/users/'+req.user.id)
    })
  })
}
/**
 *  Show profile
 */

exports.show = function (req, res) {
  var user = req.profile,
      startups = []
  async.eachSeries(user.startups,function(startup, callback){
    Startup.findOne({ _id : startup._id }).exec(function (err, startup) {
      startups.push(startup)
      callback(null, startup)
    })
  }, function(err){
      res.statusCode = 307
      res.render('users/profile', {
        title: user.name,
        user: user,
        startups: startups
    })
  })

}

/**
 * Find user by id
 */

exports.user = function (req, res, next, id) {
  User.findOne({ _id : id }).exec(function (err, user) {
      if (err) return next(err)
      if (!user) return next(new Error('Failed to load User ' + id))
      res.statusCode = 307
      req.profile = user
      next()
    })
}


/**
 * Add Type
 */

exports.setType = function (req, res) {
  var user = req.user
  var verificationToken = new verificationTokenModel({_userId: user._id});
  verificationToken.createVerificationToken(function (err, token) {
    var verificationUrl = req.protocol + "://" + req.get('host') + "/verify/" + token
    if (err) return console.log("Couldn't create verification token", err);
    user.type = req.body.type
    user.save(function(){
      mailer.send('welcome', user, "Welcome to Arab Angels", user.email, verificationUrl)
      res.statusCode = 307
      return res.redirect('/users/'+req.user.id)
    })
  })
}


/**
 * Edit user info
 */

exports.editUser = function (req, res) {
  
  var user = req.user
  user.name = req.body.name
  user.username = req.body.username
  user.location = req.body.location
  user.miniresume = req.body.miniresume
  user.links.website = req.body.website
  user.links.blog = req.body.blog
  user.links.facebook = req.body.facebook
  user.links.googleplus = req.body.googleplus
  user.links.twitter = req.body.twitter
  user.links.linkedin = req.body.linkedin
  user.links.dribbble = req.body.dribbble
  user.links.github = req.body.github
  user.links.behance = req.body.behance

  user.save(function(err){
    if(err) next(err)
      res.writeHead(200)
      return res.end()
  })
  
}

/**
 * Show All Users
 */
exports.listAll = function(req, res){
  var skip = req.params.skip*4,
      type = req.params.type
      if(type === "entrepreneurs"){
          type = 'Entrepreneur'
      }
      else{
          type = 'Angel Investor' 
      }
      
      User.find({'type':type}, {}, { skip: skip, limit: 4 }, function(err, results) { 
      
      res.json({responseText: results })
  })
}

exports.renderAll = function(req, res){
  var type = req.params.type 
  if(type === "entrepreneurs"){
    type = 'Entrepreneur'
  }
  else{
    type = 'Angel Investor' 
  }
  User.find({'type':type}, {}, { skip: 0, limit: 100 }, function(err, results) { 
    
    res.render('users/showall', {
        title: type,
        users: results
      })    
  })
}

exports.uploadUserImage = function(req, res, next){
  var user = req.user

  picsee.upload(req, res, function (err, results) {
      
      user.photo = results
      var patt1 = /\.([0-9a-z]+)(?:[\?#]|$)/i
      var isSecure = (req.files.profPhoto.name).match(patt1)
      if(isSecure[1] === "png" || isSecure[1] === "jpg" || isSecure[1] === "jpeg" || isSecure[1] === "gif"){
        
        res.json({responseText: results})  
        
      }
      else{
        res.json({responseText: 232})  
      }
      
      
    })
}
exports.cropUserImage = function(req, res, next){
  var user = req.user
  var original = req.body.original || false
  picsee.crop(req, res, function (err, results) {
    if (err) res.send(err)
    var photos = {
      versions: results,
      original: picsee.getOriginal(original)
    }
    user.photo = photos
    user.save()
    res.json({responseText: photos})
  })
}

/**
 * Search All Users
 */
exports.search = function(req, res){
      
      User.find({}, 'name type', {}, function(err, results) { 
      
      res.statusCode = 200
      res.json(results)
  })
}

/**
 * Search All Users
 */
exports.searchResults = function(req, res, next){
      
      var name = req.body.name

      User.find({ "name" : { $regex : new RegExp(name, "i") } }, 'id', {limit: 1}, function(err, user) {
        
        if (err) return next(err)
      
        if (0 === user.length) return next(err)

        else {
          res.statusCode = 307
          res.redirect('/users/'+user[0]._id)
        } 
  })
}

/**
 * Add Investment
 */

exports.addInvestment = function(req, res){
      var user = req.user ,
          startupName = req.body.startupName
                              
      Startup.find({ "name" : { $regex : new RegExp(startupName, "i") } }, 'id name', {limit: 1}, function(err, startup) {
        if (err) return next(err)
      
        if (0 === startup.length){
          user.investments.push({_id:'0', 
                          name: startupName,
                          amount: req.body.amount,
                          comments: req.body.comments})
          user.save()
          res.statusCode = 200
          res.json({responseText: '0'})
        }  

        else {
          user.investments.push({_id:startup[0].id, 
                          name: startup[0].name,
                          amount: req.body.amount,
                          comments: req.body.comments})
          user.save()
          res.statusCode = 200
          res.json({responseText: startup[0].id})
        } 
  })
}

/**
 * Is Interested
 */

exports.isInterested = function(req, res){

      var user = req.user
      user.startupName = req.body.startupName
      user.startupId = req.body.startupId
      user.founderId = req.body.founderId
      user.founderName = req.body.founderName
      user.founderEmail = req.body.founderEmail
      user.message = req.body.mailMessage
          
      mailer.send('interested', user, "An Angel Investor is interested in your startup!", user.founderEmail)
      res.writeHead(200)
      return res.end()
}

/**
 * Users Settings
 */

exports.settings = function(req, res){
  var user = req.user
  console.log(user)
      res.statusCode = 307
      res.render('users/settings', {
        title: user.name,
        user: user
    })
}

/**
 * Users Email Verification 
 */
exports.verify = function(req, res) {
    var token = req.params.token
    verificationTokenModel.findOne({token: token}, function (err, doc){
        User.findOne({_id: doc._userId}, function (err, user) {
            user.verified = true
            user.save(function(err) {
              res.statusCode = 307
              res.redirect('/users/'+user.id)
            })
        })
    })
}





