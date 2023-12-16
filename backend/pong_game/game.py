class Paddle:
    def __init__(self):
        self.y = 0

class Ball:
    def __init__(self):
        self.x = 0
        self.y = 0
        self.speed = 0.05
        self.direction_x = 1
        self.direction_y = 1
    
    def update(self):
        self.speed = min(self.speed, 0.1)
        self.update_x()
        self.update_y()
    
    def update_x(self):
        if self.direction_x == 1:
            self.x += self.speed
        else:
            self.x -= self.speed
        if self.x > 4:
            self.direction_x = -1
        if self.x < -4:
            self.direction_x = 1

    def update_y(self):    
        if self.direction_y == 1:
            self.y += self.speed
        else:
            self.y -= self.speed
        if self.y > 2.9:
            self.direction_y = -1
        if self.y < -2.8:
            self.direction_y = 1

class Game:
    def __init__(self):
        self.paddle1 = Paddle()
        self.paddle2 = Paddle()
        self.ball = Ball()
    
    def update(self):
        self.ball.update()
        if self.ball.x < -2.8 and self.ball.x > -3.3:
            if self.ball.y > self.paddle1.y - 0.8 and self.ball.y < self.paddle1.y + 0.8:
                if self.ball.direction_x == -1:
                    self.ball.direction_x = 1
                    self.ball.speed += 0.01
        if self.ball.x > 2.8 and self.ball.x < 3.3:
            if self.ball.y > self.paddle2.y - 0.8 and self.ball.y < self.paddle2.y + 0.8:
                if self.ball.direction_x == 1:
                    self.ball.direction_x = -1
                    self.ball.speed += 0.01
        