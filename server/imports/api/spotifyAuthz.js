import express from 'express';
import request from 'request';
import querystring from 'querystring';
import cookieParser from 'cookie-parser';

import { spotifyWebApi } from './spotifyWebApi';

var app = express();

app.use(express.static(__dirname + '/public'))
	 .use(cookieParser());

app.get('/login', function(req, res) {
	const state = 'spotify_auth_state';
	const scopes = [
		'user-read-private',
		'user-library-read',
		'user-top-read'
	];
	const url = spotifyWebApi.createAuthorizeURL(scopes, state);
	res.redirect(url);
});

app.get('/callback', function(req, res) {
	const code = req.query.code || null;

	spotifyWebApi.authorizationCodeGrant(code)
		.then(data => {
			return data.body.access_token;
		})
		.then(access_token => {
			res.redirect('/#' +
				querystring.stringify({
					access_token
				}));
		})
		.catch(err => {
			console.log(err);
			res.redirect('/#' +
				querystring.stringify({
					error: 'invalid_token'
				}));
		});
})

WebApp.connectHandlers.use(app);
