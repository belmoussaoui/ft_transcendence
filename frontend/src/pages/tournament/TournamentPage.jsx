import React from 'react';

import Tournament from './Tournament';
import TournamentList from './TournamentList';
import TournamentLocal from './TournamentLocal';

function TournamentPage() {
  return (
    <div className="tournament-page">
      <h1>Page des tournois</h1>
	  	<Tournament /> {}
        <TournamentList /> {}
		<TournamentLocal /> {}
    </div>
  );
}

export default TournamentPage;