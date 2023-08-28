# sistema_reconocimiento_placa_tiempo_real
sistema de reconocimiento de placas vehiculares mediante técnicas de machine learning para el control de acceso de vehículos a la universidad popular del cesar seccional aguachica 


#cameraDevice = "rtsp://admin:Unicesar-12345@192.168.0.100:554"
#1 -> frame[heightx3*0 : heightx3*1, widthx3*0 : widthx3*1]
    #2 -> frame[heightx3*0 : heightx3*1, widthx3*1 : widthx3*2]
    #3 -> frame[heightx3*0 : heightx3*1, widthx3*2 : widthx3*3]
    #4 -> frame[heightx3*1 : heightx3*2, widthx3*0 : widthx3*1]

    #return frame[heightx3 : heightx3 * 2, widthx3 : widthx3 * 2]

    '''
    pytesseract.pytesseract.tesseract_cmd = (
        r"C:\Program Files\Tesseract-OCR\tesseract.exe"
    )
    '''