
/*!
 * Module dependencies.
 */

var async = require('async')

/**
 * Controllers
 */

var users = require('../app/controllers/users'),
    startups = require('../app/controllers/startups'),   
    auth = require('./middlewares/authorization')


module.exports = function (app, passport) {

  // user routes
  app.get('/login', users.login)
  app.get('/signup', users.signup)
  app.get('/join', users.join)
  app.get('/logout', users.logout)
  app.post('/users', users.create)

  app.post('/users/session',
    passport.authenticate('local', {
      failureRedirect: '/login',
      failureFlash: 'Invalid email or password.'
    }), users.session)
  app.post('/users/type', auth.requiresLogin, users.setType)
  app.post('/users/edit', auth.requiresLogin, users.editUser)
  
  app.get('/users/:userId',auth.requiresLogin, users.show)
  app.get('/auth/facebook', passport.authenticate('facebook', { scope: [ 'email', 'user_about_me'], failureRedirect: '/login' }), users.signin)
  app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), users.authCallback)
  app.get('/auth/linkedin', passport.authenticate('linkedin', { failureRedirect: '/login' }), users.signin)
  app.get('/auth/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/login' }), users.authCallback)
  app.get('/auth/google',passport.authenticate('google', {failureRedirect: '/login',scope: ['https://www.googleapis.com/auth/userinfo.profile','https://www.googleapis.com/auth/userinfo.email']}), users.signin)
  app.get('/auth/google/callback',passport.authenticate('google', {failureRedirect: '/login'}), users.authCallback)
  app.get('/users/all/:type', users.renderAll)
  app.post('/users/upload/:userId', auth.requiresLogin, users.uploadUserImage)
  app.post('/users/crop/:userId', auth.requiresLogin, users.cropUserImage)
  //app.get('/users/all/:type/:skip', users.listAll)

  app.param('userId', users.user)

  // Startups Routes
  app.get('/startups/all', startups.renderStartups)
  app.post('/startups/create', auth.requiresLogin, startups.create)
  app.get('/startups/:startupId', auth.requiresLogin, startups.show)
  app.post('/startups/media/:startupId', auth.requiresLogin, startups.addMedia)
  app.post('/startups/edit/:startupId', auth.requiresLogin, startups.editStartup)
  app.post('/startups/press/:startupId', auth.requiresLogin, startups.addPress)
  app.post('/startups/press/del/:startupId', auth.requiresLogin, startups.destroyPress)
  app.post('/startups/upload/:startupId', auth.requiresLogin, startups.uploadStartupImage)
  app.post('/startups/crop/:startupId', auth.requiresLogin, startups.cropStartupImage)
  app.get('/startups', startups.listStartups) 


  //app.put('/startups/:id', auth.requiresLogin, startups.update)
  //app.del('/startups/:id', auth.requiresLogin, startups.destroy)
  app.param('startupId', startups.startup)
  // home route
  app.get('/search/all', users.search)
  app.post('/find', users.searchResults)
  app.get('/', users.index)

}
