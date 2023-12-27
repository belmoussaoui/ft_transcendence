from django.urls import path
from . import views
from .consumers import ChatConsumer

urlpatterns = [
    path('livechat/', views.SendMessageView.as_view(), name='live-chat'),
]

websocket_urlpatterns = [
    path('ws/chat/', ChatConsumer.as_asgi()),
]
