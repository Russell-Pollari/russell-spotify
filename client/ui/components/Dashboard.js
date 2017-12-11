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
	return (
		<div className="dashboard">
			<ArtistList {...props} />
			<GenreChart {...props} />
		</div>
	);
};

export default Dashboard;
