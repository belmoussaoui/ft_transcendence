import json
import asyncio
from channels.generic.websocket import AsyncWebsocketConsumer
from .game import Game

class GameConsumer(AsyncWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        self.game = Game()
        super().__init__(*args, **kwargs)
    
    async def connect(self):
        await self.accept()
        self.game_loop_task = asyncio.create_task(self.game_loop())

    async def disconnect(self, close_code):
        self.game_loop_task.cancel()

    async def receive(self, text_data):
        response = json.loads(text_data)
        event1 = response.get("p1", None)
        event2 = response.get("p2", None)
        if event1 == 'up':
            self.game.paddle1.y += 0.3
        if event1 == 'down':
            self.game.paddle1.y -= 0.3
        if event2 == 'up':
            self.game.paddle2.y += 0.3
        if event2 == 'down':
            self.game.paddle2.y -= 0.3
        self.game.paddle1.y = max(-10.5, min(self.game.paddle1.y, 10.5))
        self.game.paddle2.y = max(-10.5, min(self.game.paddle2.y, 10.5))


    async def game_loop(self):
        while True:
            self.game.update()
            state = {
                'pos1' : self.game.paddle1.y,
                'pos2' : self.game.paddle2.y,
                'score' : self.game.score,
                'ball': {
                    'x': self.game.ball.x,
                    'y': self.game.ball.y
                }
            }
            await self.send(text_data=json.dumps(state))
            await asyncio.sleep(1/60)
            if self.game.score[0] == 3 or self.game.score[1] == 3:
                await self.close()
