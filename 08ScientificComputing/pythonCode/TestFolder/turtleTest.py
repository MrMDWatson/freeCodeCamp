import turtle

a = input("Done?\n")



a = "apple"
print("e" in a, a)


word = "bananana"
i = word.find("na")
print(i)


name = ["x", "y", "z"]


name.pop(-1)
print(name)
for i, key in enumerate(name):
    print(i, key)


matt = turtle.Turtle()
matt.hideturtle()
matt.penup()
matt.goto(0, 100)
matt.pendown()
matt.speed(0)
i = 0
counter = 4
while i < counter:
    matt.forward(100)
    matt.left(90)
    i += 1


turtle.done()