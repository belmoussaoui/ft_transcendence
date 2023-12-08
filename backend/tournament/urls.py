from django.urls import path
from . import views

urlpatterns = [
    path('', views.TournamentListCreateView.as_view(), name='tournament-list'),
    path('create_tournament/', views.create_tournament, name='create-tournament'),
	path('create_local_tournament/', views.create_local_tournament, name='create-local-tournament')
]
