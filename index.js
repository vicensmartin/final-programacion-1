
var principalProductos = document.getElementById("principalProductos");
var principalCarrito = document.getElementById("principalCarrito");
var eventoCarrito = document.getElementById("eventoCarrito");
var cuentaCarrito = document.getElementById("cuentaCarrito");
var total = document.getElementById("total");
var formulario = document.getElementById("formulario");
var mostrarProducto = document.getElementById("mostrarProducto");

let carrito = JSON.parse(localStorage.getItem("carro")) || [];

contadorCarritoReload();

mostrarProductos(productos);

function filtrarProductos(innerText) {
  if (innerText === "Todos") {
    mostrarProductos(productos);
  } else {
    const productoFitrados = productos.filter((pro) => {
      return pro.categoria === innerText;
    });
    mostrarProductos(productoFitrados);
  }
}

function mostrarProductos(produc) {
  principalProductos.innerHTML = "";
  mostrarBanner();

  produc.forEach((pro) => {
    const divCard = document.createElement("div");
    divCard.className = "card";
    divCard.style = "width: 18rem;";

    const imgCard = document.createElement("img");
    imgCard.className = "card-img-top";
    imgCard.src = `${pro.imagen}`;

    const divCard2 = document.createElement("div");
    divCard2.className = "card-body";

    const h5Card = document.createElement("h5");
    h5Card.className = "card-title";
    h5Card.innerText = `${pro.nombre}`;

    const precioCard = document.createElement("h2");
    precioCard.className = "precio";
    precioCard.innerText = `$${pro.precio}`;

    const descrip = document.createElement("p");
    descrip.className = "descrip";
    descrip.innerText = `${pro.descripcion}`;

    const categ = document.createElement("h3");
    categ.className = "categ";
    categ.innerText = `${pro.categoria}`;

    principalProductos.append(divCard);
    divCard.append(imgCard);
    divCard.append(divCard2);
    divCard2.append(h5Card);
    divCard2.append(precioCard);
    divCard2.append(descrip);
    divCard2.append(categ);

    const boton = document.createElement("button");
    boton.className = "btn btn-dark boton";
    boton.innerText = "Agregar al carrito";

    const boton2 = document.createElement("button");
    boton2.className = "btn btn-dark boton2";
    boton2.innerText = "+ info";

    divCard2.append(boton);
    divCard2.append(boton2);

    boton2.addEventListener("click", () => {
      mostrarProc(pro.id);
    });

    boton.addEventListener("click", () => {
      const verificar = carrito.some((som) => som.id === pro.id);
      if (verificar === true) {
        carrito.forEach((p) => {
          if (p.id === pro.id) {
            p.cantidad++;
            total.innerText = `total: ${cantCarrito()}`;
          }
        });
      } else {
        carrito.push({
          imagen: pro.imagen,
          nombre: pro.nombre,
          precio: pro.precio,
          cantidad: pro.cantidad,
          id: pro.id,
        });
        cuentaCarrito.innerText = `${carrito.length}`;
        total.innerText = `total: $${cantCarrito()}`;
      }
      localStorage.setItem("carro", JSON.stringify(carrito));
    });
  });
}

eventoCarrito.addEventListener("click", mostraCarrito);

function mostraCarrito() {
  principalCarrito.innerHTML = "";
  principalCarrito.style.display = "flex";

  const divCarrito = document.createElement("div");
  divCarrito.className = "divCarrito";

  const h3Carrito = document.createElement("h3");
  h3Carrito.className = "h3Carrito";
  h3Carrito.innerText = "Mi carrito";

  const cerrarCarrito = document.createElement("h2");
  cerrarCarrito.className = "cerrarCarrito";
  cerrarCarrito.innerText = "✖️";

  cerrarCarrito.addEventListener("click", () => {
    principalCarrito.style.display = "none";
  });

  principalCarrito.append(divCarrito);
  divCarrito.append(h3Carrito);
  divCarrito.append(cerrarCarrito);

  carrito.forEach((pro) => {
    const divCarritoo = document.createElement("div");
    divCarritoo.className = "divCarritoo";

    const imagenCarrito = document.createElement("img");
    imagenCarrito.className = "imagenCarrito";
    imagenCarrito.src = `${pro.imagen}`;

    const nombrePro = document.createElement("p");
    nombrePro.className = "nombrePro";
    nombrePro.innerText = `${pro.nombre}`;

    const cantidadPro = document.createElement("p");
    cantidadPro.className = "cantidadPro";
    cantidadPro.innerText = `Cantidad: ${pro.cantidad}`;

    const precioPro = document.createElement("p");
    precioPro.className = "precioPro";
    precioPro.innerText = `Precio: $${pro.precio}`;

    const eliminarProducto = document.createElement("p");
    eliminarProducto.className = "eliminarProducto";
    eliminarProducto.innerText = "✖️";

    eliminarProducto.addEventListener("click", () => {
      carrito = carrito.filter((proId) => {
        return proId.id !== pro.id;
      });
      localStorage.setItem("carro", JSON.stringify(carrito));
      mostraCarrito();
      cuentaCarrito.innerText = `${carrito.length}`;
      total.innerText = `total: $${cantCarrito()}`;
    });

    principalCarrito.append(divCarritoo);
    divCarritoo.append(imagenCarrito);
    divCarritoo.append(nombrePro);
    divCarritoo.append(cantidadPro);
    divCarritoo.append(precioPro);
    divCarritoo.append(eliminarProducto);
  });

  const div2Carrito = document.createElement("div");
  div2Carrito.className = "div2Carrito";

  const botonVaciar = document.createElement("button");
  botonVaciar.className = "btn btn-dark";
  botonVaciar.innerText = "Vaciar carrito";

  principalCarrito.append(div2Carrito);
  div2Carrito.append(botonVaciar);

  const totalApagar = carrito.reduce(
    (acum, prod) => acum + prod.precio * prod.cantidad,
    0);

  const precioTotal = document.createElement("h3");
  precioTotal.className = "precioTotal";
  precioTotal.innerText = `Total a pagar: $ ${totalApagar}`;

  div2Carrito.append(precioTotal);

  botonVaciar.addEventListener("click", () => {
    carrito = [];
    localStorage.setItem("carro", JSON.stringify(carrito));
    mostraCarrito();
    cuentaCarrito.innerText = `${carrito.length}`;
    total.innerText = `total: ${cantCarrito()}`;
  });

  const finalizarCompra = document.createElement("button");
  finalizarCompra.className = "btn btn-dark";
  finalizarCompra.innerText = "Comprar ahora";

  div2Carrito.append(finalizarCompra);

  finalizarCompra.addEventListener("click", formularioDeCompra);
}

function mostrarProc(p) {
  mostrarProducto.innerHTML = "";

  productos.forEach((pro) => {
    if (pro.id === p) {
      const nombreProduc = document.createElement("p");
      nombreProduc.className = "nombreProduc";
      nombreProduc.innerText = `${pro.nombre}`;

      const imagenProduc = document.createElement("img");
      imagenProduc.className = "imagenProd";
      imagenProduc.src = `${pro.imagen}`;

      const infoProduc = document.createElement("p");
      infoProduc.className = "infoProduc";
      infoProduc.innerText = `${pro.info}`;

      const botonProduc = document.createElement("button");
      botonProduc.className = "btn btn-dark botonProduc";
      botonProduc.innerText = `Cerrar`;

      botonProduc.addEventListener("click", () => {
        console.log("entre");
        mostrarProducto.innerHTML = "";
      });

      mostrarProducto.append(nombreProduc);
      mostrarProducto.append(imagenProduc);
      mostrarProducto.append(infoProduc);
      mostrarProducto.append(botonProduc);
    }
  });
}

function contadorCarritoReload() {
  cuentaCarrito.style.display = "inline-block";

  const contador = carrito.length;
  const precioCarro = carrito.reduce(
    (acc, b) => acc + b.precio * b.cantidad,
    0);

  localStorage.setItem("carritoLenght", JSON.stringify(contador));
  localStorage.setItem("precioCarro", JSON.stringify(precioCarro));

  cuentaCarrito.innerText = JSON.parse(localStorage.getItem("carritoLenght"));
  total.innerText =
    "Total: $" + JSON.parse(localStorage.getItem("precioCarro"));
}

function mostrarBanner() {
  let contdown = 10;
  let interval = setInterval(() => {
    document.querySelector(
      ".card-text"
    ).innerText = `Ganaste un cupon del 15% de descuento. Tenes ${contdown} seg. para reclamarlo`;
    contdown--;

    if (contdown < 0) {
      clearInterval(interval);
      document.querySelector(".card-text").innerText = "";
      document.querySelector(".container").innerHTML = "";
    }
  }, 1000);
}
