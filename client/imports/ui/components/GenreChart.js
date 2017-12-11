import React from 'react';
import { HorizontalBar } from 'react-chartjs-2';

const GenreChart = ({ genreData, onGenreClick }) => {
	if (!genreData) {
		return null;
	}

	const options = {
		legend: {
			display: false
		}
	};

	return (
		<div className="chart-display">
			<div className="title">
				<strong>Your top genres</strong>
			</div>
			<HorizontalBar
				data={genreData}
				onElementsClick={onGenreClick}
				getElementAtEvent={onGenreClick}
				options={options}
				height={600}
			/>
		</div>
	);
};

export default GenreChart;
