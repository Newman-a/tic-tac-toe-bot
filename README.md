# Tic-Tac-Toe Game

Este es un simple juego de Tic-Tac-Toe implementado en HTML, CSS y JavaScript.

## Descripción

En esta versión del Tic-Tac-Toe, se ha incorporado un bot que utiliza el algoritmo **Minimax**, lo que lo hace prácticamente **imbatible**. El bot siempre tomará la mejor decisión posible, asegurando que, en el mejor de los casos, el juego termine en un empate. Si cometes un error, el bot aprovechará la oportunidad para ganar.

## Características

- **Interfaz sencilla y responsive**: Diseño limpio y fácil de usar.
- **Bot inteligente**: Utiliza el algoritmo Minimax para tomar decisiones óptimas.
- **Imposible de ganar**: Si juegas perfectamente, el juego terminará en empate. Si cometes un error, el bot ganará.
- **Reinicio rápido**: Puedes reiniciar el juego en cualquier momento.

## ¿Cómo jugar?

1. **Inicia el juego**: Haz clic en el botón "Jugar" para comenzar.
2. **Turnos**:
   - Tú juegas como **X**.
   - El bot juega como **O** y siempre responde de manera óptima.
3. **Objetivo**: Forma una línea horizontal, vertical o diagonal con tus movimientos.
4. **Resultado**:
   - Si ganas (lo cual es imposible si el bot juega correctamente), se mostrará un mensaje de victoria.
   - Si el bot gana, se mostrará un mensaje de derrota.
   - Si el juego termina en empate, se mostrará un mensaje de empate.

## Tecnologías utilizadas

- **HTML**: Estructura del juego.
- **CSS**: Diseño y estilos.
- **JavaScript**: Lógica del juego y algoritmo Minimax.

## Instalación

No es necesaria ninguna instalación. Simplemente abre el archivo `index.html` en tu navegador para comenzar a jugar.

```bash
# Clona el repositorio (si lo tienes en GitHub)
git clone https://github.com/Newman-a/tic-tac-toe-bot.git

# Navega al directorio del proyecto
cd tic-tac-toe

# Abre el archivo index.html en tu navegador
open index.html
```
