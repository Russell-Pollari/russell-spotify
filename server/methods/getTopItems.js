import { spotifyWebApi } from '../imports/spotifyWebApi';

Meteor.methods({
	async getTopItems(access_token) {
		spotifyWebApi.setAccessToken(access_token);
		try {
			const result = await spotifyWebApi.getMyTopArtists({
				limit: 20
			});
			return result.body.items;
		} catch (error) {
			throw new Meteor.Error(error.type, error.message);
		}
	}
});
