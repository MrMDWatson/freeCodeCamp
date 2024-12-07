import random
from words import words

class Animal:
    def __init__(self):
        behavior = "domesticated"
    
    def intro(self, x):
        print(f"Hello, my name is {x}")
        
        
class Cat(Animal):
    def __init__(self):
        super().__init__()
    name = random.choice(words)
    def meow(self):
        print("Meow")

class Dog(Animal):
    name = random.choice(words)
    def bark(self):
        print("Ruff")





name = input("Whats your name?\n")

Cat = Cat()
cat_intro = [Cat.intro(name), Cat.meow()]
