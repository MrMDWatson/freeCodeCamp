import os
import time

idnum = 0
player_list = []

def cls():
    os.system('cls' if os.name == 'nt' else 'clear')

def name_dict(x, y):
    x = {}
    x["name"] = y
    x["score"] = 0
    x["idnum"] = idnum
    player_info.append(x)


    

cls()

intro = "Welcome, add players"
print(intro)


while True:
    
    player_list.append(input("Name is? "))
    print(player_list)
    print("Add another name?")
    add_name = input().lower()
    cls()
    c = ["y", "n"]
    while add_name not in c:
        print("Invalid")
        add_name = input("Add another name?\n").lower()
        cls()
    if add_name == "y":
        continue
    elif add_name == "n":
        break
print(player_list)

player_info = []

for name in player_list:
    idnum += 1
    name_dict(name, name)
    

print(player_info)

for player in player_info:
    print(player["score"])
print(player_info[0]["name"])

print(player_info[0])


players = [player1, player2]


highestAge = 0
topScorer = player1
for player in players:
    if player["age"] > highestAge:
        highestAge = player["age"]
        topScorer = player["name"]
print(topScorer)
print(highestAge)