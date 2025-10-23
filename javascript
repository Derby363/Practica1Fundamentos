//clase pieza. Sus atributos son solo el nombre, codigo, fecha y tipo
class Pieza {
    constructor(nombrePieza, codigoPieza, fechaFabricacion, tipoPieza) {
        this.nombrePieza = 0;
        this.codigoPieza = 0;
        this.fechaFabricacion = 0;
        this.tipoPieza = 0;
    }

}

//si pieza.tipo es electrica, entonces sera una PiezaElectrica, que añade el voltaje y la potencia
class PiezaElectrica extends Pieza {
    constructor(nombrePieza,codigoPieza,fechaFabricacion,tipoPieza,potencia, voltaje) {
        super(nombrePieza,codigoPieza,fechaFabricacion,tipoPieza);

        this.potencia = 0;
        this.voltaje = 0;
    }
}

//en el otro caso, será una PiezaMecanica, que añade el material
class PiezaMecanica extends Pieza {
    constructor(nombrePieza,codigoPieza,fechaFabricacion,tipoPieza,material) {
        super(nombrePieza,codigoPieza,fechaFabricacion,tipoPieza);

        this.material = "";
    }
}

//la fabrica genera las piezas aleatoriamente
class Fabrica {

    constructor(randomNum, name, date, type, potencia, voltaje, material) {
        this.randomNum = Math.random() * 100;
        this.name = "";
        this.date = "";
        this.type= "";
        this.potencia = "";
        this.voltaje = "";
        this.material = "";

    }

    //metodo que genera las piezas
    pieceSelection() {
        //primero se les asigna la fecha de fabricación, ya que sean mecánicas o eléctricas será la misma
        const fechaActual = new Date();
        this.date = `${fechaActual.getDate()}/${fechaActual.getMonth() + 1}/${fechaActual.getFullYear()}`;
        //por cada llamada al método se genera un número aleatorio de 9 dígitos
        const randomCode = Math.floor(Math.random() * 900000000) + 100000000;

        //para que las eléctricas tengán un 30% de probabilidad de ser fabricadas, cogemos nuestro número entre 1 y 100 y lo dividomos entre 30 para separar las probabilidades
        if (this.randomNum / 30 <= 1) {

            //se le asigna el tipo y el código de pieza
            this.type = "electrica";
            this.codigoPieza = randomCode + "E";

            //separamos entre 5 posibles nombres
            if (this.randomNum % 5 == 1 ) {
                this.nombrePieza = "Placa ABS";
            } else if (randomNum % 5 == 2) {
                this.nombrePieza = "Centralita Encendido";
            } else if (this.randomNum % 5 == 3) {
                this.nombrePieza = "Bornes Cableado";
            } else if (this.randomNum % 5 == 4) {
                this.nombrePieza = "Alternador";
            } else {
                this.nombrePieza = "Encendido";
            }

            //separamos entre 4 posibles voltajes
            if (this.randomNum % 4 == 1) {

                this.voltaje = "1W";

                //para que las potencias y los voltajes sean equiprobables, se elige la potencia en la misma condición que elige el voltaje
                if (this.randomNum % 4 == 1) {
                    this.potencia = "3.3V";
                } else if (this.randomNum % 4 == 2) {
                    this.potencia = "5V";
                } else if (this.randomNum % 4 == 3) {
                    this.potencia = "12V";
                } else {
                    this.potencia = "240V";
                }


            } else if (this.randomNum % 4 == 2) {
                this.voltaje = "5W";

                if (this.randomNum % 4 == 1) {
                    this.potencia = "3.3V";
                } else if (this.randomNum % 4 == 2) {
                    this.potencia = "5V";
                } else if (this.randomNum % 4 == 3) {
                    this.potencia = "12V";
                } else {
                    this.potencia = "240V";
                }

            } else if (this.randomNum % 4 == 3) {

                this.voltaje = "10W";

                if (this.randomNum % 4 == 1) {
                    this.potencia = "3.3V";
                } else if (this.randomNum % 4 == 2) {
                    this.potencia = "5V";
                } else if (this.randomNum % 4 == 3) {
                    this.potencia = "12V";
                } else {
                    this.potencia = "240V";
                }

            } else {

                this.voltaje = "20W";

                if (this.randomNum % 4 == 1) {
                    this.potencia = "3.3V";
                } else if (this.randomNum % 4 == 2) {
                    this.potencia = "5V";
                } else if (this.randomNum % 4 == 3) {
                    this.potencia = "12V";
                } else {
                    this.potencia = "240V";
                }

            }
            //una vez asignados cada atributo, creamos la instancia de la pieza
            const PiezaElectrica = new PiezaElectrica(this.name, this.codigoPieza, this.date, this.type, this.potencia, this.voltaje);

        } else {

            //seguimos un procedimiento muy parecido a con las piezas eléctricas
            this.type = "mecanica";
            this.codigoPieza = randomCode + "M"

            //elegimos entre 5 posibles nombres
            if (this.randomNum % 5 == 1) {
                this.nombrePieza = "Larguero Inferior";
            } else if (randomNum % 5 == 2) {
                this.nombrePieza="Guardabarros";
            } else if (this.randomNum % 5 == 3) {
                this.nombrePieza = "Larguero Superior";
            } else if (this.randomNum % 5 == 4) {
                this.nombrePieza = "Subchasis";
            } else {
                this.nombrePieza = "Puerta";
            }

            //elegimos entre 3 posibles materiales
            if (this.randomNum % 3 == 1) {
                this.material = "Acero";
            } else if (this.randomNum % 3 == 2) {
                this.material = "Titanio";
            } else {
                this.material = "Carbono";
            }
            
            //creamos la instancia de la pieza
            const PiezaMecanica = new PiezaMecanica(this.name, this.codigoPieza, this.date, this.type, this.material);
                
        }
    }

    
}

class EstacionProcesamiento {

    constructor(procesamiento) {
        this.procesamiento = "";
    }

    //el método procesarPieza identifica el tipo de la pieza para aplicarle el tratamiento correspondiente
    procesarPieza(pieza) {

        if (pieza.type == "electrica") {

            //si es eléctrica elegimos el barnizado dependiendo de su voltaje
            if (pieza.voltaje == "1W" || pieza.voltaje == "5W") {
                this.procesamiento = "Barnizada Normal";
            } else {
                this.procesamiento = "Barnizada especial";
            }

        } else {

            //si es mecanica elegimos el acabado dependiendo del material
            if (pieza.material = "Acero") {
                this.procesamiento = "Galvanizada";
            } else if (pieza.material = "Titanio") {
                this.procesamiento = "Pulida";
            } else {
                this.procesamiento = "Pintada";
            }

        }

    }
}



