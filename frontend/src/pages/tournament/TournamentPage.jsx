import React from 'react';
import Tournament from './Tournament'; // Importe ton composant Tournament
import TournamentList from './TournamentList'; // Importe ton composant TournamentList

function TournamentPage() {
  return (
    <div>
      <h1>Page des tournois</h1>
      <div className="tournament-section">
        <Tournament /> {/* Affiche le composant pour créer un lobby */}
        <TournamentList /> {/* Affiche le composant pour la liste des tournois */}
      </div>
    </div>
  );
}

export default TournamentPage;
