import React from 'react';

import { getToken } from '../lib/getToken';
import { prepareGenreChartData } from  '../lib/prepareGenreChartData';

import Header from '../ui/components/Header';
import Dashboard from '../ui/components/Dashboard';
import Login from '../ui/components/Login';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			accessToken: getToken(),
			artists: [],
			genreData: null,
			loading: true,
			selectedGenre: null,
			error: null
		}
	}

	componentDidMount() {
		if (this.state.accessToken) {
			Meteor.call('getTopItems', this.state.accessToken, (error, result) => {
				if (error) {
					this.setState({
						error: error.reason,
						loading: false
					});
				} else {
					this.setState({
						artists: result,
						genreData: prepareGenreChartData(result),
						loading: false
					});
				}
			});
		}
	}

	render() {
		const onGenreClick = e => {
			this.setState({
				selectedGenre: e[0]._view.label
			});
		};

		const props = R.mergeAll([{
			onGenreClick
		}, this.props, this.state]);

		const content = this.state.accessToken ?
			(<Dashboard props={props} />) :
			(<Login />);

		return (
			<div className="app-container">
				<Header />
				{content}
			</div>
		);
	};
};

export default App;
