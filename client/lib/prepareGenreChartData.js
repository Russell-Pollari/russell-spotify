export const prepareGenreChartData = artists => {
	const genres = R.reduce((genreList, artist) => (
		R.concat(R.propOr([], 'genres', artist), genreList)
	), [], artists);
	const genrePairs = R.sortBy(R.compose(R.negate, R.prop(1)), R.toPairs(R.countBy(R.toLower, genres))).slice(0, 20);
	const labels = R.map(genrePair => genrePair[0], genrePairs);
	const data = R.map(genrePair => genrePair[1], genrePairs);
	return {
		labels,
		datasets: [
			{
				label: 'Genre frequency',
				backgroundColor: 'blue',
				data
			}
		]
	};
};
