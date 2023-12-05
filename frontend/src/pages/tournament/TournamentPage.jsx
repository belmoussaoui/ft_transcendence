import React from 'react';
import Tournament from './Tournament';
import TournamentList from './TournamentList';
import TournamentLocal from './TournamentLocal';

function TournamentPage() {
  return (
    <div className="tournament-page">
      <h1>Page des tournois</h1>
      <div className="tournament-section">
        <Tournament /> {}
        <TournamentList /> {}
		<TournamentLocal /> {}
      </div>
    </div>
  );
}

export default TournamentPage;