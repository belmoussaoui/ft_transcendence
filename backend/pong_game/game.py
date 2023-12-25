import random

class LocalManager:
    def __init__(self):
        self.game = Game()
    
    def receive(self, data):
        event = data.get("event")
        if event == 'MOVE':
            player_id = event = data.get("playerId")
            direction = data.get("direction")
            self.event_move_paddle(player_id, direction)
        if event == 'CONFIG':
            points = data.get("points")
            speed = data.get("speed")
            self.event_config_game(points, speed)
        if event == 'START':
            self.event_start_game()
    
    def event_move_paddle(self, player_id, direction):
        if self.game.state == "update":
            if (player_id == 1):
                self.game.move_paddle(0, direction)
            else:
                self.game.move_paddle(1, direction)
    
    def event_config_game(self, points, speed):
        self.game.points = points
        self.game.setup_speed(speed)
    
    def event_start_game(self):
        if self.game.state == "update":
            self.game.start()
    
    def update(self):
        self.game.update()
        pass
    
    def game_data(self):
        data = self.game.data()
        return data


class Paddle:
    def __init__(self, x):
        self.x = x
        self.y = 0.0
        self.speed = 0.5
        self.height = 3
    
    def move(self, direction):
        self.y += direction * self.speed

    def move_to_center(self):
        if self.y != 0:
            d = 1 if self.y < 0 else -1
            self.y += self.speed * d
            if abs(self.y) < self.speed:
                self.y = 0


class Ball:
    def __init__(self):
        self.x = 0
        self.y = 0
        self.state = "wait"
        self.wait = 60
        self.destination_x = 0
        self.destination_y = 0
        self.size = 1
        self.paddle = None
        self.direction_x = 1
        self.direction_y = 0
        self.speed_mode = "3"
        self.speeds_config = {
            "0": 3.175 * 2.5 / 60,
            "1": 4.978 * 2.5 / 60,
            "2": 6.782 * 2.5 / 60,
            "3": 8.585 * 2.5 / 60,
            "4": 10.389 * 2.5 / 60,
            "5": 15.875 * 2.5 / 60
        }
        self.speed = self.speeds_config[self.speed_mode]
        self.max_speed = self.speed
    
    def start(self, paddle):
        self.paddle = paddle
        self.state = "wait"
        self.direction_x = -1 if self.paddle.x > 10 else 1
        self.destination_x = paddle.x + (1.5 * self.direction_x)
        self.destination_y = paddle.y
    
    def clear(self):
        self.speed =  self.speeds_config[self.speed_mode]
        self.direction_x = 1
        self.direction_y = 0
        self.wait = 60

    def update(self):
        if self.wait > 0:
            self.wait -= 1
        else:
            self.speed = min(self.speed, self.max_speed)
            if self.state == "terminate":
                self.move_to_center()
            elif self.paddle:
                self.move_to_paddle()
            else:
                self.update_x()
                self.update_y()
    
    def move_to_paddle(self):
        if self.destination_x != None and self.x != self.destination_x:
            d = 1 if self.x < self.destination_x else -1
            self.x +=  self.speeds_config["3"] * d
            if abs(self.x - self.destination_x) <  self.speeds_config["3"]:
                self.x = self.destination_x
                self.destination_x = None
        elif self.destination_y != None and self.y != self.destination_y:
            d = 1 if self.y < self.destination_y else -1
            self.y +=  self.speeds_config["3"] * d
            if abs(self.y - self.destination_y) <  self.speeds_config["3"]:
                self.y = self.destination_y
                self.destination_y = None
        else:
            self.state = "ready"
            d = 1 if self.y < self.paddle.y else -1
            if abs(self.y - self.paddle.y) < self.speed / 3:
                self.y = self.paddle.y
            else:
                self.y += self.speed * d / 3
            self.y = max(self.y, self.paddle.y - 1.5)
            self.y = min(self.y, self.paddle.y + 1.5)
            
            #self.y = self.paddle.y
    
    def move_to_center(self):
        if self.x != 0:
            d = 1 if self.x < 0 else -1
            self.x +=  self.speeds_config["3"] * d
            if abs(self.x) <  self.speeds_config["3"]:
                self.x = 0
        if self.y != 0:
            d = 1 if self.y < 0 else -1
            self.y +=  self.speeds_config["3"] * d
            if abs(self.y) <  self.speeds_config["3"]:
                self.y = 0
    
    def update_x(self):
        self.x += self.speed * self.direction_x

    def update_y(self):
        self.y += self.speed * self.direction_y
    
    def collide_with_paddle(self, paddle):
        self.direction_x *= -1
        self.speed += 0.025
        self.direction_y = (self.y - paddle.y) / 2
        self.wait = 6

    
    def setup_speed(self, mode):
        self.speed_mode = mode
        self.speed = self.speeds_config[self.speed_mode]
        self.max_speed = self.speed * 1.5
    
class Game:
    def __init__(self):
        self.ball = Ball()
        self.state = 'start'
        self.score = [0, 0]
        self.width = 30
        self.height = 21
        self.paddles = [Paddle(-self.width / 2 + 1), Paddle(self.width / 2 - 1)]
        self.speed = 3
        self.points = 5
        self.ball.start(self.paddles[random.randint(0, 1)])
        self.wait = 0
    
    def start(self):
        if (self.ball.paddle):
            self.ball.direction_x *= -1
            self.ball.collide_with_paddle(self.ball.paddle)
            self.ball.paddle = None
        
    
    def setup_speed(self, mode):
        self.ball.setup_speed(str(mode))
    
    def move_paddle(self, index, direction):
        self.paddles[index].move(direction)
    
    def update(self):
        if self.wait > 0:
            self.ball.update()
            self.wait -= 1
            return
        if self.ball.state == "ready":
            self.state = "update"
        self.check_paddles()
        self.ball.update()
        if not self.ball.paddle:
            self.check_scoring()
        self.check_collides()
        if (self.state == "gameover"):
            self.paddles[0].move_to_center()
            self.paddles[1].move_to_center()
            if self.paddles[0].y == 0 and self.paddles[1].y == 0 and self.ball.y == 0 and self.ball.x == 0:
                self.state = "terminate"
    
    def check_paddles(self):
        if (self.paddles[0].y > self.height / 2 - 1.5):
            self.paddles[0].y = self.height / 2 - 1.5
        if (self.paddles[1].y > self.height / 2 - 1.5):
            self.paddles[1].y = self.height / 2 - 1.5
        if (self.paddles[0].y < -self.height / 2 + 1.5):
            self.paddles[0].y = -self.height / 2 + 1.5
        if (self.paddles[1].y < -self.height / 2 + 1.5):
            self.paddles[1].y = -self.height / 2 + 1.5
    
    def check_scoring(self):
        if self.ball.x > self.width / 2 - 1:
            self.score_point(0, 1)
        if self.ball.x < -self.width / 2 + 1:
             self.score_point(1, 0)
    
    def score_point(self, winner_id, loser_id):
        self.score[winner_id] += 1
        self.ball.clear()
        self.ball.x = -self.width / 2 + 1 if self.ball.x < 0 else self.width / 2 - 1
        self.ball.start(self.paddles[loser_id])
        self.state = "start"
        if self.score[winner_id] >= self.points:
            self.state = "gameover"
            self.ball.state = "terminate"
            self.ball.wait = 120
            self.wait = 120
    
    def check_collides(self):
        self.check_collides_with_paddles()
        self.check_collides_with_walls()

    def check_collides_with_paddles(self):
        if self.ball.x >= self.paddles[1].x - 1.5 and self.ball.x <= self.paddles[1].x + 1:
            if self.ball.y <= self.paddles[1].y + 2 and self.ball.y >= self.paddles[1].y - 2:
                if self.ball.direction_x == 1:
                    self.ball.collide_with_paddle(self.paddles[1])
        
        if self.ball.x <= self.paddles[0].x + 1.5 and self.ball.x >= self.paddles[0].x - 1:
            if self.ball.y <= self.paddles[0].y + 2 and self.ball.y >= self.paddles[0].y - 2:
                if self.ball.direction_x == -1:
                    self.ball.collide_with_paddle(self.paddles[0])

    def check_collides_with_walls(self):
        if self.ball.y > self.height / 2:
            self.ball.direction_y *= -1
            self.ball.y = self.height / 2
            self.ball.wait = 3
        if self.ball.y < -self.height / 2:
            self.ball.direction_y *= -1
            self.ball.y = -self.height / 2
            self.ball.wait = 3

    
    def data(self):
        data = {
            'state' : self.state,
            'score': {
                'player1': self.score[0],
                'player2': self.score[1],
            },
            'paddles': {
                'player1': self.paddles[0].y,
                'player2': self.paddles[1].y,
            },
            'ball': {
                'x': self.ball.x,
                'y': self.ball.y,
            }
        }
        return data
        