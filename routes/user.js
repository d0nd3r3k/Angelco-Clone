
/*
 * Users Routes.
 */

exports.subscribe = function(req, res){
   console.log(req.body.name);
   console.log(req.body.email);
   console.log(req.body.country);

   if(req.body.haveInvested !== undefined){
   		console.log(req.body.haveInvested);
   }

   if(req.body.isInterested !== undefined){
   		console.log(req.body.isInterested);
   }
   res.writeHead(200);
   res.end();
}