import { useEffect, useState } from "react";
import Block from "../../components/block/Block"

function Play() {
    const gameSocket = new WebSocket('ws://localhost:8080/ws/game/');

    
    useEffect(() => {
        gameSocket.onopen = () => {
            console.log("WebSocket Client Connected");
        };
        gameSocket.onmessage = function(e) {
            const data = JSON.parse(e.data);
            console.log(data);
        };
    }, []);
    
    return (
        <div className="container-fluid">
            <div className="row">
                <Block title="Play Match">
                </Block>
            </div>
        </div>
    )
}

export default Play