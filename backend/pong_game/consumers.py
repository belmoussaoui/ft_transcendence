import json
import asyncio
from channels.generic.websocket import AsyncWebsocketConsumer
from .game import Paddle

class GameConsumer(AsyncWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        self.paddle1 = Paddle()
        self.paddle2 = Paddle()
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
            self.paddle1.y += 0.1
        if event1 == 'down':
            self.paddle1.y -= 0.1
        if event2 == 'up':
            self.paddle2.y += 0.1
        if event2 == 'down':
            self.paddle2.y -= 0.1
        self.paddle1.y = max(-2.5, min(self.paddle1.y, 2.5))
        self.paddle2.y = max(-2.5, min(self.paddle2.y, 2.5))


    async def game_loop(self):
        while True:
            state = {'pos1' : self.paddle1.y, 'pos2' : self.paddle2.y}
            await self.send(text_data=json.dumps(state))
            await asyncio.sleep(1/60)
