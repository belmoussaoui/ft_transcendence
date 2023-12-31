import React, { useEffect, useState } from 'react';
import Block from "../../components/block/Block";

function TournamentList() {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/tournament/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setTournaments(data);
      })
      .catch(error => {
        console.error('Error fetching tournaments:', error);
      });
  }, []);

  return (
    <Block title="Tournament List">
        <div className="text-center">
        	<ul style={{ maxHeight: '175px', overflowY: 'auto' }}>
            	{tournaments.map(tournament => (
            		<li key={tournament.id}>
					{tournament.name} - {tournament.players.length}/8 {' '}
					{tournament.online ? 'online' : 'local'}
				</li>
            	))}
        	</ul>
        </div>
    </Block>
  );
}

export default TournamentList;
