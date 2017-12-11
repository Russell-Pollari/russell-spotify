import React from 'react';

import GenreChart from './GenreChart';
import ArtistList from './ArtistList';
import Loading from './Loading';

const Dashboard = ({ props }) => {
	if (props.loading) {
		return (
			<Loading />
		);
	}

	if (props.error) {
		return (
			<div>
				There was an error fetching the data..<br />
				{props.error}
			</div>
		);
	}
	return (
		<div className="dashboard">
			<div className="title">
				Click an a genre to hilight the associated artists.
			</div>
			<ArtistList {...props} />
			<GenreChart {...props} />
		</div>
	);
};

export default Dashboard;
