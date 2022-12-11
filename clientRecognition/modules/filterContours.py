import cv2
import numpy as np

"""cv2.arcLength()
método se utiliza para calcular el perímetro del contorno o una longitud de curva.

Sintaxis: cv2.arcLength(InputArray 	curve, bool 	closed )

Parámetros:
curve: Vector de entrada de puntos 2D, almacenado en std::vector o Mat
closed: Bandera que indica si la curva está cerrada o no.

Nota: este perímetro se usa para calcular el valor épsilon de la cv2.approxPolyDP()
"""


def _calculate_perimeter(contour):
    return cv2.arcLength(contour, True)


"""cv2.approxPolyDP()
método se utiliza para aproxima una curva o un polígono con otra curva/polígono con menos vértices para que la distancia entre ellos sea menor o igual a la precisión especificada.

Sintaxis: cv2.approxPolyDP(InputArray 	curve,OutputArray 	approxCurve, double 	epsilon, bool 	closed )

Parámetros:
curve: Vector de entrada de puntos 2D, almacenado en std::vector o Mat
approxCurve: 	Resultado de la aproximación. El tipo debe coincidir con el tipo de la curva de entrada.
epsilon: Parámetro que especifica la precisión de la aproximación. Esta es la distancia máxima entre la curva original y su aproximación.
closed: Si es verdadero, la curva aproximada se cierra (su primer y último vértices están conectados). De lo contrario, no está cerrado.

"""


def _precision_approximate_shape(contour, epsilon):
    return cv2.approxPolyDP(contour, epsilon, True)


"""cv2.boundingRect()
método se utiliza para crear un rectángulo aproximado junto con la imagen.

Sintaxis: cv2.boundingRect(	InputArray 	array)

Parámetros:
array: ngrese una imagen en escala de grises o un conjunto de puntos 2D, almacenado en std::vector o Mat


Valores retornados:
coordenada x
coordenada Y
Ancho
Altura
"""


def create_rectangle(approxPolyDP):
    return cv2.boundingRect(approxPolyDP)




def contour_rectangle(contours, placa_ratio,placa_width_max,placa_width_min,placa_height_max,placa_height_min):
    candidates = []
    for contour in contours:
        epsilon = 0.02*_calculate_perimeter(contour)
        approx = _precision_approximate_shape(contour, epsilon)
        x, y, w, h = create_rectangle(approx)
        aspect_ratio = float(w)/h
        if (np.isclose(aspect_ratio, placa_ratio, atol=0.6) and (placa_width_max > w > placa_width_min) and (placa_height_max > h > placa_height_min) and (len(approx) == 4)):
            candidates.append(contour)
    return candidates
