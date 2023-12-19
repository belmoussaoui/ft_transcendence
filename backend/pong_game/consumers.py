import json
import asyncio
from channels.generic.websocket import AsyncWebsocketConsumer
from .game import LocalManager

class GameConsumer(AsyncWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        self.manager = LocalManager()
        super().__init__(*args, **kwargs)
    
    async def connect(self):
        await self.accept()
        self.game_loop_task = asyncio.create_task(self.game_loop())

    async def disconnect(self, close_code):
        self.game_loop_task.cancel()

    async def receive(self, text_data):
        data = json.loads(text_data)
        self.manager.receive(data)

    async def game_loop(self):
        while True:
            self.manager.update()
            data = self.manager.game_data()
            await self.send(text_data=json.dumps(data))
            await asyncio.sleep(1/60)
