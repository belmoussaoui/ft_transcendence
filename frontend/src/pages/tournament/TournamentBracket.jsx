import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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

  if (!tournament) {
    return <div>Invalid tournament</div>;
  }

  return (
    <div>
      <h1>Tournament Details</h1>
      <p>Tournament Name: {tournament.name}</p>
      {}
    </div>
  );
}

export default TournamentBracket;
