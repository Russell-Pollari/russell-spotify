export const prepareGenreChartData = artists => {

	const genreList = R.reduce((genreList, artist) => (
		R.concat(R.propOr([], 'genres', artist), genreList)
	), [], artists);

	const genrePairs = R.pipe(
		R.countBy(R.toLower),
		R.toPairs,
		R.sortBy(R.pipe(R.prop(1), R.negate)),
	)(genreList).slice(0, 20); // [['genre', frequency]]

	// data formatted for chart-js
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
