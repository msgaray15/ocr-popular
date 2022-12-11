import cv2

"""cv2.rectangle()
método se utiliza para dibujar un rectángulo en cualquier imagen

Sintaxis: cv2.rectangle(imagen, punto_inicio, punto_final, color, grosor)

Parámetros:
imagen: Es la imagen sobre la que se va a dibujar el rectángulo.
start_point: Son las coordenadas iniciales del rectángulo. Las coordenadas se representan como tuplas de dos valores, es decir( valor de la coordenada X , valor de la coordenada Y ).
end_point: Son las coordenadas finales del rectángulo. Las coordenadas se representan como tuplas de dos valores, es decir( valor de la coordenada X , valor de la coordenada Y ).
color: es el color de la línea del borde del rectángulo que se va a dibujar. Para BGR , pasamos una tupla. por ejemplo:(255, 0, 0) para color azul.
grosor: es el grosor de la línea del borde del rectángulo en px. Un grosor de -1 px llenará la forma del rectángulo con el color especificado.

Valor de retorno: Devuelve una imagen.
"""


def rectangle(img, start_point, end_point, color, thickness):
    return cv2.rectangle(img, start_point, end_point, color, thickness)


"""cv2.drawContours()
método se utiliza para dibujar un rectángulo en cualquier imagen

Sintaxis: cv2.drawContours(	InputOutputArray 	image,
InputArrayOfArrays 	contours,
int 	contourIdx,
const Scalar & 	color,
int 	thickness = 1,
int 	lineType = LINE_8,
InputArray 	hierarchy = noArray(),
int 	maxLevel = INT_MAX,
Point 	offset = Point())

Parámetros:

image:		Imagen de destino.
contours:	Todos los contornos de entrada. Cada contorno se almacena como un vector de puntos.
contourIdx:	Parámetro que indica un contorno a dibujar. Si es negativo, se dibujan todos los contornos.
color:	Color de los contornos.
thickness:	Grosor de las líneas con las que se dibujan los contornos. Si es negativo (por ejemplo, thick= FILLED ), se dibujan los interiores del contorno.
lineType:	Conectividad de línea. Ver tipos de línea
hierarchy:	Información opcional sobre la jerarquía. Solo es necesario si desea dibujar solo algunos de los contornos (consulte maxLevel).
maxLevel:   Nivel máximo para contornos dibujados. Si es 0, solo se dibuja el contorno especificado. Si es 1, la función dibuja el(los) contorno(s) y todos los contornos anidados. Si es 2, la función dibuja los contornos, todos los contornos anidados, todos los contornos anidados, etc. Este parámetro solo se tiene en cuenta cuando hay jerarquía disponible.
offset:	    Parámetro de cambio de contorno opcional. Desplazar todos los contornos dibujados por el especificadocompensación =(rex , rey)
"""


def contours(image, contours, contourIdx, color, thickness):
    cv2.drawContours(image, contours, contourIdx, color, thickness)
