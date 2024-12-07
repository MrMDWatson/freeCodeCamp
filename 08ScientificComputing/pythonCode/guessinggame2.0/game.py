import os
import random
import time

class Games:
    def __init__(self):
        
        self.levels = ["1", "2", "3"]

    def cls(self):
        os.system('cls' if os.name=='nt' else 'clear')
        print("GUESSING GAME")

    def getname(self):
        self.cls()
        print("Welcome, please enter your name...")
        self.player_1 = str(input())
        return self.player_1

    def getlevel(self):
        self.cls()
        print(f"{self.player_1} choose level 1-3")
        self.level = input()
        
        while self.level not in self.levels:
            print("Invalid")
            time.sleep(3)
            self.cls()
            print(f"{self.player_1} choose level 1-3")
            self.level = input()

        if self.level == "1":
            self.range = 10
        if self.level == "2":
            self.range = 50
        if self.level == "3":
            self.range = 100
        return self.range, self.level

    def getmode(self):
        self.cls()
        print(f"Choose, {self.player_1} guesses number (p) or Computer (c)")
        modes = ["c", "C", "p", "P"]
        self.mode = (input())
        while self.mode not in modes:
            print("Invalid")
            time.sleep(3)
            self.cls()
            print(f"Choose, {self.player_1} guesses number (p) or Computer (c)")
            self.mode = (input())
        self.cls()
        return self.mode

class Human(Games):
    def __init__(self):
        super().__init__()

    def guess(self, x, level):
        random_number = int(random.randint(1, x))
        guess = 0
        score = 0
        low = 1
        high = x
        
        guesscount = 0
        while guess != random_number:
            self.cls()
            print(f"Guess a number between {low} and {high}: ")
            print(f"Guess count: {guesscount}")
            guesscount += 1
            try:
                guess = int(input())
                
                self.cls()
                print(f"Guess a number between {low} and {high}: ")
                print(f"Guessed number {guess}")
                

            except:
                if guess == "exit()":
                    self.cls()
                    exit()
                print("Invalid input character")
                time.sleep(3)
                continue


            if guess < 1 or guess > high:
                print("Invalid input range")
                time.sleep(3)
                continue

            if guess == random_number:
                    print("You win!")
                    print(f"Number was {random_number}")
                    print(f"Guess count: {guesscount}")
                    if level == "1":
                        score += 5
                    if level == "2":
                            score += 25
                    if level == "3":
                            score += 50
                    print(f"Score: {score}")
            if guess < random_number:
                print("Too low")
                low = guess + 1
            if guess > random_number:
                print("Too high")
                high = guess - 1
            if guess != random_number:
                print("Wrong, guess again...")
                score -= 1
            time.sleep(3)

class CPU(Games):
    def __init__(self):
        super().__init__()

    def computer_guess(self, x, level):
        low = 1
        high = x
        score = 0
        guess = 0
        guesscount = 0
        while True:
            self.cls()
            print(f"Enter number between {low} - {high} for computer to guess")
            try:
                number = int(input())
                    
                self.cls()

            except:
                print("Invalid input character")
                time.sleep(3)
                continue

            if number < 1 or number > high:
                print("Invalid input range")
                time.sleep(3)
                continue

            while guess != number:

                print(f"Guess count: {guesscount}")
                guesscount += 1
                guess = random.randint(low, high)
                self.cls()
                if guess < number:
                    low = guess + 1
                    score -= 1
                    print(f"Computer guess was {guess}, too low!")
                    time.sleep(3)
                elif guess > number:
                    high = guess - 1
                    score -= 1
                    print(f"Computer guess was {guess}, too high!")
                    time.sleep(3)
            if level == "1":
                score += 5
            if level == "2":
                score += 25
            if level == "3":
                score += 50
            print(f"Computer guessed number, {guess}")
            print(f"Computer score: {score}")
            print(f"Guess count: {guesscount}")
            break


power = True



GGame = Games()
Hum = Human()
cpu = CPU()
playername = GGame.getname()
guessrange = GGame.getlevel()
gamemode = GGame.getmode()

game_on = True
if gamemode == "c" or gamemode =="C":
    cpu.computer_guess(guessrange[0], guessrange[1])
elif gamemode == "p" or gamemode =="P":
    Hum.guess(guessrange[0], guessrange[1])

while game_on:
    print("Play again?")
    print("Y or N")
    answer = (input())
    while answer != str(answer):
        print("Invalid")
        time.sleep(3)
        answer = (input())
    if answer == "n" or answer == "N":
        game_on = False
    else:
        print("Change name: Y or N\n")
        answer_1 = str(input())
        while answer_1 != str(answer_1):
            print("Invalid")
            time.sleep(3)
            answer_1 = str(input())
        if answer_1 == "n" or answer_1 == "N":
            guessrange = GGame.getlevel()
            gamemode = GGame.getmode()
            if gamemode == "c" or gamemode =="C":
                cpu.computer_guess(guessrange[0], guessrange[1])
            elif gamemode == "p" or gamemode =="P":
                Hum.guess(guessrange[0], guessrange[1])
        else:
            playername = GGame.getname()
            guessrange = GGame.getlevel()
            gamemode = GGame.getmode()
            if gamemode == "c" or gamemode =="C":
                cpu.computer_guess(guessrange[0], guessrange[1])
            elif gamemode == "p" or gamemode =="P":
                Hum.guess(guessrange[0], guessrange[1])
print("Goodbye")