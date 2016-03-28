var express = require('express');
var router = express.Router();
var apiai = require('apiai');
var ai = apiai('5e64f2e4bb5746bdbb3f6e2211a9eea2','a9bfe545-5d38-4f7f-984a-da990a851c0c');

//example of a response as parsed by bodyParser.
// { ToCountry: 'GB',
//   ToState: '',
//   SmsMessageSid: 'SM0a6d059d2502ed9f85fb5717c609fc8a',
//   NumMedia: '0',
//   ToCity: '',
//   FromZip: '',
//   SmsSid: 'SM0a6d059d2502ed9f85fb5717c609fc8a',
//   FromState: '',
//   SmsStatus: 'received',
//   FromCity: '',
//   Body: 'Testing 123',
//   FromCountry: 'GB',
//   To: '+447400206535',
//   ToZip: '',
//   NumSegments: '1',
//   MessageSid: 'SM0a6d059d2502ed9f85fb5717c609fc8a',
//   AccountSid: 'AC5cacfb37bc89359f119823a20bd0b4f7',
//   From: '+447909443804',
//   ApiVersion: '2010-04-01' }

router.get('/', function(req,res){
	res.json({
		'message': 'test json response'
	});
});

router.post('/', function(req,res){
	console.log(req.body);
	//res.status(200).render('twillio/sms.njk', { message: 'You said this to me: ' + req.body.Body });
	aiQuery = ai.textRequest(req.body.Body);

	aiQuery.on('response', function(response){
		res.render('twillio/sms.njk', { message: response.result.fulfillment.speech });
		// res.json({
		// 	'apiaiResponse': response.result.fulfillment.speech
		// });
	});

	aiQuery.on('error', function(error){
		res.json({
			'apiaiResponse': error
		});
	});

	aiQuery.end();
});

module.exports = router;
