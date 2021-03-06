import configuracion from "./configuracion";
import direcciones from "./direcciones";
import constantes from "./constantes";

class Enemigo {
  constructor(posicionX, posicionY, contexto) {
    this.x = posicionX;
    this.y = posicionY;
    this.contexto = contexto;
    this.retraso = 30;
    this.contador = 0;
  }

  dibujar() {
    this.contexto.drawImage(
      configuracion.nivel.tileMap,
      0,
      32,
      32,
      32,
      configuracion.anchoDeLaFicha * this.x,
      configuracion.altoDeLaFicha * this.y,
      configuracion.anchoDeLaFicha,
      configuracion.altoDeLaFicha,
      (this.direccion = this.obtenerNuevoDestino())
    );
  }

  puedePasar(x, y) {
    return configuracion.nivel.cuadrilla[y][x] === constantes.pared;
  }

  obtenerNuevoDestino() {
    return Math.floor(Math.random() * 4);
  }

  moverse(personajePrincipal) {
    this.obtenerNuevoDestino();

    personajePrincipal.colisionaConElEnemigo(this.x, this.y);

    if (this.contador < this.retraso) {
      this.contador++;
    } else {
      this.contador = 0;

      // verificamos que no se ponga en las paredes o zonas en las cuales no se podría pasar

      Object.values(direcciones).forEach(([dx, dy], indice) => {
        if (this.direccion === indice) {
          if (!this.puedePasar(this.x + dx, this.y + dy)) {
            this.x += dx;
            this.y += dy;
          } else {
            this.obtenerNuevoDestino();
          }
        }
      });
    }
  }
}

export default Enemigo;
