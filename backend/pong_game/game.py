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
    
    def event_move_paddle(self, player_id, direction):
        if (player_id == 1):
            self.game.move_paddle(0, direction)
        else:
            self.game.move_paddle(1, direction)
    
    def event_config_game(self, points, speed):
        self.game.points = points
        self.game.setup_speed(speed)
        print("points", points)
    
    def update(self):
        self.game.update()
        pass
    
    def game_data(self):
        data = self.game.data()
        return data


class Paddle:
    def __init__(self, x):
        self.x = x
        self.y = 0
        self.speed = 0.4
        self.height = 3
    
    def move(self, direction):
        self.y += direction * self.speed

class Ball:
    def __init__(self):
        self.x = 0
        self.y = 0
        self.size = 1
       
        self.direction_x = 1
        self.direction_y = 0
        self.wait = 0
        self.speed_mode = "3"
        self.speeds_config = {
            "0": 3.175 / 60,
            "1": 4.978 / 60,
            "2": 6.782 / 60,
            "3": 8.585 / 60,
            "4": 10.389 / 60,
            "5": 15.875 / 60
        }
        self.speed = self.speeds_config[self.speed_mode]
        self.max_speed = self.speed * 3
    
    def clear(self):
        self.x = 0
        self.y = 0
        self.speed =  self.speeds_config[self.speed_mode]
        self.direction_x = 1
        self.direction_y = 0
        self.wait = 0

    def update(self):
        self.speed = min(self.speed, self.max_speed)
        self.update_x()
        self.update_y()
    
    def update_x(self):
        self.x += self.speed * self.direction_x

    def update_y(self):
        self.y += self.speed * self.direction_y
    
    def collide_with_paddle(self, paddle):
        self.direction_x *= -1
        self.speed += 0.025
        self.direction_y = (self.y - paddle.y) / 2
    
    def setup_speed(self, mode):
        self.speed_mode = mode
        self.speed = self.speeds_config[self.speed_mode]
        self.max_speed = self.speed * 3
    
class Game:
    def __init__(self):
        self.ball = Ball()
        self.state = 'update'
        self.score = [0, 0]
        self.width = 30
        self.height = 21
        self.paddles = [Paddle(-self.width / 2 + 1), Paddle(self.width / 2 - 1)]
        self.speed = 3
        self.points = 5
    
    def setup_speed(self, mode):
        self.ball.setup_speed(str(mode))
    
    def move_paddle(self, index, direction):
        self.paddles[index].move(direction)
    
    def update(self):
        self.ball.update()
        self.check_paddles()
        self.check_scoring()
        self.check_collides()
    
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
        if self.ball.x > self.width / 2 + 0.5:
            self.score_point(0)
        if self.ball.x < -self.width / 2 - 0.5:
             self.score_point(1)
    
    def score_point(self, player_id):
        self.score[player_id] += 1
        self.ball.clear()
        if self.score[player_id] >= self.points:
            self.state = "gameover"
    
    def check_collides(self):
        self.check_collides_with_paddles()
        self.check_collides_with_walls()

    def check_collides_with_paddles(self):
        if self.ball.x >= self.paddles[1].x - 1 and self.ball.x <= self.paddles[1].x + 1:
            if self.ball.y <= self.paddles[1].y + 2 and self.ball.y >= self.paddles[1].y - 2:
                if self.ball.direction_x == 1:
                    self.ball.collide_with_paddle(self.paddles[1])
        
        if self.ball.x <= self.paddles[0].x + 1 and self.ball.x >= self.paddles[0].x - 1:
            if self.ball.y <= self.paddles[0].y + 2 and self.ball.y >= self.paddles[0].y - 2:
                if self.ball.direction_x == -1:
                    self.ball.collide_with_paddle(self.paddles[0])

    def check_collides_with_walls(self):
        if self.ball.y > self.height / 2:
            self.ball.direction_y *= -1
            self.ball.y = self.height / 2
        if self.ball.y < -self.height / 2:
            self.ball.direction_y *= -1
            self.ball.y = -self.height / 2
    
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
        