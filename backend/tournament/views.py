from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import Tournament, TournamentMatch, Player

from .serializers import TournamentSerializer

class TournamentListCreateView(generics.ListCreateAPIView):
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer

@api_view(['POST'])
def create_tournament(request):
	name = request.data.get('name')

	if not name:
		return Response({'message': 'Please provide a name for the tournament lobby.'}, status=status.HTTP_400_BAD_REQUEST)

	lobby = Tournament.objects.create(name=name, online=True)

	serializer = TournamentSerializer(lobby)
	return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def create_local_tournament(request):
	tournament_name = request.data.get('name')
	player_names = request.data.get('playerNames')
	player_count = request.data.get('numberOfPlayers')

	if not tournament_name or not player_names or player_count < 2 or player_count > 8:
		return Response({'message': 'Invalid tournament data.'}, status=status.HTTP_400_BAD_REQUEST)

    # Création du tournoi
	tournament = Tournament.objects.create(name=tournament_name)

    # Ajout des joueurs au tournoi
	for player_name in player_names:
		player = Player.objects.create(name=player_name)
		tournament.players.add(player)
        
	# Mélanger les joueurs
	tournament.players.shuffle()

    # Prévoir les matchs (création des paires de joueurs)
	for i in range(tournament.players.count()):
		for j in range(i + 1, tournament.players.count()):
			TournamentMatch.objects.create(tournament=tournament, player1=tournament.players[i], player2=tournament.players[j])

	return Response({'message': 'Tournament created successfully.'}, status=status.HTTP_201_CREATED)