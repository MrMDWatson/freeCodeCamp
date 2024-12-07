import random
import os
import time


def update_display():
  os.system('cls' if os.name=='nt' else 'clear')
  print("Guessing Game")

def get_player_info():
  update_display()
  
  print("Welcome, please enter your name...")
  player_1 = str(input())
  return player_1
  
def select_range(player):
  update_display()
  
  print(f"{player} choose level 1-3")
  level = int(input())
  if level == 1:
    range = 10
  if level == 2:
    range = 50
  if level == 3:
    range = 100
  return level, range
    
def select_mode(player):
  update_display()
  
  print(f"Choose, {player} guesses number (p) or Computer (c)")
  modes = ["c", "C", "p", "P"]
  mode = str(input())
  while mode not in modes:
    mode = str(input())
  return mode
  
def guess(level, range):
  
  random_number = int(random.randint(1, range))
  score = 0
  low = 1
  high = range
  guess = ""
  
  
  while guess != random_number:
    update_display()
    print(f"Guess a number between {low} and {high}: ")
    guess = int(input())
    print(int())
    #while guess != int():
     # print("Invalid")
      #time.sleep(2)    
      #update_display()
      #guess = int(input())
    
    update_display()
    print(f"Guessed number {guess}")

    if guess < random_number:
      print("Too low")
      low = guess
        
    if guess > random_number:
      print("Too high")
      high = guess
        
    if guess != random_number:
      print(" guess again...")
      score -= 1    
    
    time.sleep(2)
      
  if guess == random_number:
    print("You win!")
    print(f"Number was {random_number}")
    
  if level == 1:
    score += 5

  if level == 2:
    score += 25

  if level == 3:
    score += 50

  print(f"Score: {score}")
  time.sleep(2)
  
def computer_guess(level, range):
  low = 1
  high = range
  guess = ""
  player_selected_number = int(input("Please enter number for computer to guess"))

  while guess != player_selected_number:
    if low != high:
      guess = random.randint(low, high)

    else:
      guess = low
        
    if guess == player_selected_number:
      print("Computer won!")
    
    elif guess < player_selected_number:
      high = guess - 1
      print("Guess was high")

    elif guess > player_selected_number:
      low = guess + 1
      print("Guess was low")

  print(f"Correct, number is {guess}")   
  
player = get_player_info()
level, range = select_range(player)
mode = select_mode(player)

game_on = True
while game_on:
  update_display()
  
  print("Start match(Y) or Quit(N)")
  answer = str(input())
  if answer == "n" or answer == "N":
    game_on = False
  elif answer == "y" or answer == "Y":
    if mode == "c" or mode =="C":
      computer_guess(level, range)
    elif mode == "p" or mode =="P":
      guess(level, range)

   

print("Game over")
exit()