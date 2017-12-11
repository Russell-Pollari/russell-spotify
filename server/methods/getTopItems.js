import { spotifyWebApi } from '../imports/api/spotifyWebApi';

Meteor.methods({
	async getTopItems(access_token) {
		spotifyWebApi.setAccessToken(access_token);
		try {
			const result = await spotifyWebApi.getMyTopArtists({
				limit: 20
			});
			return result.body.items;
		} catch (error) {
			console.log(error);
			throw new Meteor.Error(error.type, error.message);
		}
	}
});
