import cv2
import numpy as np

img = cv2.imread('games.jpg')

# convert BGR to HSV
hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
	
# define range of blue color in HSV
lower_blue = np.array([110,50,50])
upper_blue = np.array([130,255,255])

# Threshold the HSV image to get only blue colors
mask = cv2.inRange(hsv, lower_blue, upper_blue)

# Bitwise-AND mask and original image
res = cv2.bitwise_and(img,img,mask = mask)

cv2.imwrite('blue-mask.jpg',mask)
cv2.imwrite('blue-res.jpg',res)
