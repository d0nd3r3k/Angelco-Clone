
/*
 * Users Routes.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/arabangels');

var Subscriber = mongoose.model('subscribers',
		 { name: String,
		   email: String,
		   country: String,
		   haveInvested: String,
		   isInterested: String 
		  });


exports.subscribe = function(req, res){
   
   var data = { name: req.body.name,
   				email: req.body.email,
   				country: req.body.country };

   if(req.body.haveInvested !== undefined){
   		data.haveInvested = req.body.haveInvested;
   } else {
   		data.haveInvested = "false";
   }

   if(req.body.isInterested !== undefined){
   		data.isInterested = req.body.isInterested;
   } else {
   		data.isInterested = "false";
   }

   var subscribe = new Subscriber(data);
	
	Subscriber.findOneAndUpdate({email: data.email}, data, {upsert:true}, function(err){
		if(err){
			console.log(err);
		}
	});
   
   res.writeHead(200);
   res.end();
}