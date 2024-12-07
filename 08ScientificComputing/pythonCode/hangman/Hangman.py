import time
import random
import string
import cleared
from words import words

game_on = True
title = "Hangman"
spaced = (" " * 20)

cleared.cls()
print(title)
print("Hello")
time.sleep(2)

def get_name():
  print("Please enter name: ")
  time.sleep(.5)
  name = input("")
  return name

name_is = get_name()

cleared.cls()

print(title)
intro = (f"Welcome {name_is}")

def get_valid_word(words):
  word = random.choice(words)
  while "-" in word or " " in word:
    word = random.choice(words)
  return word.upper()

def hangman():
  word = get_valid_word(words)
  word_letters = set(word)
  alphabet = set(string.ascii_uppercase)
  used_letters = set()
  lives = 7
  score = 0

  while len(word_letters) > 0 and lives > 0:
    time.sleep(1.5)
    cleared.cls()

    print(title)
    print(f"{name_is}'s Score: {score}")
    print("You have", lives, "lives and have used these letters: ", " ".join(used_letters))
  
    word_list = [letter if letter in used_letters else "-" for letter in word]
    print("Current word: ", " ".join(word_list))
    user_letter = input("Guess a letter: ").upper()

    if user_letter == "EXIT":
      exit()

    if user_letter in alphabet - used_letters:
        used_letters.add(user_letter)
        
        if user_letter in word_letters:
            word_letters.remove(user_letter)
            score += 5

        else:
          score -= 1
          lives -= 1
          print("Letter not in word")
        
    elif user_letter in used_letters:
        print("You have used that letter.")

    else:
      print("Invalid")
        
  if lives == 0:
    time.sleep(1.5)
    cleared.cls()
    print(title)
    print(f"{name_is} you scored: {score}")
    print("You lose")
    print(word)

  else:
    time.sleep(1.5)
    cleared.cls()
    print(title)
    print(f"{name_is} you scored: {score}")
    print("You win")
    print(word)
  
hangman()

while game_on:
  print(spaced)
  print("Play again?")
  print("Y or N")
  answer = str(input())

  if answer == "n" or answer == "N":
    game_on = False
    
  else:
    print("Change name: Y or N\n")
    answer = str(input())
    if answer == "n" or answer == "N":
      hangman()

    else:
      name_is = get_name()
      hangman()