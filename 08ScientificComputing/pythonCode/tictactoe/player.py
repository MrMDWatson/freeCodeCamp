import math
import random

class Player:
    def __init__(self, letter):
        self.letter = letter

    def get_move(self, game):
        pass

class CPU(Player):
    def __init__(self, letter):
        super().__init__(letter)

    def get_move(self, game):
        pass

class Human(Player):
    def __init__(self, letter):
        super().__init__(letter)

    def get_move(self, game):
        pass