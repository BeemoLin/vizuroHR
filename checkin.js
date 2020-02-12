const qs = require('querystring');
const request = require('request');

function checkin(token) {
	const checkin_url = "https://femascloud.com/vizuro/users/clock_listing";

	const requestBody = {
	  'data[ClockRecord][user_id]': '7',
	  'data[AttRecord][user_id]': '7',
	  'data[ClockRecord][shift_id]': '2',
	  'data[ClockRecord][period]': '1',
	  'data[ClockRecord][clock_type]': 'S',
	  'data[ClockRecord][latitude]': '',
	  'data[ClockRecord][longitude]': ''
	}

	let payload = qs.stringify(requestBody);

	let cookies = "femasUid=vt006;";
	cookies+= `vizuro=${token};`;
	cookies+= "setTopMenu=;";
	cookies+= "menuItem=4;";
	cookies+= "menuBlock=;";
	cookies+= "lifeTimePointvizuro=1581493240;";
	cookies+= "femasRem=1"

	request.post({
		headers: {
			'content-type' : 'application/x-www-form-urlencoded',
			'Cookie': cookies
		},
		url:     checkin_url,
		body:    payload
	}, function(error, response, body){
		console.log(body);
	});
}

function login() {

	const login_url = "https://femascloud.com/vizuro/Accounts/login";

	const requestBody = {
	  'data[Account][username]': 'vt006',
	  'data[Account][passwd]': 'Oo454053',
	  'data[remember]': '0'
	}

	let payload = qs.stringify(requestBody);

	request.post({
		headers: {'content-type' : 'application/x-www-form-urlencoded'},
		url:     login_url,
		body:    payload
	}, function(error, response, body){
		console.log(body);
		let token = `${response.headers["set-cookie"]}`;
		token = token.split(";")[0].split("=")[1]
		console.log(token);

		checkin(token);
	});
}


login();