def addPlayer():
    




player1 = {
 "name": "Matthew",
 "age": 57
}

player2 = {
 "name": "Kevin",
 "age": 122
}


def addPlayer(x, y):
    x = {}
    x["name"] = y
    x["score"] = 0
    
    x["idnum"] = idnum
    player_info.append(x)
    

players = [player1, player2]

highestAge = 0
topScorer = player1
for player in players:
    if player["age"] > highestAge:
        highestAge = player["age"]
        topScorer = player["name"]
print(topScorer)
print(highestAge)