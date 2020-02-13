const qs = require('querystring');
const request = require('request');

let username = 'vt000';
let password = 'passowrd';
let user_id = 'get from web';
let delayMinMinute = 0.1;
let delayMaxMinute = 0.2;

function checkin(token) {
	const checkin_url = "https://femascloud.com/vizuro/users/clock_listing";

	const requestBody = {
	  'data[ClockRecord][user_id]': user_id,
	  'data[AttRecord][user_id]': user_id,
	  'data[ClockRecord][shift_id]': '2',
	  'data[ClockRecord][period]': '1',
	  'data[ClockRecord][clock_type]': 'S',
	  'data[ClockRecord][latitude]': '',
	  'data[ClockRecord][longitude]': ''
	};

	let payload = qs.stringify(requestBody);

	let cookies = `femasUid=${username};`;
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
	  'data[Account][username]': username,
	  'data[Account][passwd]': password,
	  'data[remember]': '0'
	};

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

// random time
const delay = function(r,s){
  s = s * 1000;
  return new Promise(function(resolve,reject){
    setTimeout(function(){
      r();
      resolve(s);
    },s);
  });
};

function getRandomMinute(min,max){
  let minMinute = min * 60;
  let maxMinute = max * 60;
  return Math.floor(Math.random()*(maxMinute-minMinute+1))+minMinute;
}

let delayTime = getRandomMinute(delayMinMinute, delayMaxMinute);
console.log("delayTime:", delayTime);

delay(login, delayTime);
