//se declara una matriz
const casos = new Array();
const dictamen = [[0, 0]];
let cont = 0;
let registrarCaso = (e) => {
  //Se habilita boton de calcular
  if (cont == 3) {
    document.getElementById("btn_dictamen").removeAttribute("disabled");
  }
  var tipoCaso = document.getElementById("tipo_caso").value;
  //Se convierte a mayuscula
  tipoCaso = tipoCaso.toString();
  tipoCaso = tipoCaso.toUpperCase();
  //se convierte a Decimal con parseFloat()
  var gravedad = parseFloat(document.getElementById("gravedad").value);
  if (cont < 3) {
    if (
      (tipoCaso === "F" || tipoCaso === "T" || tipoCaso === "P") &&
      gravedad <= 10 &&
      gravedad !== "" &&
      tipoCaso !== ""
    ) {
      //Se posiciona el arreglo dentro del arreglo de casos
      casos.push([tipoCaso, gravedad]);
      //Se incrementa el contador de casos
      cont++;
      //Se resetean los campos
      document.getElementById("tipo_caso").value = "";
      document.getElementById("gravedad").value = "";
      document.getElementById("tipo_caso").focus();
    } else {
      alert("Digite un tipo de caso o escala valido");
    }
  } else {
    alert("Ya se registraron todos los traumas");
  }
};

let calcularDictamen = () => {
  //Este arreglo me permite navegar en el arreglo de Dictamen
  let valor = [[0, 0]];
  //Se inicializan variables de arreglo
  valor[1] = [0, 0];
  dictamen[1] = [0, 0];
  valor[2] = [0, 0];
  dictamen[2] = [0, 0];
  //Se recorre y se valida arreglo de casos se suma el total de casos y se suma el valor de gravedad
  casos.forEach(function recorrer(value) {
    let datosCasos = value;
    switch (datosCasos[0]) {
      case "F":
        valor = dictamen[0];
        dictamen[0] = [valor[0] + 1, valor[1] + datosCasos[1]];
        break;
      case "T":
        valor = dictamen[1];
        dictamen[1] = [valor[0] + 1, valor[1] + datosCasos[1]];
        break;
      case "P":
        valor = dictamen[2];
        dictamen[2] = [valor[0] + 1, valor[1] + datosCasos[1]];
        break;
      default:
        console.log("ERROR");
        break;
    }
  });
  let f = dictamen[0],
    t = dictamen[1],
    p = dictamen[2];

  //Imprimimos en el html el resultado
  document.getElementById("dictamen_container").innerHTML = `
  <span>Dictamen</span>
          <ol>
            <li>
              (T) ​Trauma mental
              <ul>
                <li>#Casos: ${t[0]}</li>
                <li>#Promedio de calificación: ${t[1] / t[0]}</li>
              </ul>
            </li>
            <li>
              (P)​ Pánico
              <ul>
                <li>#Casos: ${p[0]}</li>
                <li>#Promedio de calificación: ${p[1] / p[0]}</li>
              </ul>
            </li>
            <li>
              (F)​ Daño físico
              <ul>
                <li>#Casos: ${f[0]}</li>
                <li>#Promedio de calificación: ${f[1] / f[0]}</li>
              </ul>
            </li>
          </ol>
  `;

  if (t[1] / t[0] >= 7 || f[1] / f[0] >= 7) {
    alert("Se recomienda máximo castigo para el acusado");
  }
};

document.getElementById("btn_submit").addEventListener("click", registrarCaso);
document
  .getElementById("btn_dictamen")
  .addEventListener("click", calcularDictamen);
