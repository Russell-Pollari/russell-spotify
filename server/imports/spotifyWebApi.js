import SpotifyWebApi from 'spotify-web-api-node';

export const spotifyWebApi = new SpotifyWebApi({
	...Meteor.settings.private.spotify
});
