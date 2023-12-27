from channels.generic.websocket import AsyncWebsocketConsumer
import json

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # Ajouter un utilisateur à un groupe de chat spécifique
        await self.channel_layer.group_add(
            "chat_group",  # Nom du groupe
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Retirer l'utilisateur du groupe de chat
        await self.channel_layer.group_discard(
            "chat_group",
            self.channel_name
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        # Envoyer le message à tout le groupe
        await self.channel_layer.group_send(
            "chat_group",
            {
                'type': 'chat_message',
                'message': message
            }
        )

    # Gérer les messages du groupe
    async def chat_message(self, event):
        message = event['message']

        # Envoyer le message au WebSocket
        await self.send(text_data=json.dumps({
            'message': message
        }))
