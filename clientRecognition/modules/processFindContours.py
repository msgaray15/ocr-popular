import cv2

"""cv2.cvtColor()
método se utiliza para convertir una imagen de un espacio de color a otro.

Sintaxis: cv2.cvtColor(src, code [, dst [, dstCn]])

Parámetros:
src: Es la imagen cuyo espacio de color se va a cambiar.
código: es el código de conversión del espacio de color.
dst: es la imagen de salida del mismo tamaño y profundidad que la imagen src. Es un parámetro opcional.
dstCn: Es el número de canales en la imagen de destino. Si el parámetro es 0, el número de canales se deriva automáticamente de src y código. Es un parámetro opcional.

Valor de retorno: Devuelve una imagen.
"""


def _gray_scale(img):
    return cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)


"""cv2.GaussianBlur()
método se utiliza para aplicar el suavizado gaussiano en la imagen de origen de entrada

Sintaxis: cv2.GaussianBlur(src, ksize, sigmaX[, dst[, sigmaY[, borderType=BORDER_DEFAULT]]] )

Parámetros:
src: imagen de entrada
dst: imagen de salida
ksize: Tamaño de kernel gaussiano. [anchura altura]. alto y ancho deben ser impares y pueden tener valores diferentes. Si ksize se establece en [0 0], entonces ksize se calcula a partir de valores sigma.
sigmaX: Desviación estándar del núcleo a lo largo del eje X (dirección horizontal)
sigmaY: Desviación estándar del kernel a lo largo del eje Y (dirección vertical). Si sigmaY=0, entonces se toma el valor sigmaX para sigmaY
borderType: Especifica los límites de la imagen mientras se aplica kernel en los bordes de la imagen. Los valores posibles son: cv.BORDER_CONSTANT cv.BORDER_REPLICATE cv.BORDER_REFLECT cv.BORDER_WRAP cv.BORDER_REFLECT_101 cv.BORDER_TRANSPARENT cv.BORDER_REFLECT101 cv.BORDER_DEFAULT cv.BORDER_ISOLATED
"""


def _gaussian_blur(img):
    return cv2.GaussianBlur(_gray_scale(img), (5, 5), 0)


"""cv2.Canny()
método se utiliza para detectar los bordes de una imagen.

Sintaxis: cv2.Canny(image, T_lower, T_upper, aperture_size, L2Gradient)

Parámetros:
image: imagen de entrada a la que se aplicará el filtro Canny
T_lower: Valor de umbral inferior en Hysteresis Thresholding
T_upper: Valor de umbral superior en Hysteresis Thresholdin
aperture_size: Tamaño de apertura del filtro Sobel.
L2Gradient: Parámetro booleano utilizado para mayor precisión en el cálculo de Edge Gradient.
"""


def _moothing_edge(img):
    return cv2.Canny(_gaussian_blur(img), 100, 200)


"""ccv2.findContours()
método se utiliza para encontrar los contornos de los objetos detectados.

Sintaxis: cv2.findContours(image, mode, method[, contours[, hierarchy[, offset ]]])  

Parámetros:
image: imagen que busca el contorno
mode: representa el modo de recuperación del contorno. Hay cuatro tipos (la nueva interfaz cv2 presentada en este artículo):
cv2.RETR_EXTERNAL significa solo detectar el contorno exterior
El contorno detectado por cv2.RETR_LIST no establece una relación jerárquica
cv2.RETR_CCOMP establece dos niveles de contorno, la capa superior es el límite externo y la capa interna es la información del límite del agujero interno. Si hay un objeto conectado en el orificio interno, el límite de este objeto también está en la capa superior.
cv2.RETR_TREE establece el esquema de una estructura de árbol jerárquica.
method: método aproximado del contorno.
cv2.CHAIN_APPROX_NONE almacena todos los puntos de contorno, la diferencia de posición de píxeles entre dos puntos adyacentes no es más de 1, es decir, max (abs (x1-x2), abs (y2-y1)) == 1
cv2.CHAIN_APPROX_SIMPLE comprime los elementos en las direcciones horizontal, vertical y diagonal, y solo retiene las coordenadas finales en esa dirección. Por ejemplo, un contorno rectangular solo necesita 4 puntos para guardar la información del contorno
cv2.CHAIN_APPROX_TC89_L1, CV_CHAIN_APPROX_TC89_KCOS usa el algoritmo de aproximación de cadena de teh-Chinl

Valor de retorno: devuelve dos valores, uno es el contorno mismo y el otro es la propiedad correspondiente a cada contorno.
"""


def find_contours(img):
    return cv2.findContours(_moothing_edge(img), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

def invert_image(img):
    return cv2.bitwise_not(_moothing_edge(img))