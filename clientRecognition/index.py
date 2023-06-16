import cv2  # OpenCV V2
import pytesseract
import modules.draw as draw  # Module to draw
import modules.processFindContours as processFindContours  # Module to find contours
import modules.filterContours as filterContours  # Module to filter contours
import requests

# ------------------------- global variables ------------------------
cameraDevice = 0  # Default
windowName = 'Camera Preview'
cameraPosition = 'input'
client_id = 'prueba'
client_secret = 'prueba'

# Aspecto de ralacion de la placa 235 mm. de largo, por 105 mm. de ancho:  235/105 = 2.238095238
placaRatio = 2.238095238
placaWidthMax = 640
placaWidthMin = 40
placaHeightMax = 285
placaHeightMin = 11

alphanumeric = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
options = "-c tessedit_char_whitelist={}".format(alphanumeric)
options += " --psm {}".format(7)


def videoCapture(source):
    if not source.isOpened():
        print("Cannot open camera")
        exit()


def drawBorderAreaInterest(frame, widthx3, heightx3):
    draw.rectangle(frame, (widthx3, heightx3), (widthx3*2, heightx3*2),
                   (0, 255, 0), 2)  # Draw the border of the area of interest


def processFrame(frame):
    # ------------------- find area of interest ---------------------
    al, an, c = frame.shape  # the width and height of the frames
    widthx3 = int(an/3)
    heightx3 = int(al/3)
    # draw the lines to form the grid
    drawBorderAreaInterest(frame, widthx3, heightx3)
    # get the area of interest of the frame
    return frame[heightx3:heightx3*2, widthx3:widthx3*2]


def findContoursFromAreaInterest(areaInterest):
    # --------- process area of interest to find contours -----------
    contours, _ = processFindContours.find_contours(
        areaInterest)  # find the contours of the area of interest
    return filterContours.contour_rectangle(
        contours, placaRatio, placaWidthMax, placaWidthMin, placaHeightMax, placaHeightMin)  # find the rectangle of the plate


def findRectanglePlaca(candidates, areaInterest):
    x, y, w, h = filterContours.create_rectangle(
        candidates[0])  # get x, y, width and height
    # take the pixels from the plate
    return areaInterest[y:y+h, x:x+w]


def invertPixels(placa):
    return processFindContours.invert_image(
        placa)  # invert the pixels


def getTextFromFramePlaca(placaWhitInvertPixels):
    return pytesseract.image_to_string(
        placaWhitInvertPixels, config=options)  # convert image to text


def drawBorderOfContours(areaInterest, candidates):
    draw.contours(areaInterest, candidates, -1, (1, 2, 255), 2)


def sendControl(placaText):
    payload = {
        'placa': placaText,
        'state': 'input'
    }
    headers = {
        'Content-Type': 'application/json',
        'client-id': client_id,
        'client-secret': client_secret
    }
    return requests.post(
        'http://localhost:8080/api/control', json=payload, headers=headers)


def processResponseTextFromImage(text, placaCurrentRead, areaInterest, candidates):
    if (len(text) >= 6):
        drawBorderOfContours(areaInterest, candidates)
        placaText = text[0:6]
        print("Placa: ", placaText)
        if (placaCurrentRead != placaText):
            response = sendControl(placaText)
            print("Response Backend: ", response.content)
            if (response.status_code == 200):
                placaCurrentRead = placaText
    return placaCurrentRead


def startRecognition():
    placaCurrentRead = ''
    source = cv2.VideoCapture(cameraDevice)  # Open a capture device
    videoCapture(source)
    # Allows you to resize the window
    cv2.namedWindow(windowName, cv2.WINDOW_NORMAL)

    while cv2.waitKey(1) != 27:  # exit by pressing Esc
        # grabs, decodes and returns the next video frame.
        has_frame, frame = source.read()
        if not has_frame:  # exit if no frames has been grabbed
            break

        areaInterest = processFrame(frame)
        candidates = findContoursFromAreaInterest(areaInterest)
        if (len(candidates) > 0):
            placaFromFrame = findRectanglePlaca(candidates, areaInterest)
            placaWhitInvertPixels = invertPixels(placaFromFrame)
            text = getTextFromFramePlaca(placaWhitInvertPixels)
            placaCurrentRead = processResponseTextFromImage(
                text, placaCurrentRead, areaInterest, candidates)
        cv2.imshow(windowName, frame)
    source.release()
    cv2.destroyWindow(windowName)


startRecognition()
