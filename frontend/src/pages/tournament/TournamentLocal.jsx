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
    // Logique pour démarrer le tournoi avec le nombre de joueurs et les noms des joueurs
    console.log('Démarrer le tournoi avec', numberOfPlayers, 'joueurs', playerNames);
  };

  return (
    <div className="container-fluid">
      <div className="row">
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
        {/* Ajouter d'autres composants ou sections si nécessaire */}
      </div>
    </div>
  );
}

export default TournamentLocal;