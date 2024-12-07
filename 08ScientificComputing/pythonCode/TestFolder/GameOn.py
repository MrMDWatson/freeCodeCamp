import turtle
import time
import random

wn = turtle.Screen()
wn.title("Game on")
wn.bgcolor("grey")
wn.setup(width=500, height=500)


head = turtle.Turtle()
head.shape("circle")
head.color("green")
head.penup()
head.goto(0,0)



while True:
    wn.update
    head.goto(0,0)
    time.sleep(2)
    head.goto(0,0)


wn.listen()
wn.onkeypress(go_up, "w")
wn.onkeypress(go_down, "s")
wn.onkeypress(go_left, "a")
wn.onkeypress(go_right, "d")



print("Complete")