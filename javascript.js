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
        // Use the provided potencia and voltaje values
        this.potencia = potencia;
        this.voltaje = voltaje;
    }
}

    // --- Utilities and DOM wiring ---
    // Count pieces (matches the original logic from the inline script)
    function contarPiezas(piezas) {
        let electricas = 0;
        let mecanicas = 0;

        piezas.forEach(pieza => {
            // Some piece constructors set `tipoPieza`/`type` inconsistently; check both
            const tipo = pieza.tipoPieza || pieza.type;
            if (tipo === "electrica") {
                electricas++;
            } else if (tipo === "mecanica") {
                mecanicas++;
            }
        });

        return { electricas, mecanicas };
    }

    // Wire buttons after DOM loads
    document.addEventListener('DOMContentLoaded', () => {
        const output = document.getElementById('output');
        const stats = document.getElementById('stats');

        const runGeneration = (count) => {
            const fabrica = new Fabrica();
            let piezasGeneradas = [];

            for (let i = 0; i < count; i++) {
                piezasGeneradas = piezasGeneradas.concat(fabrica.pieceSelection());
            }

            const { electricas, mecanicas } = contarPiezas(piezasGeneradas);
            if (output) output.innerHTML = `Se generaron ${count} piezas.`;
            if (stats) stats.innerHTML = `Piezas eléctricas: ${electricas} <br> Piezas mecánicas: ${mecanicas}`;
        };

        const btn100 = document.getElementById('btn-100');
        const btn1000 = document.getElementById('btn-1000');

        if (btn100) btn100.addEventListener('click', () => runGeneration(100));
        if (btn1000) btn1000.addEventListener('click', () => runGeneration(1000));
    });

//en el otro caso, será una PiezaMecanica, que añade el material
class PiezaMecanica extends Pieza {
    constructor(nombrePieza,codigoPieza,fechaFabricacion,tipoPieza,material) {
        super(nombrePieza,codigoPieza,fechaFabricacion,tipoPieza);
        this.material = material;
    }
}

//la fabrica genera las piezas aleatoriamente
class Fabrica {
    constructor() {
        // no persistent state needed; generation is stateless
    }

    // metodo que genera las piezas (devuelve un array con 1 pieza)
    pieceSelection() {
        const piezas = [];

        const fechaActual = new Date();
        const dateStr = `${fechaActual.getDate()}/${fechaActual.getMonth() + 1}/${fechaActual.getFullYear()}`;

        // código único aleatorio de 9 dígitos
        const randomCode = Math.floor(Math.random() * 900000000) + 100000000;

        // probabilidad: 30% eléctrica, 70% mecánica
        const prob = Math.floor(Math.random() * 100) + 1; // 1..100

        if (prob <= 30) {
            const tipo = "electrica";
            const codigo = randomCode + "E";

            // nombres posibles
            const nombres = ["Placa ABS", "Centralita Encendido", "Bornes Cableado", "Alternador", "Encendido"];
            const nombre = nombres[Math.floor(Math.random() * nombres.length)];

            // voltajes y potencias posibles
            const voltajes = ["1W", "5W", "10W", "20W"];
            const potencias = ["3.3V", "5V", "12V", "240V"];
            const voltaje = voltajes[Math.floor(Math.random() * voltajes.length)];
            const potencia = potencias[Math.floor(Math.random() * potencias.length)];

            piezas.push(new PiezaElectrica(nombre, codigo, dateStr, tipo, potencia, voltaje));
        } else {
            const tipo = "mecanica";
            const codigo = randomCode + "M";

            const nombres = ["Larguero Inferior", "Guardabarros", "Larguero Superior", "Subchasis", "Puerta"];
            const nombre = nombres[Math.floor(Math.random() * nombres.length)];

            const materiales = ["Acero", "Titanio", "Carbono"];
            const material = materiales[Math.floor(Math.random() * materiales.length)];

            piezas.push(new PiezaMecanica(nombre, codigo, dateStr, tipo, material));
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
        // Use the unified property name `tipoPieza`
        if (pieza.tipoPieza == "electrica") {
            // si es eléctrica elegimos el barnizado dependiendo de su voltaje
            if (pieza.voltaje == "1W" || pieza.voltaje == "5W") {
                this.procesamiento = "Barnizada Normal";
            } else {
                this.procesamiento = "Barnizada especial";
            }
        } else if (pieza.tipoPieza == "mecanica") {
            // si es mecanica elegimos el acabado dependiendo del material
            if (pieza.material == "Acero") {
                this.procesamiento = "Galvanizada";
            } else if (pieza.material == "Titanio") {
                this.procesamiento = "Pulida";
            } else {
                this.procesamiento = "Pintada";
            }
        } else {
            this.procesamiento = "Desconocido";
        }

    }
}



