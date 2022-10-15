//var cantproductos = 0;


$(document).ready(function () {
  $('.js-example-basic-single').select2({
      width: 'style'
  });
});

const mapaPreciosProductos = new Map();
$.get("https://www.cfihoelters.com.ar/desarrollo/ordonez/productos.json")//https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf para que funque normal
    .done((data) => {
        for (let i = 0; i < 1000; i++) {
            mapaPreciosProductos.set(data[i].producto, data[i].precio);
        }
        crearPrimeraLineaTabla("tabla")
    })
    .fail((error) => console.log("ERROR"))

async function crearPrimeraLineaTabla(idTabla) {//TODO: es igual que la otra función pero con menos lineas, debería hacerlo bien
  let filas = 1
  let tabla = document.getElementById(idTabla)
  let tr = tabla.insertRow(filas++)
  let elemento = tr.insertCell(0)

  elemento.innerHTML = "<input style=\"width: 50% \" type=\"number\" name=\"cantidadProducto\" min=\"0\" onChange=\"calcularPrecioAgregado(" + (filas - 2) + ")\">";

  elemento = tr.insertCell(1)

  elemento.innerHTML = "<select class=\"js-example-basic-single\" name=\"productos\" onchange=\"establecerValoresDeProductos(),calcularPrecioAgregado(" + (filas - 2) + ")\">" + await conseguirContenidoSelect();

  elemento = tr.insertCell(2)
  elemento.innerHTML = "<label name=\"precioUnitario\">$10000</label>";

  establecerValoresDeProductos()

  elemento = tr.insertCell(3)
  elemento.innerHTML = "<label name='precioAgregado'> </label>";
  /**Inicializar slect2*/
  $(document).ready(function () {
      $('.js-example-basic-single').select2({
          width: 'style'
      });
  });
  tr.insertCell(4)

}

async function añadirProductoATabla(idTabla) {//Todo:Puede haber más pedidos de producto que cantidad de productos, pidiendo 2 veces el mismo
  let tabla = document.getElementById(idTabla)
  let tr = tabla.insertRow(filas++)
  let elemento = tr.insertCell(0)

  elemento.innerHTML = "<input style=\"width: 50%\" type=\"number\" name=\"cantidadProducto\" min=\"0\" onChange=\"calcularPrecioAgregado(" + (filas - 2) + ")\">";

  elemento = tr.insertCell(1)

  elemento.innerHTML = "<select class=\"js-example-basic-single\" name=\"productos\" onchange=\"establecerValoresDeProductos(),calcularPrecioAgregado(" + (filas - 2) + ")\">" + await conseguirContenidoSelect();

  elemento = tr.insertCell(2)
  elemento.innerHTML = "<label name=\"precioUnitario\"></label>";
  establecerValoresDeProductos()

  elemento = tr.insertCell(3)
  elemento.innerHTML = "<label name='precioAgregado'> </label>";
  /**Inicializar slect2*/
  $(document).ready(function () {
      $('.js-example-basic-single').select2({
          width: 'style'
      });
  });

  elemento = tr.insertCell(4)
  elemento.innerHTML =
      "<input class=\"btn btn-secondary btn-sm\" type=\"button\" onClick=\"eliminarProductoDeTabla('" + idTabla + "'," + tr.rowIndex + ")\" value=\"-\">"
}

function Total(){
  var prod1;
  var Precio_U,cantidad, precioT;

  prod1 = (document.getElementById("prod1").value);
  Precio_U = parseInt(document.getElementById("Precio_U").value);
  cantidad = parseInt(document.getElementById("cantidad").value);
  
  precioT = Precio_U * cantidad;

  console.log(Precio_U);
  console.log(cantidad);
  console.log(prod1);
  console.log(precioT);

  // CALCULAR subtotal
  for (let i = 0; i < document.getElementsByName("precioAgregado").length; i++) {
    let precioagregado = parseInt(document.getElementsByName("precioAgregado")[i].innerText.slice(1))
    if (!isNaN(precioagregado)) {
        subtotal += precioagregado
        }
    }

  //document.getElementById("APR").innerHTML = precioT; // La impresion funciona pero el dato esta roto
  


  if (prod1 =! "none" ){ /// pa que?
    cantproductos++;
  }

}

function PDF() {
  var cliente;
  cliente = (document.getElementById("cliente").value);

  html2canvas(document.querySelector("#tabla"), {
      scale: 4
  }).then(canvas => {
      let doc = new jsPDF("l", "px");
      let img = canvas.toDataURL("image/png");
      doc.addImage(img, 'JPEG', 27, 15, doc.internal.pageSize.getWidth()*1.125, 0);
      if (canvas.height>2704) {
          doc.addPage("a4","l")
          doc.addImage(img, 'JPEG', 27, 15-doc.internal.pageSize.getHeight(), doc.internal.pageSize.getWidth()*1.125, 0);
          canvas.height-=doc.internal.pageSize.getHeight()*8
      }
      html2canvas(document.querySelector("#cuotas"), {
          scale: 4
      }).then(canvas2 => {
          var img2 = canvas2.toDataURL("image/png");
          doc.addImage(img2, 'JPEG', 27, 15 + canvas.height / (2 * 4), doc.internal.pageSize.getWidth()*1.125, 0);
          
          doc.save(cliente+"presupuesto.pdf")
      });
  });
}

async function imprimir() {

  let newWindows = window.open("", "PRINT");

  ndows.document.write("<html>");
  ndows.document.write(document.head.outerHTML);
  ndows.document.write("<body>");
  ndows.document.write(document.getElementById("tabla").outerHTML);
  ndows.document.write(document.getElementById("cuotas").outerHTML);

  ndows.document.write("</body></html>");

  ndows.document.close(); // necessary for IE >= 10
  ndows.focus(); // necessary for IE >= 10*/
  await new Promise(r => setTimeout(r, 100));//Todo: MUY VILLERO, pero no puedo solucinarlo
  ndows.print()
  ndows.close();
}