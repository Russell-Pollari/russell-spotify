import React from 'react';
import R from 'ramda';

const ArtistList = ({ artists=[], selectedGenre }) => {
	const items = artists.map((artist, index) => {
		const selectedClass = R.contains(selectedGenre, artist.genres) ? 'selected': null;
		return (
			<div key={index} className={selectedClass}>
				{artist.name}
			</div>
		);
	});

	return (
		<div className="artist-list">
			<div className="title">
				<strong>Your top artists</strong>
			</div>
			{items}
		</div>
	);
};

export default ArtistList;
