import { spotifyWebApi } from '../spotifyWebApi'

Meteor.methods({
	async getTopItems(access_token, time_range) {
		spotifyWebApi.setAccessToken(access_token);
		try {
			const result = await spotifyWebApi.getMyTopArtists({ time_range, limit: 20 });
			return result.body.items;
		} catch (error) {
			throw new Meteor.Error('error', error.message);
		}
	}
});
