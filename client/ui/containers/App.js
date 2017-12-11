import React from 'react';
import R from 'ramda';

import { getToken } from '../../lib/getToken';
import { prepareGenreChartData } from  '../../lib/prepareGenreChartData';

import Header from '../components/Header';
import Dashboard from '../components/Dashboard';
import Login from '../components/Login';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			accessToken: getToken(),
			artists: [],
			genreData: null,
			loading: true,
			selectedGenre: null
		}
	}

	render() {
		if (this.state.accessToken) {
			Meteor.call('getTopItems', this.state.accessToken, (error, result) => {
				if (!error) {
					this.setState({
						artists: result,
						genreData: prepareGenreChartData(result),
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

		const props = R.mergeAll([{
			onGenreClick
		}, this.props, this.state]);

		const content = this.state.accessToken ?
			(<Dashboard props={props} />) : (<Login />);

		return (
			<div className="app-container">
				<Header />
				{content}
			</div>
		);
	};
};

export default App;
