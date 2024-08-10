class Rectangle:
  def __init__(self, width, height):
    self.width = width
    self.height = height
    
  def get_area(self):
    return self.width * self.height
  
  def set_width(self, width):
    self.width = width
    
  def set_height(self, height):
    self.height = height
  
class Square:
  def __init__(self, sides):
    super().__init__(width, height)
    self.width = 
    self.sides = sides
        
  def get_area(self):
    return self.sides*2 
  
rect1 = Rectangle(9, 6)
square = Square(5)

print(rect1.get_area())
print(square.get_area())