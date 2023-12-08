import React, { useState } from 'react';
import Block from "../../components/block/Block";
import Button from "../../components/button/Button";

function TournamentLocal() {
  const [numberOfPlayers, setNumberOfPlayers] = useState(2);
  const [tournamentName, setTournamentName] = useState('');
  const [playerNames, setPlayerNames] = useState(Array(numberOfPlayers).fill(''));

  const handlePlayerNameChange = (index, newName) => {
    const updatedPlayers = [...playerNames];
    updatedPlayers[index] = newName;
    setPlayerNames(updatedPlayers);
  };

  const handleStartTournament = async () => {
    try {
      const response = await fetch('http://localhost:8080/tournament/create_local_tournament/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: tournamentName,
          numberOfPlayers: numberOfPlayers,
          playerNames: playerNames.filter(name => name.trim() !== '')
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Tournoi créé avec succès:', data);
      } else {
        throw new Error('Erreur lors de la création du tournoi');
      }
    } catch (error) {
      console.error('Erreur lors de la création du tournoi:', error);
    }
  };

  return (
      <Block title="Local Tournament Setup">
          <div className="text-center">
            <label>Tournament Name:
              <input
                type="text"
                placeholder="Enter tournament name"
                value={tournamentName}
                onChange={(e) => setTournamentName(e.target.value)}
              />
            </label>
            <label>Number of Players:
              <input
                type="number"
                min={2}
                max={8}
                value={numberOfPlayers}
                onChange={(e) => setNumberOfPlayers(e.target.value)}
              />
            </label>
            {Array.from({ length: numberOfPlayers }).map((_, index) => (
              <input
                key={index}
                type="text"
                placeholder={`Player ${index + 1} name`}
                value={playerNames[index]}
                onChange={(e) => handlePlayerNameChange(index, e.target.value)}
              />
            ))}
            <Button onClick={handleStartTournament}>Start Tournament</Button>
          </div>
        </Block>
  );
}

export default TournamentLocal;