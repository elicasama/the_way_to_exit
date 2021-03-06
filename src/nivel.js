import configuracion from "./configuracion";
import contexto from "./contexto";
import Escenario from "./Escenario";
import Antorcha from "./Antorcha";
import Enemigo from "./Enemigo";

class Nivel {
  constructor() {
    this.areaDeJuego = configuracion.areaDeJuego;
    this.contexto = contexto;
    this.enemigos = [];
    this.antorchas = [];

    this.dibujar();
  }

  crearEscenario() {
    return new Escenario(
      configuracion.nivel.cuadrilla,
      configuracion.nivel.tileMap,
      this.contexto,
      configuracion.altoDeLaFicha,
      configuracion.anchoDeLaFicha
    );
  }

  agregarAntorchas() {
    return this.agregarElementos(Antorcha, this.antorchas, [
      [0, 0],
      [2, 0],
      [9, 7],
      [11, 7],
    ]);
  }

  dibujarAntorchas() {
    for (let a = 0; a < this.antorchas.length; a++) {
      this.antorchas[a].dibujar();
    }
  }

  agregarEnemigos() {
    return this.agregarElementos(Enemigo, this.enemigos, [
      [11, 2],
      [6, 2],
      [2, 8],
    ]);
  }

  agregarElementos(Elemento, elementos, posiciones) {
    posiciones.forEach(([x, y]) => {
      elementos.push(new Elemento(x, y, this.contexto));
    });

    return elementos;
  }

  dibujarEnemigos(personajePrincipal) {
    for (let c = 0; c < this.enemigos.length; c++) {
      this.enemigos[c].moverse(personajePrincipal);
      this.enemigos[c].dibujar();
    }
  }

  dibujar() {
    this.crearEscenario();
    this.agregarAntorchas();
    this.agregarEnemigos();
  }
}

export default new Nivel();
