import React from 'react';

import Tournament from './Tournament';
import TournamentList from './TournamentList';
import TournamentLocal from './TournamentLocal';

function TournamentPage() {
  return (
    <div className="tournament-page">
		<div className="container-fluid">
      		<div className="row">
      			<h1>Page des tournois</h1>
	  			<Tournament /> {}
        		<TournamentList /> {}
				<TournamentLocal /> {}
			</div>
		</div>
    </div>
  );
}

export default TournamentPage;