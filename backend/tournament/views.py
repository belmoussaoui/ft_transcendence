from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from random import shuffle

from .models import Tournament, Player, TournamentMatch

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
	player_count = len(player_names)

	if not tournament_name or not player_names or player_count < 2 or player_count > 8:
		return Response({'message': 'Invalid tournament data.'}, status=status.HTTP_400_BAD_REQUEST)

    # Création du tournoi
	tournament = Tournament.objects.create(name=tournament_name)

	# Mélanger les joueurs
	shuffle(player_names)

    # Ajout des joueurs au tournoi
	for player_name in player_names:
		player = Player.objects.create(name=player_name)
		tournament.players.add(player)
	
	# Création des matchs
	for i in range(0, player_count - 1, 2):
		match = TournamentMatch.objects.create(player1=tournament.players.all()[i], player2=tournament.players.all()[i+1])
		tournament.matchs.add(match)
	if player_count % 2 == 1:
		match = TournamentMatch.objects.create(player1=tournament.players.all()[player_count-1], winner=tournament.players.all()[player_count-1])
		tournament.matchs.add(match)

	return Response({'message': 'Tournament created successfully.'}, status=status.HTTP_201_CREATED)

@api_view(['GET'])
def get_tournament_details(request, tournamentid):
    try:
        tournament = Tournament.objects.get(id=tournamentid)
        serializer = TournamentSerializer(tournament)
        return Response(serializer.data)
    except Tournament.DoesNotExist:
        return Response({"message": "Tournament not found"}, status=404)
	
@api_view(['POST'])
def play_next_match(request, tournament_id):
    next_match_id = request.data.get('nextMatchId')
    if not next_match_id:
        return Response({'message': 'Invalid request'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        match = TournamentMatch.objects.get(id=next_match_id)
        match.winner = match.player1
        match.save()
        return Response({'message': 'Next match played successfully'}, status=status.HTTP_200_OK)
    except (Tournament.DoesNotExist, TournamentMatch.DoesNotExist):
        return Response({'message': 'Tournament or match not found'}, status=status.HTTP_404_NOT_FOUND)