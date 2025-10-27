//clase pieza. Sus atributos son solo el nombre, codigo, fecha y tipo
class Pieza {
   constructor(nombrePieza, codigoPieza, fechaFabricacion, tipoPieza) {
        this.nombrePieza = nombrePieza;
        this.codigoPieza = codigoPieza;
        this.fechaFabricacion = fechaFabricacion;
        this.tipoPieza = tipoPieza;
    }

}

//si pieza.tipo es electrica, entonces sera una PiezaElectrica, que añade el voltaje y la potencia
class PiezaElectrica extends Pieza {
    constructor(nombrePieza,codigoPieza,fechaFabricacion,tipoPieza,potencia, voltaje) {
        super(nombrePieza,codigoPieza,fechaFabricacion,tipoPieza);
        // Usar los parámetros pasados para inicializar la pieza eléctrica
        this.potencia = potencia;
        this.voltaje = voltaje;
    }
}

//en el otro caso, será una PiezaMecanica, que añade el material
class PiezaMecanica extends Pieza {
    constructor(nombrePieza,codigoPieza,fechaFabricacion,tipoPieza,material) {
        super(nombrePieza,codigoPieza,fechaFabricacion,tipoPieza);
        // Usar el material pasado
        this.material = material;
    }
}

//la fabrica genera las piezas aleatoriamente
class Fabrica {

    constructor(randomNum, name, date, type, potencia, voltaje, material) {
        // No necesitamos parámetros en el constructor; la selección de piezas se hace en pieceSelection
        this.randomNum = null;
        this.name = "";
        this.date = "";
        this.type= "";
        this.potencia = "";
        this.voltaje = "";
        this.material = "";

    }

    //metodo que genera las piezas
    pieceSelection() {

        //array de piezas creadas
        let piezas = [];

        // Fecha de fabricación
        const fechaActual = new Date();
        const fechaStr = `${fechaActual.getDate()}/${fechaActual.getMonth() + 1}/${fechaActual.getFullYear()}`;
        // código aleatorio de 9 dígitos
        const randomCode = Math.floor(Math.random() * 900000000) + 100000000;
        // número para decidir tipo (1-100)
        const randomNum = Math.floor(Math.random() * 100) + 1;

        if (randomNum <= 30) {
            // eléctrica (30%)
            const tipo = 'electrica';
            const codigoPieza = `${randomCode}E`;

            // nombres posibles
            const nombres = ["Placa ABS", "Centralita Encendido", "Bornes Cableado", "Alternador", "Encendido"];
            const nombrePieza = nombres[randomNum % nombres.length];

            // voltaje y potencia (selección aleatoria)
            const voltajes = ["1W", "5W", "10W", "20W"];
            const potencias = ["3.3V", "5V", "12V", "240V"];
            const idx = randomNum % 4;
            const voltaje = voltajes[idx];
            const potencia = potencias[idx];

            piezas.push(new PiezaElectrica(nombrePieza, codigoPieza, fechaStr, tipo, potencia, voltaje));
        } else {
            // mecánica (70%)
            const tipo = 'mecanica';
            const codigoPieza = `${randomCode}M`;

            const nombres = ["Larguero Inferior", "Guardabarros", "Larguero Superior", "Subchasis", "Puerta"];
            const nombrePieza = nombres[randomNum % nombres.length];

            const materiales = ["Acero", "Titanio", "Carbono"];
            const material = materiales[randomNum % materiales.length];

            piezas.push(new PiezaMecanica(nombrePieza, codigoPieza, fechaStr, tipo, material));
        }

        return piezas;
    }

    

    
}

class EstacionProcesamiento {

    constructor(procesamiento) {
        this.procesamiento = "";
    }

    //el método procesarPieza identifica el tipo de la pieza para aplicarle el tratamiento correspondiente
    procesarPieza(pieza) {

        if (pieza.tipoPieza == "electrica") {

            //si es eléctrica elegimos el barnizado dependiendo de su voltaje
            if (pieza.voltaje == "1W" || pieza.voltaje == "5W") {
                this.procesamiento = "Barnizada Normal";
            } else {
                this.procesamiento = "Barnizada especial";
            }

        } else {

            //si es mecanica elegimos el acabado dependiendo del material
            if (pieza.material == "Acero") {
                this.procesamiento = "Galvanizada";
            } else if (pieza.material == "Titanio") {
                this.procesamiento = "Pulida";
            } else {
                this.procesamiento = "Pintada";
            }

        }

    }
}



