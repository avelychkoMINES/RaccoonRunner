import cv2
import numpy as np

# Function to handle mouse events
def click_event(event, x, y, flags, param):
    if event == cv2.EVENT_LBUTTONDOWN:
        coordinates.append((x, y))
        cv2.circle(resized_image, (x, y), 5, (0, 0, 255), -1)  # Red dot
        cv2.imshow("Resized Image", resized_image)
        print(f"Coordinates: ({x}, {y})")

# Load the image
image_path = "images/two.jpg"  # Replace with your image path
original_image = cv2.imread(image_path)

# Define the desired width and height
width = 570
height = 342

# Resize the image to the specified width and height
resized_image = cv2.resize(original_image, (width, height))

# Create a window to display the resized image
cv2.namedWindow("Resized Image")
cv2.imshow("Resized Image", resized_image)

# Set the callback function for mouse events
cv2.setMouseCallback("Resized Image", click_event)

# List to store coordinates
coordinates = []

# Wait for the user to click on points and display their coordinates
cv2.waitKey(0)

# Write coordinates to a text file
with open("coordinates.txt", "w") as file:
    file.write(",".join([f"[{x},{y}]" for x, y in coordinates]))

# Close all OpenCV windows
cv2.destroyAllWindows()
