import cv2
import numpy as np

img1 = cv2.imread('user-icon-1.jpg')
img2 = cv2.imread('user-icon-2.jpg')

dst = cv2.addWeighted(img1,0.7,img2,0.3,0)

cv2.imwrite('dst.jpg',dst);
