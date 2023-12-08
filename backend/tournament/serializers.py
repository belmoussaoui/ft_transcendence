from rest_framework import serializers
from .models import Tournament, TournamentMatch, Player

class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ('id', 'name')

class TournamentMatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = TournamentMatch
        fields = ('id', 'tournament', 'player1', 'player2', 'winner')

class TournamentSerializer(serializers.ModelSerializer):
    players = PlayerSerializer(many=True, read_only=True)
    
    class Meta:
        model = Tournament
        fields = ('id', 'name', 'players', 'online')