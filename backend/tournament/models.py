from django.db import models

class Player(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Tournament(models.Model) :
	name = models.CharField(max_length=100)
	players = models.ManyToManyField(Player, blank=True)
	online = models.BooleanField(default=False)

	def __str__(self):
		return self.name
	class Meta:
		app_label = "tournament"

class TournamentMatch() :
	tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE)
	player1 = models.ForeignKey(Player, on_delete=models.CASCADE, related_name="player1")
	player2 = models.ForeignKey(Player, on_delete=models.CASCADE, related_name="player2")
	winner = models.ForeignKey(Player, on_delete=models.CASCADE, related_name="winner", blank=True, null=True)

	def __str__(self):
		return self.tournament.name + " : " + self.player1.name + " vs " + self.player2.name
	class Meta:
		app_label = "tournament"
