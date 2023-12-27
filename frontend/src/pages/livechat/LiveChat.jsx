import React, { useState, useEffect } from 'react';

function LiveChat() {
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [ws, setWs] = useState(null);

    useEffect(() => {
        const websocket = new WebSocket('ws://localhost:8080/ws/chat/');
        websocket.onopen = () => console.log('WebSocket Connected');
        websocket.onmessage = (event) => {
            // Gérer ici la réception d'un message
            console.log('Message reçu:', event.data);
        };
        websocket.onclose = () => console.log('WebSocket Disconnected');

        setWs(websocket);

        return () => {
            websocket.close();
        };
    }, []);

    async function sendMessage() {
        if (!message.trim()) {
            setError('Le message ne peut pas être vide.');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            // Envoyer le message via WebSocket
            ws.send(JSON.stringify({
                sender: 'ID_SENDER',
                receiver: 'ID_RECEIVER',
                message_content: message,
            }));

            setMessage('');
        } catch (error) {
            setError('Erreur lors de l\'envoi du message : ' + error.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage} disabled={!ws || isLoading}>Envoyer</button>
            {error && <div>Erreur : {error}</div>}
            {isLoading && <div>Envoi en cours...</div>}
        </div>
    );
}

export default LiveChat;
