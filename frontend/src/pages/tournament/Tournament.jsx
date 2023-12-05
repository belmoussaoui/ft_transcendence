import React, { useState } from 'react';
import Block from "../../components/block/Block";
import Button from "../../components/button/Button";

function Tournament() {
    const url = "http://localhost:8080/tournament/create_tournament/";
    const [lobbyName, setLobbyName] = useState('');
    const [createdLobby, setCreatedLobby] = useState(null);

    const handleCreateLobby = async () => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: lobbyName }),
            });

            if (response.ok) {
                const data = await response.json();
                setCreatedLobby(data);
            } else {
                throw new Error('Erreur lors de la création du lobby');
            }
        } catch (error) {
            console.error('Erreur lors de la création du lobby :', error);
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <Block title="Create Tournament Lobby">
                    <div className="text-center">
                        <input
                            type="text"
                            placeholder="Nom du lobby"
                            value={lobbyName}
                            onChange={(e) => setLobbyName(e.target.value)}
                        />
                        <Button onClick={handleCreateLobby}>Créer le lobby</Button>
                        {createdLobby && (
                            <p className="mt-3">Lobby créé : {createdLobby.name}</p>
                        )}
                    </div>
                </Block>
            </div>
        </div>
    )
}

export default Tournament;
