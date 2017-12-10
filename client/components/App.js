import React from 'react';
import R from 'ramda';

import GenreChart from './GenreChart';

const getToken = () => {
	var hashParams = {};
	var e, r = /([^&;=]+)=?([^&;]*)/g,
			q = window.location.hash.substring(1);
	while ( e = r.exec(q)) {
		 hashParams[e[1]] = decodeURIComponent(e[2]);
	}
	return hashParams.access_token;
};

const prepareGenrePlotData = artists => {
	const genres = R.reduce((genreList, artist) => (
		R.concat(R.propOr([], 'genres', artist), genreList)
	), [], artists);
	const genrePairs = R.sortBy(R.compose(R.negate, R.prop(1)), R.toPairs(R.countBy(R.toLower, genres)));
	const labels = R.map(genrePair => genrePair[0], genrePairs);
	const data = R.map(genrePair => genrePair[1], genrePairs);
	return {
		labels,
		datasets: [
			{
				label: 'Genre frequency',
				data
			}
		]
	};
};

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			access_token: getToken(),
			top_items: [],
			time_range: 'long_term',
			genreData: null,
			loading: true,
			selectedGenre: null
		}
	}

	render() {
		if (this.state.access_token) {
			Meteor.call('getTopItems', this.state.access_token, this.state.time_range, (error, result) => {
				if (!error) {
					this.setState({
						top_items: result,
						genreData: prepareGenrePlotData(result),
						loading: false
					});
				}
			});
		}

		const onGenreClick = e => {
			this.setState({
				selectedGenre: e[0]._view.label
			})
		};

		const items = this.state.top_items.map((item, index) => {
			const selectedClass = R.contains(this.state.selectedGenre, item.genres) ?
				'selected': null;
			return (
				<div key={index} className={selectedClass}>
					{item.name}
				</div>
			);
		});

		if (!this.state.access_token) {
			return (
				<div>
					<a href='/login'>
						login
					</a>
				</div>
			);
		} else if (this.state.loading) {
			return (
				<div>
					fetching spotify data..
				</div>
			);
		} else {
			return (
				<div>
					<div className="artist-list">
						<strong>Your top artists</strong>
						{items}
					</div>
					<div>
						<GenreChart {...this.state} onClick={onGenreClick} />
					</div>
				</div>
			);
		}
	};
};

export default App;
