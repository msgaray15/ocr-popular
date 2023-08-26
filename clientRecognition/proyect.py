import cv2 as cv
import pytesseract
import requests


def startRecognition():
    cameraDevice = 0
    frameToProcess = 10
    count_fps = 0
    placaCurrentRead = ""
    source = cv.VideoCapture(cameraDevice)

    if not source.isOpened():
        print("Cannot open camera")
        exit()

    print(
        "Configuración: ",
        {"Camara fuente": cameraDevice, "Fotograma a Procesar": frameToProcess},
    )

    while cv.waitKey(1) != 27:
        has_frame, frame = source.read()
        count_fps = count_fps + 1

        if has_frame and count_fps == frameToProcess:
            areaInterest = areaOfInterestFromThe9Parts(frame)
            #del frame, has_frame
            candidates = findContoursFromAreaInterest(areaInterest)
            count_fps = 0

            if len(candidates) > 0:
                contoursRectangle = filterContoursByRectangle(candidates, areaInterest)
                #Quitar
                cv.drawContours(areaInterest, contoursRectangle, -1, (1, 2, 255), 2)
                print("\nCantidad de contornos rectangulos: ", len(contoursRectangle))
                for item in contoursRectangle:
                    frameOfTheContoursRectangle = getFrameOfTheContour(
                        item, areaInterest
                    )
                    text = getTextFromFramePlaca(frameOfTheContoursRectangle)
                    print(" └> texto:", text)

                    if len(text) >= 5 and text != placaCurrentRead:
                        text = text[0:6]
                        '''responseBackend = sendControl(text)
                        print("   > Response Backend: " , responseBackend.content)
                        if responseBackend.status_code == 200:
                            placaCurrentRead = text
                            '''
            #Quitar
            cv.imshow("areaInterest", areaInterest)

    source.release()


def areaOfInterestFromThe9Parts(frame):
    high, width, c = frame.shape
    widthx3 = int(width / 3)
    heightx3 = int(high / 3)
    return frame[heightx3 : heightx3 * 2, widthx3 : widthx3 * 2]


def findContoursFromAreaInterest(frame):
    moothingEdge = getMoothingEdge(frame)
    cnts, _ = cv.findContours(moothingEdge, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE)
    return cnts


def getMoothingEdge(frame):
    grayScale = cv.cvtColor(frame, cv.COLOR_BGR2GRAY)
    ret, thresh = cv.threshold(grayScale, 150, 255, cv.THRESH_BINARY)
    return thresh


def filterContoursByRectangle(candidates, areaInterest):
    contoursRectangle = []

    for contour in candidates:
        calculatePerimeter = cv.arcLength(contour, True)
        epsilon = 0.04 * calculatePerimeter
        approx = cv.approxPolyDP(contour, epsilon, True)
        x, y, w, h = cv.boundingRect(approx)

        if len(approx) == 4:
            aspectRatio = float(w) / h
            if aspectRatio >= 2 and aspectRatio <= 2.4:
                contoursRectangle.append(contour)

    return contoursRectangle


def getFrameOfTheContour(contour, frame):
    xCoordinate, yCoordinate, width, height = cv.boundingRect(contour)
    return frame[yCoordinate : yCoordinate + height, xCoordinate : xCoordinate + width]


def getTextFromFramePlaca(frame):
    moothingEdge = getMoothingEdge(frame)
    alphanumeric = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    options = "-c tessedit_char_whitelist={}".format(alphanumeric)
    options += " --psm {}".format(7)
    pytesseract.pytesseract.tesseract_cmd = (
        r"C:\Program Files\Tesseract-OCR\tesseract.exe"
    )
    return pytesseract.image_to_string(moothingEdge, config=options)

def sendControl(text):
    client_id = 'prueba'
    client_secret = 'prueba'
    payload = {
        'placa': text,
        'state': 'input'
    }
    headers = {
        'Content-Type': 'application/json',
        'client-id': client_id,
        'client-secret': client_secret
    }

    return requests.post('http://localhost:8080/api/control', json=payload, headers=headers)

startRecognition()
