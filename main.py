import turtle
from turtle import *

turtle.title("Rainbow Spiral Nblancs")
speed(15)
bgcolor("black")
r,g,b = 255,0,0

hideturtle()
penup()

goto (0, -turtle.window_height() / 2 + 60)
pencolor("white")
write("Submitted by: Noel Jhumel G. Blanco", align="center", font=("Arial", 16, "normal"))
goto(0, -turtle.window_height() / 2 + 30)
write("FINAL PIT PRESENTATION FOR ART APP", align="center", font=("Arial", 16, "normal"))

goto (0,0)

showturtle()
pendown()


for i in range (255*2):
    colormode(255)
    if i < 255//3:
        g+=3
    elif i < 255*2//3:
        r-=3
    elif i < 255:
        b+=3
    elif i < 255*4//3:
        g-=3
    elif i < 255*5//3:
        r+=3
    else:
        b-=3
    fd(50+i)
    rt(91)
    pencolor(r,g,b)

hideturtle()
done() 

