import React from 'react';
import { HorizontalBar } from 'react-chartjs-2';

const GenreChart = ({ genreData, onClick }) => {
	if (!genreData) {
		return null;
	}
	return (
		<div className="chart-display">
			<HorizontalBar
				data={genreData}
				height={500}
				onElementsClick={onClick}
			/>
		</div>
	);
};

export default GenreChart;
