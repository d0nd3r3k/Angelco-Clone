var path = require('path')
  , rootPath = path.normalize(__dirname + '/..')
  , publicPath = path.normalize(__dirname + '/../public')
  , templatePath = path.normalize(__dirname + '/../app/mailer/templates')
  , notifier = {
      service: 'postmark',
      APN: false,
      email: false, // true
      actions: ['comment'],
      tplPath: templatePath,
      key: 'POSTMARK_KEY',
      parseAppId: 'PARSE_APP_ID',
      parseApiKey: 'PARSE_MASTER_KEY'
    }

module.exports = {
  development: {
      db: 'mongodb://localhost/arabangels',
      root: rootPath,
      app: {
        name: 'Arab Angels Development'
      },
      facebook: {
        clientID: "524774497588217",
        clientSecret: "c47ad9f3e7760c84290390fd4dee91a1",
        callbackURL: "http://localhost:3000/auth/facebook/callback"
      },
      linkedin: {
        clientID: "pnimy9ii8c71",
        clientSecret: "bbbepMWdiwfxmHsH",
        callbackURL: "http://localhost:3000/auth/linkedin/callback"
      },
      google: {
        clientID: "1080594122218.apps.googleusercontent.com",
        clientSecret: "j8GgT-U4f7Ikmh1VsD3UbQIm",
        callbackURL: "http://localhost:3000/auth/google/callback"
      },
      imageUpload: {
        docRoot: publicPath,
        urlRoot: 'http://localhost:3000/',
        stagingDir: publicPath + '/uploads/staging/',
        processDir: '/uploads/processing/',
        uploadDir: '/uploads/uploaded/',
        originalDir: '/uploads/original/',
        versions: [{
            "thmb": {
              w: 32,
              h: 32
            }
          }, 
          {
            "profile": {
              w: 200,
              h: null
            }
          }, 
          {
            "full": {
              w: null,
              h: null
            }
          }
        ],
        separator: '_',
        directories: 'single',
        namingConvention: 'date',
        inputFields: ['profPhoto', 'other']
      }
  },
  production: {
      db: 'mongodb://localhost/arabangels',
      root: rootPath,
      app: {
        name: 'Arab Angels Staging'
      },
      facebook: {
        clientID: "450548758385490",
        clientSecret: "a671bf0ff7d5c39a67d8880fbf7203ed",
        callbackURL: "http://www.arabangels.org/auth/facebook/callback"
      },
      linkedin: {
        clientID: "u6py7cj74lo8",
        clientSecret: "ZNtCiXhtSLyFgO4x",
        callbackURL: "http://www.arabangels.org/auth/linkedin/callback"
      },
      google: {
        clientID: "470960532965.apps.googleusercontent.com",
        clientSecret: "cKjIVopvoQsIKb_4mPvlK2xo",
        callbackURL: "http://www.arabangels.org/auth/google/callback"
      },
      imageUpload: {
        docRoot: publicPath,
        urlRoot: 'http://www.arabangels.org/',
        stagingDir: publicPath + '/uploads/staging/',
        processDir: '/uploads/processing/',
        uploadDir: '/uploads/uploaded/',
        originalDir: '/uploads/original/',
        versions: [{
            "thmb": {
              w: 32,
              h: 32
            }
          }, 
          {
            "profile": {
              w: 200,
              h: null
            }
          }, 
          {
            "full": {
              w: null,
              h: null
            }
          }
        ],
        separator: '_',
        directories: 'single',
        namingConvention: 'date',
        inputFields: ['profPhoto', 'other']
      }
  }
}
