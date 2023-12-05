from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Tournament
from .serializers import TournamentSerializer

class TournamentListCreateView(generics.ListCreateAPIView):
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer

@api_view(['POST'])
def create_tournament(request):
    name = request.data.get('name')

    if not name:
        return Response({'message': 'Please provide a name for the tournament lobby.'}, status=status.HTTP_400_BAD_REQUEST)

    lobby = Tournament.objects.create(name=name)

    serializer = TournamentSerializer(lobby)
    return Response(serializer.data, status=status.HTTP_201_CREATED)