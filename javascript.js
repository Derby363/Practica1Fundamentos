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

            // Procesar cada pieza y asignar el tratamiento
            const estacion = new EstacionProcesamiento();
            piezasGeneradas.forEach(p => {
                estacion.procesarPieza(p);
                // store the tratamiento on the pieza for display
                p.procesamiento = estacion.procesamiento;
            });

            const { electricas, mecanicas } = contarPiezas(piezasGeneradas);

            // Build a summary of properties (distributions)
            const voltajeCounts = {};
            const potenciaCounts = {};
            const materialCounts = {};

            piezasGeneradas.forEach(p => {
                if ((p.tipoPieza || p.type) === 'electrica') {
                    const v = p.voltaje || 'Desconocido';
                    const pt = p.potencia || 'Desconocida';
                    voltajeCounts[v] = (voltajeCounts[v] || 0) + 1;
                    potenciaCounts[pt] = (potenciaCounts[pt] || 0) + 1;
                } else if ((p.tipoPieza || p.type) === 'mecanica') {
                    const m = p.material || 'Desconocido';
                    materialCounts[m] = (materialCounts[m] || 0) + 1;
                }
            });

            const formatCounts = (obj) => {
                const keys = Object.keys(obj);
                if (keys.length === 0) return '-';
                return keys.map(k => `${k} (${obj[k]})`).join(', ');
            };

            let summaryHtml = `<div style="text-align:left; margin-bottom:8px;"><strong>Resumen:</strong><br>`;
            summaryHtml += `Total: ${count} piezas<br>`;
            summaryHtml += `Eléctricas: ${electricas} — Voltajes: ${formatCounts(voltajeCounts)}; Potencias: ${formatCounts(potenciaCounts)}<br>`;
            summaryHtml += `Mecánicas: ${mecanicas} — Materiales: ${formatCounts(materialCounts)}</div>`;

            // Build a detailed HTML table showing the treatment of every piece
            let detailsHtml = `<table style="width:100%; margin-top:10px; border-collapse:collapse;">`;
            detailsHtml += `<thead><tr style="text-align:left; background:#efefef;"><th style="padding:6px;border:1px solid #ddd;">Nombre</th><th style="padding:6px;border:1px solid #ddd;">Código</th><th style="padding:6px;border:1px solid #ddd;">Tipo</th><th style="padding:6px;border:1px solid #ddd;">Voltaje</th><th style="padding:6px;border:1px solid #ddd;">Potencia</th><th style="padding:6px;border:1px solid #ddd;">Material</th><th style="padding:6px;border:1px solid #ddd;">Tratamiento</th></tr></thead><tbody>`;

            piezasGeneradas.forEach(p => {
                const nombre = p.nombrePieza || '-';
                const codigo = p.codigoPieza || '-';
                const tipo = p.tipoPieza || p.type || '-';
                const voltaje = p.voltaje || '-';
                const potencia = p.potencia || '-';
                const material = p.material || '-';
                const tratamiento = p.procesamiento || '-';

                detailsHtml += `<tr><td style="padding:6px;border:1px solid #ddd;">${nombre}</td><td style="padding:6px;border:1px solid #ddd;">${codigo}</td><td style="padding:6px;border:1px solid #ddd;">${tipo}</td><td style="padding:6px;border:1px solid #ddd;">${voltaje}</td><td style="padding:6px;border:1px solid #ddd;">${potencia}</td><td style="padding:6px;border:1px solid #ddd;">${material}</td><td style="padding:6px;border:1px solid #ddd;">${tratamiento}</td></tr>`;
            });

            detailsHtml += `</tbody></table>`;

            // Render a compact summary and a toggle button to show the full details
            if (output) {
                const compactHtml = `<div style="text-align:left; margin-bottom:6px;"><strong>Resumen compacto:</strong> Total ${count} · Eléctricas ${electricas} · Mecánicas ${mecanicas}</div>`;
                const toggleButtonHtml = `<button id="toggle-details" style="padding:6px 10px; margin-bottom:8px; cursor:pointer;">Mostrar detalles</button>`;
                const detailsContainer = `<div id="details" style="display:none;">${summaryHtml}${detailsHtml}</div>`;
                output.innerHTML = compactHtml + toggleButtonHtml + detailsContainer;

                // attach toggle listener
                const btn = document.getElementById('toggle-details');
                const detailsDiv = document.getElementById('details');
                if (btn && detailsDiv) {
                    btn.addEventListener('click', () => {
                        if (detailsDiv.style.display === 'none') {
                            detailsDiv.style.display = 'block';
                            btn.textContent = 'Ocultar detalles';
                        } else {
                            detailsDiv.style.display = 'none';
                            btn.textContent = 'Mostrar detalles';
                        }
                    });
                }
            }
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



