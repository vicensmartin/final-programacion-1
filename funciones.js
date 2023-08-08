function cantCarrito() {
  return carrito.reduce((acum, prod) => acum + prod.precio * prod.cantidad, 0);
}

function formularioDeCompra() {
  if (carrito.length > 0) {
    principalCarrito.innerHTML = "";
    formulario.innerHTML = "";

    const divFormulario = document.createElement("div");
    divFormulario.className = "formularioClase";

    const formuP = document.createElement("h2");
    formuP.className = "formuP";
    formuP.innerText = "Datos del comprador";

    const cerrarFormu = document.createElement("h2");
    cerrarFormu.className = "cerrarFormu";
    cerrarFormu.innerText = "✖️";

    cerrarFormu.addEventListener("click", () => {
      formulario.innerHTML = "";
    });

    const formu = document.createElement("form");
    formu.className = "formu";

    formulario.append(cerrarFormu);
    formulario.append(formuP);
    formulario.append(divFormulario);
    divFormulario.append(formu);

    const nombreLabel = document.createElement("label");
    nombreLabel.className = "form-label";
    nombreLabel.innerText = "Nombre y apellido";

    const nombreInput = document.createElement("input");
    nombreInput.className = "form-control";
    nombreInput.placeholder = "Ingrese su nombre y apellido";

    const telefonoLabel = document.createElement("label");
    telefonoLabel.className = "form-label";
    telefonoLabel.innerText = "Telefono";

    const telefonoInput = document.createElement("input");
    telefonoInput.className = "form-control";
    telefonoInput.type = "number";
    telefonoInput.placeholder = "Ingrese su número de telefono";

    const mailLabel = document.createElement("label");
    mailLabel.className = "form-label";
    mailLabel.innerText = "Email";

    const mailInput = document.createElement("input");
    mailInput.className = "form-control";
    mailInput.type = "email";
    mailInput.placeholder = "Ingrese su Email";

    const lugarLabel = document.createElement("label");
    lugarLabel.className = "form-label";
    lugarLabel.innerText = "Dirección de la entrega";

    const lugarInput = document.createElement("input");
    lugarInput.className = "form-control";
    lugarInput.placeholder = "Ingrese la dirección de la entrega";

    const fechaLabel = document.createElement("label");
    fechaLabel.className = "form-label";
    fechaLabel.innerText = "Fecha de entrega";

    const fechaInput = document.createElement("input");
    fechaInput.className = "form-control";
    fechaInput.type = "date";

    const pagoLabel = document.createElement("label");
    pagoLabel.className = "form-label";
    pagoLabel.innerText = "Tipo de pago";

    const pagoInput = document.createElement("select");
    pagoInput.className = "form-control";
    pagoInput.id = "seleccion";

    const efectivo = document.createElement("option");
    efectivo.setAttribute("value", "Efectivo");
    const efectivoText = document.createTextNode("Efectivo");
    efectivo.append(efectivoText);

    const tarjeta = document.createElement("option");
    tarjeta.setAttribute("value", "tarjeta");
    const tarjetaText = document.createTextNode("Tarjeta");
    tarjeta.append(tarjetaText);

    pagoInput.addEventListener("change", () => {
      console.log("estoy aca");

      if (seleccion.value === "tarjeta") {
        const cuotasLabel = document.createElement("label");
        cuotasLabel.className = "form-label";
        cuotasLabel.innerText = "cantidad de cuotas";

        const cuotasInput = document.createElement("select");
        cuotasInput.className = "form-control";
        cuotasInput.id = "cuotas";

        const cuotas3 = document.createElement("option");
        cuotas3.setAttribute("value", "cuotas3");
        const cuotas3Text = document.createTextNode("3 cuotas");
        cuotas3.append(cuotas3Text);

        const cuotas6 = document.createElement("option");
        cuotas6.setAttribute("value", "cuotas6");
        const cuotas6Text = document.createTextNode("6 cuotas");
        cuotas6.append(cuotas6Text);

        cuotasInput.append(cuotas3);
        cuotasInput.append(cuotas6);

        formu.append(cuotasLabel);
        formu.append(cuotasInput);
      }
    });

    const finCompra = document.createElement("input");
    finCompra.className = "btn btn-dark neggro";
    finCompra.value = "Finalizar compra";
    finCompra.type = "submit";

    pagoInput.append(efectivo);
    pagoInput.append(tarjeta);

    formu.append(nombreLabel);
    formu.append(nombreInput);
    formu.append(telefonoLabel);
    formu.append(telefonoInput);
    formu.append(mailLabel);
    formu.append(mailInput);
    formu.append(lugarLabel);
    formu.append(lugarInput);
    formu.append(fechaLabel);
    formu.append(fechaInput);
    formu.append(pagoLabel);
    formu.append(pagoInput);
    formu.append(finCompra);

    formu.addEventListener("submit", (event) => {
      event.preventDefault(); 

      const nombreValue = nombreInput.value.trim();
      const telefonoValue = telefonoInput.value.trim();
      const mailValue = mailInput.value.trim();
      const lugarValue = lugarInput.value.trim();

      if (
        nombreValue === "" ||
        telefonoValue === "" ||
        mailValue === "" ||
        lugarValue === ""
      ) {
        const mensajeErrorDiv = document.createElement("div");
        mensajeErrorDiv.className = "mensajeErrorDiv";

        const mensajeErrorTexto = document.createElement("p");
        mensajeErrorTexto.innerText =
          "Por favor, complete todos los campos obligatorios.";

        const cerrarMensajeErrorBtn = document.createElement("span");
        cerrarMensajeErrorBtn.className = "cerrarMensajeErrorBtn";
        cerrarMensajeErrorBtn.innerText = "✖️";
        cerrarMensajeErrorBtn.addEventListener("click", () => {
          mensajeErrorDiv.style.display = "none";
        });

        mensajeErrorDiv.appendChild(mensajeErrorTexto);
        mensajeErrorDiv.appendChild(cerrarMensajeErrorBtn);
        formu.appendChild(mensajeErrorDiv);

        return;
      }

      formulario.innerHTML = "";
      setTimeout(() => {
        carrito = [];
        localStorage.setItem("carro", JSON.stringify(carrito));
        console.log("Holaaaa");
        location.reload();
      }, 0);

      formu.reset();
    });
  } else {
    const mensajeDiv = document.createElement("div");
    mensajeDiv.className = "mensajeDiv";

    const mensajeTexto = document.createElement("p");
    mensajeTexto.className = "mensajeTexto";
    mensajeTexto.innerText = "No hay productos para comprar en su carrito";

    const cerrarMensajeBtn = document.createElement("span");
    cerrarMensajeBtn.className = "cerrarMensajeBtn";
    cerrarMensajeBtn.innerText = "✖️";
    cerrarMensajeBtn.addEventListener("click", () => {
      mensajeDiv.style.display = "none";
    });

    mensajeDiv.appendChild(mensajeTexto);
    mensajeDiv.appendChild(cerrarMensajeBtn);

    formulario.innerHTML = "";
    formulario.appendChild(mensajeDiv);
  }
}
