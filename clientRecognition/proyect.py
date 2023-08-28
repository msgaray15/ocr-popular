import cv2 as cv
import pytesseract
import requests
import json
import math

with open('config.json', 'r') as file:
    config = json.load(file)


def startRecognition():
    cameraDevice = config['startRecognition']['cameraDevice']
    frameToProcess = config['startRecognition']['frameToProcess']
    minCharactersToSendControl = config['startRecognition']['minCharactersToSendControl']
    characterRangeStart = config['startRecognition']['characterRange']['start']
    characterRangeEnd = config['startRecognition']['characterRange']['end']
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
            print("\nProcesando Nuevo Fotograma:")
            areaInterest = areaOfInterestBetweenTheParts(frame)
            candidates = findContoursFromAreaInterest(areaInterest)
            count_fps = 0

            if len(candidates) > 0:
                contoursRectangle = filterContoursByRectangle(
                    candidates)
                # Quitar
                cv.drawContours(
                    areaInterest, contoursRectangle, -1, (1, 2, 255), 2)
                print("Cantidad de contornos rectangulos: ",
                      len(contoursRectangle))
                for item in contoursRectangle:
                    frameOfTheContoursRectangle = getFrameOfTheContour(
                        item, areaInterest
                    )
                    text = getTextFromFramePlaca(frameOfTheContoursRectangle)
                    print(" └> texto:", text)

                    if len(text) >= minCharactersToSendControl and text != placaCurrentRead:
                        text = text[characterRangeStart:characterRangeEnd]
                        try:
                            responseBackend = sendControl(text)
                            print("   > Response Backend: ",
                              responseBackend.content)
                            if responseBackend.status_code == 200:
                                placaCurrentRead = text
                        except:
                            print("Error al comunicarse con el Backend")
                            

            # Quitar
            cv.imshow("areaInterest", areaInterest)

    source.release()


def areaOfInterestBetweenTheParts(frame):
    parts_nxn = config['areaOfInterestBetweenTheParts']['parts_nxn']
    positionOfInterest = config['areaOfInterestBetweenTheParts']['positionOfInterest']

    if positionOfInterest < 1 or positionOfInterest > pow(parts_nxn, 2):
        print("areaOfInterestBetweenTheParts", "Error: positionOfInterest debe de estar en el rango de " +
              str(parts_nxn) + "x" + str(parts_nxn))
        print(" └> Procesando Fotograma Completo")
        return frame

    high, width, c = frame.shape
    widthx3 = int(width / parts_nxn)
    heightx3 = int(high / parts_nxn)
    positionOfInterest = positionOfInterest - 1
    heightStart = math.trunc(positionOfInterest/parts_nxn)
    heightEnd = heightStart + 1
    widthStart = positionOfInterest % parts_nxn
    widthEnd = widthStart + 1

    return frame[heightx3*heightStart: heightx3*heightEnd, widthx3*widthStart: widthx3*widthEnd]


def findContoursFromAreaInterest(frame):
    moothingEdge = getMoothingEdge(frame)
    cnts, _ = cv.findContours(
        moothingEdge, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE)
    return cnts


def getMoothingEdge(frame):
    thresh = config['threshold']['thresh']
    maxval = config['threshold']['maxval']
    grayScale = cv.cvtColor(frame, cv.COLOR_BGR2GRAY)
    ret, threshold = cv.threshold(grayScale, thresh, maxval, cv.THRESH_BINARY)
    return threshold


def filterContoursByRectangle(candidates):
    contoursRectangle = []
    percentageOfEpsilon = config['filterContoursByRectangle']['percentageOfEpsilon']
    minWidth = config['filterContoursByRectangle']['minWidth']
    minHeight = config['filterContoursByRectangle']['minHeight']
    aspectRatioMin = config['filterContoursByRectangle']['aspectRatio']['min']
    aspectRatioMax = config['filterContoursByRectangle']['aspectRatio']['max']

    for contour in candidates:
        calculatePerimeter = cv.arcLength(contour, True)
        epsilon = percentageOfEpsilon * calculatePerimeter
        approx = cv.approxPolyDP(contour, epsilon, True)
        x, y, w, h = cv.boundingRect(approx)

        if len(approx) == 4 and w >= minWidth and h >= minHeight:
            aspectRatio = float(w) / h
            if aspectRatio >= aspectRatioMin and aspectRatio <= aspectRatioMax:
                contoursRectangle.append(contour)

    return contoursRectangle


def getFrameOfTheContour(contour, frame):
    xCoordinate, yCoordinate, width, height = cv.boundingRect(contour)
    return frame[yCoordinate: yCoordinate + height, xCoordinate: xCoordinate + width]


def getTextFromFramePlaca(frame):
    moothingEdge = getMoothingEdge(frame)
    alphanumeric = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    options = "-c tessedit_char_whitelist={}".format(alphanumeric)
    options += " --psm {}".format(7)
    
    return pytesseract.image_to_string(moothingEdge, config=options)


def sendControl(text):
    path = config['sendControl']['path']
    client_id = config['sendControl']['client_id']
    client_secret = config['sendControl']['client_secret']
    statusToSend = config['sendControl']['statusToSend']
    payload = {
        'placa': text,
        'state': statusToSend
    }
    headers = {
        'Content-Type': 'application/json',
        'client-id': client_id,
        'client-secret': client_secret
    }

    return requests.post(path, json=payload, headers=headers)


startRecognition()
