def add_time(start, duration):

    x = duration.split(":")
    print(" ")
    print(x)
    
    hours = int(x[0]) * 60
    min = int(x[1])
    time = hours + min
    
    print(f"{hours} + {min} = {time}")
    y = start.split(":")
    
    print(y)
    
    z = y[1].split(" ")
    
    print(z)
    
    hours1 = int(y[0]) * 60
    min1 = int(z[0])
    start_time = hours1 + min1
    
    print(f"{hours1} + {min1} = {start_time}")
    
    new_time = start_time + time
    
    updated = int(new_time/60)
    
    new_min = new_time - (updated * 60)
    
    while updated > 12:
        
        if updated > 12 and z[1] == "PM":
            updated = updated - 12
            z[1] = "AM"
        if updated > 12 and z[1] == "AM":
            updated = updated - 12
            z[1] = "PM"
    if new_min < 10:
        print(f"{start} {duration} {updated}:0{new_min} {z[1]}")
    else:
        print(f"{start} {duration} {updated}:{new_min} {z[1]}")
    return new_time

add_time("12:10 AM", "15:32")

add_time("3:55 AM", "36:49")

add_time("11:06 PM", "2:02")

add_time("5:25 PM", "8:50")