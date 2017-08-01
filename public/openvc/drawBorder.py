import cv2
import numpy as np

BLUE = [255,0,0]

img1 = cv2.imread('games.jpg')

constant = cv2.copyMakeBorder(img1,10,10,10,10,cv2.BORDER_CONSTANT,value=BLUE)

cv2.imwrite('games_border.jpg',img1)
