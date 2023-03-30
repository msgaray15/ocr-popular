# ----------------- import the libraries and modules ----------------
import cv2  # OpenCV V2
import pytesseract
import modules.draw as draw  # module to draw
import modules.processFindContours as processFindContours  # module to find contours
import modules.filterContours as filterContours  # module to filter contours
import requests

# ------------------------- global variables ------------------------

camera_device = 0  # default
window_name = 'Camera Preview'
# aspecto de ralacion de la placa 235 mm. de largo, por 105 mm. de ancho:  235/105 = 2.238095238
placa_ratio = 2.238095238
placa_width_max = 640
placa_width_min = 40
placa_height_max = 285
placa_height_min = 11
placa_text = ''

alphanumeric = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
options = "-c tessedit_char_whitelist={}".format(alphanumeric)
options += " --psm {}".format(7)

# -------------------------- video capture --------------------------

source = cv2.VideoCapture(camera_device)  # open a capture device
if not source.isOpened():
    print("Cannot open camera")
    exit()

# allows you to resize the window
cv2.namedWindow(window_name, cv2.WINDOW_NORMAL)

# ------------------------ start the program ------------------------

while cv2.waitKey(1) != 27:  # exit by pressing Esc
    # grabs, decodes and returns the next video frame.
    has_frame, frame = source.read()
    if not has_frame:  # exit if no frames has been grabbed
        break

    # ------------------- find area of interest ---------------------

    al, an, c = frame.shape  # the width and height of the frames
    widthx3 = int(an/3)
    heightx3 = int(al/3)
    # divide the frame into 3 equal parts of both width and height to create a 3*3 grid
    """
    # Lineas verticales
    cv2.line(frame,(widthx3,0),(widthx3,al),(255,0,0),2)
    cv2.line(frame,(widthx3*2,0),(widthx3*2,al),(255,0,0),2)
    # Lineas horizontales
    cv2.line(frame,(0,heightx3),(an,heightx3),(255,0,0),2)
    cv2.line(frame,(0,heightx3*2),(an,heightx3*2),(255,0,0),2)
    """
    # draw the lines to form the grid
    draw.rectangle(frame, (widthx3, heightx3), (widthx3*2, heightx3*2),
                   (0, 255, 0), 2)  # Draw the border of the area of interest
    # get the area of interest of the frame
    area_interest = frame[heightx3:heightx3*2, widthx3:widthx3*2]

    # --------- process area of interest to find contours -----------

    contours, _ = processFindContours.find_contours(
        area_interest)  # find the contours of the area of interest
    candidates = filterContours.contour_rectangle(
        contours, placa_ratio, placa_width_max, placa_width_min, placa_height_max, placa_height_min)  # find the rectangle of the plate

    if (len(candidates) > 0):
        x, y, w, h = filterContours.create_rectangle(
            candidates[0])  # get x, y, width and height
        placa = area_interest[y:y+h, x:x+w]  # take the pixels from the plate
        placa_moothing_edge = processFindContours.invert_image(
            placa)  # invert the pixels
        texto = pytesseract.image_to_string(
            placa_moothing_edge, config=options)  # convert image to text
        if (len(texto) >= 6):
            placaText = texto[0:6]
            print(placaText)
            # payload = {'placaText': placaText,'state':'inpt'}
            # r = requests.post('https://miapi.com/comentarios/', json=payload) 
            # cv2.imshow("Placa: ",placa_moothing_edge)
            # draw the rectangular outline "the plate"
            draw.contours(area_interest, candidates, -1, (1, 2, 255), 2)

    cv2.imshow(window_name, frame)

source.release()
cv2.destroyWindow(window_name)
