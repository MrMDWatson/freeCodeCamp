import math

GRAVITATIONAL_ACCELERATION = 9.81
PROJECTILE = "∙"
x_axis_tick = "T"
y_axis_tick = "⊣"

class Projectile:
    __slots__ = ('__speed', '__height', '__angle')

    def __init__(self, speed, height, angle):
        self.__speed = speed
        self.__height = height
        self.__angle = math.radians(angle)

    def __calculate_displacement(self):



        
        return (self.__speed * math.cos(self.__angle) * (self.__speed * math.sin(self.__angle) + math.sqrt((self.__speed ** 2) * (math.sin ** 2) * self.__angle + 2 * GRAVITATIONAL_ACCELERATION * self.__height))) / GRAVITATIONAL_ACCELERATION