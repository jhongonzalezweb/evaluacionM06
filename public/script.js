const agregarRoommmate = document.getElementById("agregarRoommmate");
const listaRoommate = document.getElementById("roommatesUsuarios");

agregarRoommmate.addEventListener("click", async () => {
  const resp = await axios.post("/roommates");

  $.get("json/roommates.json")
    .then(function (data) {
      var tabla = document.getElementById("tabla");
      var new_p = document.createElement("tr");
      var td = document.createElement("td");
      var td2 = document.createElement("td");
      var td3 = document.createElement("td");

      td.innerText =
        data.results[0].name.first + " " + data.results[0].name.last;
      td2.innerText = 0;
      td2.classList.add(
        data.results[0].name.first + "_" + data.results[0].name.last
      );
      td3.innerText = 100000;
      td3.innerHTML = '<span style="color:green">100000</span>';

      new_p.append(td);
      new_p.append(td2);
      new_p.append(td3);

      tabla.children[1].appendChild(new_p);
      rellenarListaRootmatesSelect();
    })
    .fail(function () {
      alert("no hay nada");
    });

  console.log("respuesta" + resp);
});

const rellenarListaRootmatesSelect = () => {
  var tabla = document.getElementById("tabla");
  var tbody = tabla.children[1];
  var trs = tbody.getElementsByTagName("tr");
  for (let tr of trs) {
    const option = new Option(tr.children[0].innerText);
    listaRoommate.appendChild(option);
  }
};

let agregarGasto = document.getElementById("agregarGasto");
let nombreGasto = document.getElementById("roommatesUsuarios");
let descripcionGasto = document.getElementById("txDescripcion");
let monto = document.getElementById("txMonto");
var tablaGasto = document.getElementById("tablaGasto");
//BOTON HISTORIAL AGREGAR
agregarGasto.addEventListener("click", async () => {
  const resp2 = await axios.post("/gastos");

  let fila = document.createElement("tr");
  fila.classList.add("columna");
  let columna1 = document.createElement("th");
  columna1.setAttribute("name", "nombregasto");
  columna1.innerHTML = nombreGasto.value;
  let user = document.getElementsByClassName(
    nombreGasto.value.replace(" ", "_")
  );

  for (let x of user) {
    x.innerHTML = '<span style="color:red">-' + monto.value + "</span>";
  }

  let columna2 = document.createElement("th");
  columna2.innerHTML = descripcionGasto.value;
  let columna3 = document.createElement("th");
  columna3.innerHTML = monto.value;

  let columna4 = document.createElement("th");
  var btnEditar = document.createElement("button");
  var btnBorrar = document.createElement("button");
  btnEditar.classList.add("botonEditar");
  btnEditar.setAttribute("motivo", descripcionGasto.value);
  btnEditar.setAttribute("monto", monto.value);
  btnBorrar.classList.add("botonBorrar");
  columna4.classList.add("col4");
  btnEditar.innerHTML =
    "<i class='fa-solid fa-pen-to-square' monto='" +
    monto.value +
    "' motivo='" +
    descripcionGasto.value +
    "'></i>";
  btnBorrar.innerHTML = "<i class='fa-solid fa-trash'></i>";
  columna4.appendChild(btnEditar);
  columna4.appendChild(btnBorrar);
  fila.appendChild(columna1);
  fila.appendChild(columna2);
  fila.appendChild(columna3);
  fila.appendChild(columna4);
  tablaGasto.appendChild(fila);

  btnEditar.addEventListener("click", (e) => {
    let m = e.explicitOriginalTarget.getAttributes("monto");
    let d = e.explicitOriginalTarget.getAttributes("motivo");
    document.getElementById("txDescripcion").value = d;
    document.getElementById("txMonto").value = m;
  });

  btnBorrar.addEventListener("click", () => {
    borrarfila();
  });
});

function borrarfila() {
  document.querySelector(".columna").remove();
}
