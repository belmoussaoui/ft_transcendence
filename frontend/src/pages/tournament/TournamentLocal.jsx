import React, { useState } from 'react';
import Block from "../../components/block/Block";
import Button from "../../components/button/Button";

function TournamentLocal() {
  const [numberOfPlayers, setNumberOfPlayers] = useState(2);
  const [playerNames, setPlayerNames] = useState(Array(numberOfPlayers).fill(''));

  const handlePlayerNameChange = (index, newName) => {
    const updatedPlayers = [...playerNames];
    updatedPlayers[index] = newName;
    setPlayerNames(updatedPlayers);
  };

  const handleStartTournament = () => {
    console.log('Démarrer le tournoi avec', numberOfPlayers, 'joueurs', playerNames);
  };

  return (
    <Block title="Local Tournament Setup">
        <div className="text-center">
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