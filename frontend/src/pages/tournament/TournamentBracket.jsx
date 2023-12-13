import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function TournamentBracket() {
  const { tournamentid } = useParams();
  const [tournament, setTournament] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/tournament/${tournamentid}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setTournament(data);
      })
      .catch(error => {
        console.error('Error fetching tournament details:', error);
      });
  }, [tournamentid]);

  const renderMatches = () => {
    if (!tournament) return null;

    const { matchs, players } = tournament;

    const renderedMatches = matchs.map((match, index) => {
      const player1 = players.find(player => player.id === match.player1.id);
      const player2 = match.player2 ? players.find(player => player.id === match.player2.id) : null;
      const winner = match.winner ? players.find(player => player.id === match.winner.id) : null;

      const loser = winner ? (winner.id === match.player1.id ? player2 : player1) : null;

      const player1Style = {
        backgroundColor: winner && loser && winner.id !== match.player1.id ? 'lightgray' : 'white'
      };

      const player2Style = {
        backgroundColor: winner && loser && winner.id !== match.player2.id ? 'lightgray' : 'white'
      };

      const matchDisplay = (
        <div key={match.id} className="d-flex align-items-center mb-3">
          <div className="border rounded p-3 mr-3" style={player1Style}>
            <p>{player1.name}</p>
            {winner && loser && <p className={winner.id === match.player1.id ? '' : 'text-secondary'}>{loser.name}</p>}
          </div>
          {player2 && (
            <div className="border rounded p-3" style={player2Style}>
              <p>{player2.name}</p>
              {winner && loser && <p className={winner.id === match.player2.id ? '' : 'text-secondary'}>{loser.name}</p>}
            </div>
          )}
        </div>
      );

      return matchDisplay;
    });

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            {renderedMatches}
          </div>
        </div>
      </div>
    );
  };

  if (!tournament) {
    return <div>Invalid tournament</div>;
  }

  return (
    <div className="container-fluid">
      <h1>Tournament Details</h1>
      <p>Tournament Name: {tournament.name}</p>
      <div className="row">
        <div className="col">
          {renderMatches()}
        </div>
      </div>
    </div>
  );
}

export default TournamentBracket;