class Paddle:
    def __init__(self):
        self.y = 0

class Ball:
    def __init__(self):
        self.x = 0
        self.y = 0
        self.speed = 0.2
        self.direction_x = 1
        self.direction_y = 0
        self.wait = 0
    
    def update(self):
        if (self.wait < 60):
            self.wait += 1
            return
        self.speed = min(self.speed, 1)
        self.update_x()
        self.update_y()
    
    def update_x(self):
        if self.direction_x == 1:
            self.x += self.speed
        else:
            self.x -= self.speed

    def update_y(self):    
        self.y += self.speed * self.direction_y
        if self.y > 10.5:
            self.direction_y *= -1
        if self.y < -10.5:
            self.direction_y *= -1
        if self.direction_y > 1:
            self.direction_y = 1
        if self.direction_y < -1:
            self.direction_y = -1
    
    def clear(self):
        self.x = 0
        self.y = 0
        self.speed = 0.2
        self.direction_x = 1
        self.direction_y = 0
        self.wait = 0

class Game:
    def __init__(self):
        self.paddle1 = Paddle()
        self.paddle2 = Paddle()
        self.ball = Ball()
        self.score = [0, 0]
    
    def update(self):
        if self.ball.x > 20:
            self.score[0] += 1
            self.ball.clear()
        if self.ball.x < -20:
            self.score[1] += 1
            self.ball.clear()
        self.ball.update()
        if self.ball.x < -10.8 and self.ball.x > -11.5:
            if self.ball.y > self.paddle1.y - 1 and self.ball.y < self.paddle1.y + 1.5:
                if self.ball.direction_x == -1:
                    self.ball.direction_x = 1
                    self.ball.speed += 0.05
                    self.ball.direction_y = (self.ball.y - self.paddle1.y) * 2
        if self.ball.x > 10.8 and self.ball.x < 11.5:
            if self.ball.y > self.paddle2.y - 1.5 and self.ball.y < self.paddle2.y + 1.5:
                if self.ball.direction_x == 1:
                    self.ball.direction_x = -1
                    self.ball.speed += 0.05
                    self.ball.direction_y = (self.ball.y - self.paddle2.y) * 2
        