import cleared
import time


head = "Calculator 1.0"
print(head)
time.sleep(2)

def calculator():
    cleared.cls()
    print(head)
    print("Enter equation and press enter")
    print("Use +, -, *, & / for operations")
    x = 0
    print(x)
    operation = ["+", "-", "*", "/"]
    x = int(input()) 
    calc = True
    
    while calc == True:
        y = str(input("Enter: + - * /"))
        if y == "c":
            calculator()
        elif y == "e":
            exit()

        while y not in operation:
            print("Invalid")
            y = str(input("Enter: + - * /"))

        z = int(input())
        if z == "c":
            calculator()
        elif z == "e":
            exit()

        elif y == "+":
            x = x + z
            print(x)
        
        elif y == "-":
            x = x - z
            print(x)

        elif y == "*":
            x = x * z
            print(x)

        elif y == "/":
            x = x / z
            print(x)


        cleared.cls()
        print(head)
        print(x)

            

calculator()
